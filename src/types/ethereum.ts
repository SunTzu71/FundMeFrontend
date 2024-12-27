import { JsonRpcRequest, JsonRpcResponse } from "./json-rpc";

export type HexString = string;
export type Address = string;

export interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

export interface EthereumProvider {
  isMetaMask?: boolean;
  selectedAddress?: string;
  networkVersion?: string;
  chainId?: string;

  request(args: RequestArguments): Promise<unknown>;
  send(method: string, params?: Array<unknown>): Promise<unknown>;
  sendAsync?(
    request: JsonRpcRequest,
    callback: (error: Error | null, response: JsonRpcResponse) => void,
  ): void;

  on(
    event: "connect",
    listener: (connectInfo: { chainId: string }) => void,
  ): void;
  on(
    event: "disconnect",
    listener: (error: { code: number; message: string }) => void,
  ): void;
  on(event: "accountsChanged", listener: (accounts: string[]) => void): void;
  on(event: "chainChanged", listener: (chainId: string) => void): void;
  on(event: string, listerner: (...args: unknown[]) => void): void;

  removeListener(event: string, listener: (...args: unknown[]) => void): void;
  removeListener(
    event: "accountsChanged",
    listener: (accounts: string[]) => void,
  ): void;
  removeListener(
    event: "chainChanged",
    listener: (chainId: string) => void,
  ): void;
  removeListener(event: string, listener: (...args: unknown[]) => void): void;
}

export interface TransactionRequest {
  from?: Address;
  to?: Address;
  value?: number | string;
  gas?: number | string;
  gasPrice?: number | string;
  data?: string;
  nonce?: number;
}

// You can also add types for common responses
export interface BlockNumber {
  jsonrpc: "2.0";
  id: number;
  result: string;
}

export interface Network {
  name: string;
  chainId: number;
  ensAddress?: string;
}

// Extend the global Window interface
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
