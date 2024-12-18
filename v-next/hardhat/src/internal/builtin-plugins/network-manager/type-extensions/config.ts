import type { ChainType, DefaultChainType } from "../../../../types/network.js";
import type { HttpHeader } from "@ignored/edr-optimism";

import "../../../../types/config.js";
declare module "../../../../types/config.js" {
  export interface HardhatUserConfig {
    defaultChainType?: DefaultChainType;
    defaultNetwork?: string;
    networks?: Record<string, NetworkUserConfig>;
  }

  export type NetworkUserConfig = HttpNetworkUserConfig | EdrNetworkUserConfig;

  export interface HttpNetworkUserConfig {
    type: "http";
    accounts?: HttpNetworkAccountsUserConfig;
    chainId?: number;
    chainType?: ChainType;
    from?: string;
    gas?: GasUserConfig;
    gasMultiplier?: number;
    gasPrice?: GasUserConfig;

    // HTTP network specific
    url: string;
    httpHeaders?: Record<string, string>;
    timeout?: number;
  }

  export type HttpNetworkAccountsUserConfig =
    | "remote"
    | SensitiveString[]
    | HttpNetworkHDAccountsUserConfig;

  export interface HttpNetworkHDAccountsUserConfig {
    mnemonic: string;
    count?: number;
    initialIndex?: number;
    passphrase?: string;
    path?: string;
  }

  export type GasUserConfig = "auto" | number | bigint;

  export interface EdrNetworkUserConfig {
    type: "edr";
    accounts?: EdrNetworkAccountsUserConfig;
    chainId?: number;
    chainType?: ChainType;
    from?: string;
    gas?: GasUserConfig;
    gasMultiplier?: number;
    gasPrice?: GasUserConfig;

    // EDR network specific
    allowBlocksWithSameTimestamp?: boolean;
    allowUnlimitedContractSize?: boolean;
    blockGasLimit?: number | bigint;
    chains?: EdrNetworkChainsUserConfig;
    coinbase?: string;
    enableRip7212?: boolean;
    enableTransientStorage?: boolean;
    forking?: EdrNetworkForkingUserConfig;
    hardfork?: string;
    initialBaseFeePerGas?: number | bigint;
    initialDate?: string | Date;
    loggingEnabled?: boolean;
    minGasPrice?: number | bigint;
    mining?: EdrNetworkMiningUserConfig;
    networkId?: number;
    throwOnCallFailures?: boolean;
    throwOnTransactionFailures?: boolean;
  }

  export type EdrNetworkAccountsUserConfig =
    | EdrNetworkAccountUserConfig[]
    | EdrNetworkHDAccountsUserConfig;

  export interface EdrNetworkAccountUserConfig {
    balance: string | bigint;
    privateKey: string;
  }

  export interface EdrNetworkHDAccountsUserConfig {
    mnemonic?: string;
    accountsBalance?: string | bigint;
    count?: number;
    initialIndex?: number;
    passphrase?: string;
    path?: string;
  }

  export type EdrNetworkChainsUserConfig = Map<
    number /* chainId */,
    EdrNetworkChainUserConfig
  >;

  export interface EdrNetworkChainUserConfig {
    hardforkHistory?: HardforkHistoryUserConfig;
  }

  export type HardforkHistoryUserConfig = Map<
    string /* hardforkName */,
    number /* blockNumber */
  >;

  export interface EdrNetworkForkingUserConfig {
    enabled?: boolean;
    url: string;
    blockNumber?: number;
    httpHeaders?: Record<string, string>;
  }

  export interface EdrNetworkMiningUserConfig {
    auto?: boolean;
    interval?: number | [number, number];
    mempool?: EdrNetworkMempoolUserConfig;
  }

  export interface EdrNetworkMempoolUserConfig {
    order?: "fifo" | "priority";
  }

  export interface HardhatConfig {
    defaultChainType: DefaultChainType;
    defaultNetwork: string;
    networks: Record<string, NetworkConfig>;
  }

  export type NetworkConfig = HttpNetworkConfig | EdrNetworkConfig;

  export interface HttpNetworkConfig {
    type: "http";
    accounts: HttpNetworkAccountsConfig;
    chainId?: number;
    chainType?: ChainType;
    from?: string;
    gas: GasConfig;
    gasMultiplier: number;
    gasPrice: GasConfig;

    // HTTP network specific
    url: string;
    httpHeaders: Record<string, string>;
    timeout: number;
  }

  export type HttpNetworkAccountsConfig =
    | "remote"
    | ResolvedConfigurationVariable[]
    | HttpNetworkHDAccountsConfig;

  export interface HttpNetworkHDAccountsConfig {
    mnemonic: string;
    count: number;
    initialIndex: number;
    passphrase: string;
    path: string;
  }

  export type GasConfig = "auto" | bigint;

  export interface EdrNetworkConfig {
    type: "edr";
    accounts: EdrNetworkAccountsConfig;
    chainId: number;
    chainType?: ChainType;
    from?: string;
    gas: GasConfig;
    gasMultiplier: number;
    gasPrice: GasConfig;

    // EDR network specific
    allowBlocksWithSameTimestamp: boolean;
    allowUnlimitedContractSize: boolean;
    blockGasLimit: bigint;
    chains: EdrNetworkChainsConfig;
    coinbase: Uint8Array;
    enableRip7212: boolean;
    enableTransientStorage: boolean;
    forking?: EdrNetworkForkingConfig;
    hardfork: string;
    initialBaseFeePerGas?: bigint;
    initialDate: string | Date;
    loggingEnabled: boolean;
    minGasPrice: bigint;
    mining: EdrNetworkMiningConfig;
    networkId: number;
    throwOnCallFailures: boolean;
    throwOnTransactionFailures: boolean;
  }

  export type EdrNetworkAccountsConfig =
    | EdrNetworkAccountConfig[]
    | EdrNetworkHDAccountsConfig;

  export interface EdrNetworkAccountConfig {
    balance: bigint;
    privateKey: string;
  }

  export interface EdrNetworkHDAccountsConfig {
    mnemonic: string;
    accountsBalance: bigint;
    count: number;
    initialIndex: number;
    passphrase: string;
    path: string;
  }

  export type EdrNetworkChainsConfig = Map<
    number /* chainId */,
    EdrNetworkChainConfig
  >;

  export interface EdrNetworkChainConfig {
    hardforkHistory: HardforkHistoryConfig;
  }

  export type HardforkHistoryConfig = Map<
    string /* hardforkName */,
    number /* blockNumber */
  >;

  export interface EdrNetworkForkingConfig {
    enabled: boolean;
    url: string;
    cacheDir: string;
    blockNumber?: bigint;
    httpHeaders?: HttpHeader[];
  }

  export interface EdrNetworkMiningConfig {
    auto: boolean;
    interval: number | [number, number];
    mempool: EdrNetworkMempoolConfig;
  }

  export interface EdrNetworkMempoolConfig {
    order: "fifo" | "priority";
  }
}
