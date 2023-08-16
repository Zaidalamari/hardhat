/**
 * The result of a static call, as returned by eth_call.
 */
export interface RawStaticCallResult {
  /**
   * The data returned by the call.
   */
  returnData: string;

  /**
   * A boolean indicating whether the call was successful or not.
   */
  success: boolean;

  /**
   * A boolean indicating whether the JSON-RPC server that run the
   * call reported that the call failed due to a custom error.
   */
  customErrorReported: boolean;
}

/**
 * The relevant subset of a transaction log, as returned by eth_getTransactionReceipt.
 */
export interface TransactionLog {
  address: string;
  logIndex: number;
  data: string;
  topics: string[];
}

/**
 * The status of a transaction, as represented in its receipt.
 */
export enum TransactionReceiptStatus {
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS",
}

/**
 * The relevant subset of the receipt.
 */
export interface TransactionReceipt {
  blockHash: string;
  blockNumber: number;
  contractAddress?: string;
  status: TransactionReceiptStatus;
  logs: TransactionLog[];
}

/**
 * The params to pay for the network fees.
 *
 * Note: Currently only EIP-1559 transactions are supported.
 */
export interface NetworkFees {
  maxPriorityFeePerGas: bigint;
  maxFeePerGas: bigint;
}

/**
 * This interface represents a transaction that was sent to the network.
 */
export interface Transaction {
  hash: string;

  // Only available after the transaction has confirmed.
  // Note that these not being undefined does not mean that the transaction
  // has enough confirmations for Ignition. We should wait for the right
  // amount of confirmations.
  blockNumber?: number;
  blockHash?: string;

  // We store this data in case we need to bump the transaction fees.
  fees: NetworkFees;

  // Only available after the transaction has confirmed, with enough confirmations.
  receipt?: TransactionReceipt;
}
