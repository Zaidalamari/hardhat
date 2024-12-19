import type { FlattenActionArguments } from "../../../../src/internal/builtin-plugins/flatten/task-action.js";

import assert from "node:assert/strict";
import fs from "node:fs";
import { afterEach, beforeEach, describe, it } from "node:test";

import { useFixtureProject } from "@nomicfoundation/hardhat-test-utils";

import { createHardhatRuntimeEnvironment } from "../../../../src/hre.js";
import { getHardhatVersion } from "../../../../src/internal/utils/package.js";

const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;

const consoleLogBuffer: string[] = [];
const consoleWarnBuffer: string[] = [];

const getConsoleLogOutput = () => consoleLogBuffer.join("\n");
const getConsoleWarnOutput = () => consoleWarnBuffer.join("\n");

async function getExpectedSol(fileName = "expected.sol") {
  const expected = fs.readFileSync(fileName, "utf8");

  const hardhatVersion = await getHardhatVersion();
  return expected.replace("{HARDHAT_VERSION}", hardhatVersion);
}

function getContractsOrder(flattenedFiles: string) {
  const CONTRACT_REGEX = /\s*contract(\s+)(\w)/gm;
  const matches = flattenedFiles.match(CONTRACT_REGEX);

  return (matches ?? []).map((m: string) => m.replace("contract", "").trim());
}

async function assertFlattenedFilesResult(flattened: string) {
  const expected = await getExpectedSol();

  assert.equal(flattened, expected);
}

async function createHRE() {
  return createHardhatRuntimeEnvironment({}, {}, process.cwd());
}

describe("flatten/task-action", () => {
  beforeEach(() => {
    // Replace console.log and console.warn so we can assert on their output
    consoleLogBuffer.length = 0;
    consoleWarnBuffer.length = 0;

    console.log = (...args: unknown[]) => {
      consoleLogBuffer.push(args.join(" "));
    };
    console.warn = (...args: unknown[]) => {
      consoleWarnBuffer.push(args.join(" "));
    };
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    console.warn = originalConsoleWarn;
  });

  describe("flattenAction", () => {
    describe("when there are no contracts", () => {
      useFixtureProject("flatten-task/no-contracts");

      it("should return an empty string", async () => {
        const hre = await createHRE();
        const { flattened } = await hre.tasks.getTask(["flatten"]).run({});

        assert.equal(flattened, "");
      });
    });

    describe("when there are contracts", () => {
      useFixtureProject("flatten-task/contracts-project");

      describe("when files are specified as arguments", function () {
        it("should flatten the specified files and dependencies", async () => {
          const hre = await createHRE();
          const { flattened: cFlattened } = await hre.tasks
            .getTask(["flatten"])
            .run({ files: ["contracts/C.sol"] });

          assert.deepEqual(getContractsOrder(cFlattened), ["C"]);

          const { flattened: bFlattened } = await hre.tasks
            .getTask(["flatten"])
            .run({ files: ["contracts/B.sol"] });

          assert.deepEqual(getContractsOrder(bFlattened), ["C", "B"]);

          const { flattened: baFlattened } = await hre.tasks
            .getTask(["flatten"])
            .run({ files: ["contracts/B.sol", "contracts/A.sol"] });

          assert.deepEqual(getContractsOrder(baFlattened), ["C", "B", "A"]);
        });
      });

      describe("when no arguments are passed", function () {
        it("flattens all the project contracts and dependencies", async () => {
          const args: FlattenActionArguments = { files: [] };

          const hre = await createHRE();
          const { flattened } = await hre.tasks.getTask(["flatten"]).run(args);

          assertFlattenedFilesResult(flattened);
          assert.deepEqual(getContractsOrder(flattened), ["C", "B", "A"]);
        });
      });
    });

    describe("When has contracts with name clash", function () {
      useFixtureProject("flatten-task/contracts-nameclash-project");

      it("should flatten files sorted correctly with repetition", async function () {
        const hre = await createHRE();
        const { flattened } = await hre.tasks.getTask(["flatten"]).run({});

        assert.deepEqual(getContractsOrder(flattened), ["C", "B", "A", "C"]);
      });
    });

    describe("When project has multiline imports", function () {
      useFixtureProject("flatten-task/multiline-import-project");

      it("should not include multiline imports", async function () {
        const hre = await createHRE();
        const { flattened } = await hre.tasks.getTask(["flatten"]).run({});
        assert.ok(
          flattened.includes("} from") === false,
          "Flatten should not include multiline imports",
        );
      });
    });

    describe("project where two contracts import the same dependency", function () {
      useFixtureProject("flatten-task/consistent-build-info-names");

      it("should always produce the same flattened file", async function () {
        const runs = 10;
        const flattenedFiles: string[] = [];

        for (let i = 0; i < runs; i++) {
          const hre = await createHRE();
          const { flattened } = await hre.tasks.getTask(["flatten"]).run({});

          assert.deepEqual(getContractsOrder(flattened), ["B", "A"]);

          flattenedFiles.push(flattened);
        }

        for (let i = 0; i + 1 < runs; i++) {
          assert.equal(flattenedFiles[i], flattenedFiles[i + 1]);
        }
      });
    });
  });

  describe("SPDX licenses and pragma abicoder directives", () => {
    describe("Flatten files that dont contain SPDX licenses or pragma directives", () => {
      useFixtureProject("flatten-task/contracts-no-spdx-no-pragma");

      it("should successfully flatten and compile the files", async function () {
        const hre = await createHRE();

        const { flattened, metadata } = await hre.tasks
          .getTask(["flatten"])
          .run({});

        await assertFlattenedFilesResult(flattened);

        assert.deepEqual(metadata, {
          filesWithoutLicenses: ["contracts/A.sol", "contracts/B.sol"],
          pragmaDirective: "",
          filesWithoutPragmaDirectives: ["contracts/A.sol", "contracts/B.sol"],
          filesWithDifferentPragmaDirectives: [],
        });
      });
    });

    describe("Flatten files that contain SPDX licenses", () => {
      describe("Files contain one single license per file", () => {
        describe("Files contain same licenses", () => {
          useFixtureProject("flatten-task/contracts-spdx-same-licenses");

          it("should successfully flatten and compile the files", async function () {
            const hre = await createHRE();
            const { flattened, metadata } = await hre.tasks
              .getTask(["flatten"])
              .run({});

            await assertFlattenedFilesResult(flattened);

            assert.deepEqual(metadata, {
              filesWithoutLicenses: [],
              pragmaDirective: "",
              filesWithoutPragmaDirectives: [
                "contracts/A.sol",
                "contracts/B.sol",
              ],
              filesWithDifferentPragmaDirectives: [],
            });
          });
        });

        describe("Files contain different licenses", () => {
          useFixtureProject("flatten-task/contracts-spdx-different-licenses");

          it("should successfully flatten and compile the files", async function () {
            const hre = await createHRE();
            const { flattened, metadata } = await hre.tasks
              .getTask(["flatten"])
              .run({});

            await assertFlattenedFilesResult(flattened);

            assert.deepEqual(metadata, {
              filesWithoutLicenses: [],
              pragmaDirective: "",
              filesWithoutPragmaDirectives: [
                "contracts/A.sol",
                "contracts/B.sol",
              ],
              filesWithDifferentPragmaDirectives: [],
            });
          });
        });
      });

      describe("Files contain multiple licenses", () => {
        describe("Files contain multiple same licenses", () => {
          useFixtureProject(
            "flatten-task/contracts-spdx-same-multiple-licenses",
          );

          it("should successfully flatten and compile the files", async function () {
            const hre = await createHRE();
            const { flattened, metadata } = await hre.tasks
              .getTask(["flatten"])
              .run({});

            await assertFlattenedFilesResult(flattened);

            assert.deepEqual(metadata, {
              filesWithoutLicenses: [],
              pragmaDirective: "",
              filesWithoutPragmaDirectives: [
                "contracts/A.sol",
                "contracts/B.sol",
              ],
              filesWithDifferentPragmaDirectives: [],
            });
          });
        });

        describe("Files contain multiple different licenses", () => {
          useFixtureProject(
            "flatten-task/contracts-spdx-different-multiple-licenses",
          );

          it("should successfully flatten and compile the files", async function () {
            const hre = await createHRE();
            const { flattened, metadata } = await hre.tasks
              .getTask(["flatten"])
              .run({});

            await assertFlattenedFilesResult(flattened);

            assert.deepEqual(metadata, {
              filesWithoutLicenses: [],
              pragmaDirective: "",
              filesWithoutPragmaDirectives: [
                "contracts/A.sol",
                "contracts/B.sol",
                "contracts/C.sol",
              ],
              filesWithDifferentPragmaDirectives: [],
            });
          });
        });
      });
    });

    describe("Flatten files that contain pragma abicoder directives", () => {
      describe("Files contain one single pragma directive per file", () => {
        describe("Files contain same pragma directive", () => {
          useFixtureProject("flatten-task/contracts-pragma-same-directives");

          it("should successfully flatten and compile the files", async function () {
            const hre = await createHRE();
            const { flattened, metadata } = await hre.tasks
              .getTask(["flatten"])
              .run({});

            await assertFlattenedFilesResult(flattened);

            assert.deepEqual(metadata, {
              filesWithoutLicenses: ["contracts/A.sol", "contracts/B.sol"],
              pragmaDirective: "pragma abicoder v1",
              filesWithoutPragmaDirectives: [],
              filesWithDifferentPragmaDirectives: [],
            });
          });
        });

        describe("Files contain different pragma directives", () => {
          useFixtureProject(
            "flatten-task/contracts-pragma-different-directives",
          );

          it("should successfully flatten and compile the files", async function () {
            const hre = await createHRE();
            const { flattened, metadata } = await hre.tasks
              .getTask(["flatten"])
              .run({});

            await assertFlattenedFilesResult(flattened);

            assert.deepEqual(metadata, {
              filesWithoutLicenses: ["contracts/A.sol", "contracts/B.sol"],
              pragmaDirective: "pragma experimental ABIEncoderV2",
              filesWithoutPragmaDirectives: [],
              filesWithDifferentPragmaDirectives: ["contracts/B.sol"],
            });
          });
        });
      });

      describe("Files contain multiple pragma directives", () => {
        useFixtureProject("flatten-task/contracts-pragma-multiple-directives");

        it("should successfully flatten and compile the files", async function () {
          const hre = await createHRE();
          const { flattened, metadata } = await hre.tasks
            .getTask(["flatten"])
            .run({});

          await assertFlattenedFilesResult(flattened);

          assert.deepEqual(metadata, {
            filesWithoutLicenses: ["contracts/A.sol", "contracts/B.sol"],
            pragmaDirective: "pragma abicoder v2",
            filesWithoutPragmaDirectives: [],
            filesWithDifferentPragmaDirectives: ["contracts/A.sol"],
          });
        });
      });
    });

    describe("Files contains several SPDX licenses and pragma directives", () => {
      useFixtureProject(
        "flatten-task/contracts-spdx-licenses-and-pragma-directives",
      );

      it("should successfully flatten and compile the files", async function () {
        const hre = await createHRE();
        const { flattened, metadata } = await hre.tasks
          .getTask(["flatten"])
          .run({});

        await assertFlattenedFilesResult(flattened);

        assert.deepEqual(metadata, {
          filesWithoutLicenses: [],
          pragmaDirective: "pragma abicoder v2",
          filesWithoutPragmaDirectives: [],
          filesWithDifferentPragmaDirectives: ["contracts/A.sol"],
        });
      });
    });

    describe("Check regex rules in files that contains several SPDX licenses and pragma directives", () => {
      useFixtureProject(
        "flatten-task/contracts-regex-spdx-licenses-and-pragma-directives",
      );

      it("should successfully flatten and compile the files", async function () {
        const hre = await createHRE();
        const { flattened, metadata } = await hre.tasks
          .getTask(["flatten"])
          .run({});

        await assertFlattenedFilesResult(flattened);

        assert.deepEqual(metadata, {
          filesWithoutLicenses: [],
          pragmaDirective: "pragma abicoder v2",
          filesWithoutPragmaDirectives: [],
          filesWithDifferentPragmaDirectives: ["contracts/B.sol"],
        });
      });
    });
  });

  describe("Output and warning messages", function () {
    useFixtureProject("flatten-task/contracts-task-flatten");

    it("should console log the flattened files and the warnings about missing licenses and pragma directives", async function () {
      const hre = await createHRE();
      await hre.tasks.getTask(["flatten"]).run({});
      const expectedOutput = await getExpectedSol();

      assert.equal(getConsoleLogOutput(), expectedOutput);

      assert(
        getConsoleWarnOutput().includes(
          `The following file(s) do NOT specify SPDX licenses: contracts/A.sol, contracts/B.sol, contracts/C.sol`,
        ),
        `Warning message not found`,
      );

      assert(
        getConsoleWarnOutput().includes(
          `Pragma abicoder directives are defined in some files, but they are not defined in the following ones: contracts/A.sol, contracts/B.sol`,
        ),
        `Warning message not found`,
      );

      assert(
        getConsoleWarnOutput().includes(
          `The flattened file is using the pragma abicoder directive 'pragma abicoder v2' but these files have a different pragma abicoder directive: contracts/C.sol`,
        ),
        `Warning message not found`,
      );
    });

    it("should not console warn because licenses and pragma directives are specified", async function () {
      const hre = await createHRE();
      await hre.tasks.getTask(["flatten"]).run({ files: ["contracts/D.sol"] });

      assert.equal(getConsoleWarnOutput(), "");
    });
  });

  describe("No contracts to flatten", () => {
    useFixtureProject("flatten-task/no-contracts");

    it("should not throw an error when metadata is null", async function () {
      const hre = await createHRE();
      await hre.tasks.getTask(["flatten"]).run({});
    });
  });
});
