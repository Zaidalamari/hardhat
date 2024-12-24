import type {
  ConfigurationResolver,
  EdrNetworkAccountsConfig,
  EdrNetworkAccountsUserConfig,
  EdrNetworkChainConfig,
  EdrNetworkChainsConfig,
  EdrNetworkChainsUserConfig,
  EdrNetworkForkingConfig,
  EdrNetworkForkingUserConfig,
  EdrNetworkMiningConfig,
  EdrNetworkMiningUserConfig,
  GasConfig,
  GasUserConfig,
  HttpNetworkAccountsConfig,
  HttpNetworkAccountsUserConfig,
} from "../../../types/config.js";

import path from "node:path";

import {
  hexStringToBytes,
  normalizeHexString,
} from "@ignored/hardhat-vnext-utils/hex";

import { DEFAULT_HD_ACCOUNTS_CONFIG_PARAMS } from "./accounts/derive-private-keys.js";
import {
  DEFAULT_EDR_NETWORK_HD_ACCOUNTS_CONFIG_PARAMS,
  EDR_NETWORK_DEFAULT_COINBASE,
} from "./edr/edr-provider.js";
import { HardforkName, LATEST_HARDFORK } from "./edr/types/hardfork.js";
import { isHdAccountsUserConfig } from "./type-validation.js";

export function resolveGasConfig(value: GasUserConfig = "auto"): GasConfig {
  return value === "auto" ? value : BigInt(value);
}

export function resolveHttpNetworkAccounts(
  accounts: HttpNetworkAccountsUserConfig | undefined = "remote",
  resolveConfigurationVariable: ConfigurationResolver,
): HttpNetworkAccountsConfig {
  if (Array.isArray(accounts)) {
    return accounts.map((acc) => {
      if (typeof acc === "string") {
        acc = normalizeHexString(acc);
      }

      return resolveConfigurationVariable(acc);
    });
  }

  if (isHdAccountsUserConfig(accounts)) {
    return {
      ...DEFAULT_HD_ACCOUNTS_CONFIG_PARAMS,
      ...accounts,
    };
  }

  return accounts;
}

export function resolveEdrNetworkAccounts(
  accounts:
    | EdrNetworkAccountsUserConfig
    | undefined = DEFAULT_EDR_NETWORK_HD_ACCOUNTS_CONFIG_PARAMS,
  resolveConfigurationVariable: ConfigurationResolver,
): EdrNetworkAccountsConfig {
  if (Array.isArray(accounts)) {
    return accounts.map(({ privateKey, balance }) => {
      if (typeof privateKey === "string") {
        privateKey = normalizeHexString(privateKey);
      }

      return {
        privateKey: resolveConfigurationVariable(privateKey),
        balance: BigInt(balance),
      };
    });
  }

  return {
    ...DEFAULT_EDR_NETWORK_HD_ACCOUNTS_CONFIG_PARAMS,
    ...accounts,
    accountsBalance: BigInt(
      accounts.accountsBalance ??
        DEFAULT_EDR_NETWORK_HD_ACCOUNTS_CONFIG_PARAMS.accountsBalance,
    ),
  };
}

export function resolveForkingConfig(
  forkingUserConfig: EdrNetworkForkingUserConfig | undefined,
  cacheDir: string,
  resolveConfigurationVariable: ConfigurationResolver,
): EdrNetworkForkingConfig | undefined {
  if (forkingUserConfig === undefined) {
    return undefined;
  }

  const httpHeaders =
    forkingUserConfig.httpHeaders !== undefined
      ? Object.entries(forkingUserConfig.httpHeaders).map(([name, value]) => ({
          name,
          value,
        }))
      : undefined;

  return {
    enabled: forkingUserConfig.enabled ?? true,
    url: resolveConfigurationVariable(forkingUserConfig.url),
    cacheDir: path.join(cacheDir, "edr-fork-cache"),
    blockNumber:
      forkingUserConfig.blockNumber !== undefined
        ? BigInt(forkingUserConfig.blockNumber)
        : undefined,
    httpHeaders,
  };
}

export function resolveMiningConfig(
  miningUserConfig: EdrNetworkMiningUserConfig | undefined = {},
): EdrNetworkMiningConfig {
  const { auto, interval, mempool } = miningUserConfig;

  return {
    auto: auto ?? interval === undefined,
    interval: interval ?? 0,
    mempool: {
      order: mempool?.order ?? "priority",
    },
  };
}

export function resolveCoinbase(
  coinbase: string | undefined = EDR_NETWORK_DEFAULT_COINBASE,
): Uint8Array {
  return hexStringToBytes(coinbase);
}

export function resolveChains(
  chains: EdrNetworkChainsUserConfig | undefined,
): EdrNetworkChainsConfig {
  const resolvedChains: EdrNetworkChainsConfig = new Map([
    [
      // block numbers below were taken from https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/common/src/chains
      1, // mainnet
      {
        hardforkHistory: new Map([
          [HardforkName.FRONTIER, 0],
          [HardforkName.HOMESTEAD, 1_150_000],
          [HardforkName.DAO, 1_920_000],
          [HardforkName.TANGERINE_WHISTLE, 2_463_000],
          [HardforkName.SPURIOUS_DRAGON, 2_675_000],
          [HardforkName.BYZANTIUM, 4_370_000],
          [HardforkName.CONSTANTINOPLE, 7_280_000],
          [HardforkName.PETERSBURG, 7_280_000],
          [HardforkName.ISTANBUL, 9_069_000],
          [HardforkName.MUIR_GLACIER, 9_200_000],
          [HardforkName.BERLIN, 1_2244_000],
          [HardforkName.LONDON, 12_965_000],
          [HardforkName.ARROW_GLACIER, 13_773_000],
          [HardforkName.GRAY_GLACIER, 15_050_000],
          [HardforkName.MERGE, 15_537_394],
          [HardforkName.SHANGHAI, 17_034_870],
          [HardforkName.CANCUN, 19_426_589],
        ]),
      },
    ],
    [
      3, // ropsten
      {
        hardforkHistory: new Map([
          [HardforkName.BYZANTIUM, 1700000],
          [HardforkName.CONSTANTINOPLE, 4230000],
          [HardforkName.PETERSBURG, 4939394],
          [HardforkName.ISTANBUL, 6485846],
          [HardforkName.MUIR_GLACIER, 7117117],
          [HardforkName.BERLIN, 9812189],
          [HardforkName.LONDON, 10499401],
        ]),
      },
    ],
    [
      4, // rinkeby
      {
        hardforkHistory: new Map([
          [HardforkName.BYZANTIUM, 1035301],
          [HardforkName.CONSTANTINOPLE, 3660663],
          [HardforkName.PETERSBURG, 4321234],
          [HardforkName.ISTANBUL, 5435345],
          [HardforkName.BERLIN, 8290928],
          [HardforkName.LONDON, 8897988],
        ]),
      },
    ],
    [
      5, // goerli
      {
        hardforkHistory: new Map([
          [HardforkName.ISTANBUL, 1561651],
          [HardforkName.BERLIN, 4460644],
          [HardforkName.LONDON, 5062605],
        ]),
      },
    ],
    [
      42, // kovan
      {
        hardforkHistory: new Map([
          [HardforkName.BYZANTIUM, 5067000],
          [HardforkName.CONSTANTINOPLE, 9200000],
          [HardforkName.PETERSBURG, 10255201],
          [HardforkName.ISTANBUL, 14111141],
          [HardforkName.BERLIN, 24770900],
          [HardforkName.LONDON, 26741100],
        ]),
      },
    ],
    [
      11155111, // sepolia
      {
        hardforkHistory: new Map([
          [HardforkName.GRAY_GLACIER, 0],
          [HardforkName.MERGE, 1_450_409],
          [HardforkName.SHANGHAI, 2_990_908],
          [HardforkName.CANCUN, 5_187_023],
        ]),
      },
    ],
    // TODO: the rest of this config is a temporary workaround,
    // see https://github.com/NomicFoundation/edr/issues/522
    [
      10, // optimism mainnet
      {
        hardforkHistory: new Map([[HardforkName.SHANGHAI, 0]]),
      },
    ],
    [
      11155420, // optimism sepolia
      {
        hardforkHistory: new Map([[HardforkName.SHANGHAI, 0]]),
      },
    ],
    [
      42161, // arbitrum one
      {
        hardforkHistory: new Map([[HardforkName.SHANGHAI, 0]]),
      },
    ],
    [
      421614, // arbitrum sepolia
      {
        hardforkHistory: new Map([[HardforkName.SHANGHAI, 0]]),
      },
    ],
  ]);

  if (chains === undefined) {
    return resolvedChains;
  }

  chains.forEach((chainConfig, chainId) => {
    const resolvedChainConfig: EdrNetworkChainConfig = {
      hardforkHistory: new Map(),
    };
    if (chainConfig.hardforkHistory !== undefined) {
      chainConfig.hardforkHistory.forEach((block, name) => {
        resolvedChainConfig.hardforkHistory.set(name, block);
      });
    }
    resolvedChains.set(chainId, resolvedChainConfig);
  });

  return resolvedChains;
}

export function resolveHardfork(
  hardfork: string | undefined,
  enableTransientStorage: boolean | undefined,
): string {
  if (hardfork !== undefined) {
    return hardfork;
  }

  if (enableTransientStorage === true) {
    return LATEST_HARDFORK;
  } else {
    return HardforkName.SHANGHAI;
  }
}

export function resolveInitialBaseFeePerGas(
  initialBaseFeePerGas: bigint | number | undefined,
): bigint | undefined {
  return initialBaseFeePerGas !== undefined
    ? BigInt(initialBaseFeePerGas)
    : undefined;
}
