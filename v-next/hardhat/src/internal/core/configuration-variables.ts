import type {
  ConfigurationVariable,
  ResolvedConfigurationVariable,
} from "../../types/config.js";
import type { HookManager } from "../../types/hooks.js";

import { HardhatError } from "@ignored/hardhat-vnext-errors";
import { normalizeHexString } from "@ignored/hardhat-vnext-utils/hex";

export function resolveConfigurationVariable(
  hooks: HookManager,
  variable: ConfigurationVariable | string,
): ResolvedConfigurationVariable {
  if (typeof variable === "string") {
    return new FixedValueConfigurationVariable(variable);
  }

  return new LazyResolvedConfigurationVariable(hooks, variable);
}

abstract class BaseResolvedConfigurationVariable
  implements ResolvedConfigurationVariable
{
  public _type: "ResolvedConfigurationVariable" =
    "ResolvedConfigurationVariable";

  #cachedValue?: string;

  protected abstract _getRawValue(): Promise<string>;

  public async get(): Promise<string> {
    if (this.#cachedValue === undefined) {
      this.#cachedValue = await this._getRawValue();
    }

    return this.#cachedValue;
  }

  public async getUrl(): Promise<string> {
    const value = await this.get();

    try {
      new URL(value);
      return value;
    } catch (e) {
      throw new HardhatError(HardhatError.ERRORS.GENERAL.INVALID_URL, {
        url: value,
      });
    }
  }

  public async getBigInt(): Promise<bigint> {
    const value = await this.get();

    try {
      return BigInt(value);
    } catch (e) {
      throw new HardhatError(HardhatError.ERRORS.GENERAL.INVALID_BIGINT, {
        value,
      });
    }
  }

  public async getHexString(): Promise<string> {
    const value = await this.get();
    try {
      return normalizeHexString(value);
    } catch {
      throw new HardhatError(HardhatError.ERRORS.GENERAL.INVALID_HEX_STRING, {
        value,
      });
    }
  }
}

export class LazyResolvedConfigurationVariable extends BaseResolvedConfigurationVariable {
  readonly #hooks: HookManager;
  readonly #variable: ConfigurationVariable;

  public readonly name: string;

  constructor(hooks: HookManager, variable: ConfigurationVariable) {
    super();
    this.name = variable.name;
    this.#hooks = hooks;
    this.#variable = variable;
  }

  protected async _getRawValue(): Promise<string> {
    return this.#hooks.runHandlerChain(
      "configurationVariables",
      "fetchValue",
      [this.#variable],
      async (_context, v) => {
        const value = process.env[v.name];

        if (typeof value !== "string") {
          throw new HardhatError(
            HardhatError.ERRORS.GENERAL.ENV_VAR_NOT_FOUND,
            { name: v.name },
          );
        }

        return value;
      },
    );
  }
}

export class FixedValueConfigurationVariable extends BaseResolvedConfigurationVariable {
  readonly #value: string;

  constructor(value: string) {
    super();
    this.#value = value;
  }

  protected async _getRawValue(): Promise<string> {
    return this.#value;
  }
}
