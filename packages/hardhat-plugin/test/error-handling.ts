/* eslint-disable import/no-unused-modules */
import { buildModule } from "@ignored/ignition-core";
import { assert } from "chai";

import { useEphemeralIgnitionProject } from "./use-ignition-project";

describe("module error handling", () => {
  useEphemeralIgnitionProject("minimal-new-api");

  it("should error on passing async callback", async function () {
    await assert.isRejected(
      this.deploy(
        buildModule("AsyncModule", (async () => {
          return {};
        }) as any)
      ),
      /The callback passed to 'buildModule' for AsyncModule returns a Promise; async callbacks are not allowed in 'buildModule'./
    );
  });

  it("should error on module throwing an exception", async function () {
    await assert.isRejected(
      this.deploy(
        buildModule("AsyncModule", () => {
          throw new Error("User thrown error");
        })
      ),
      /User thrown error/
    );
  });
});
