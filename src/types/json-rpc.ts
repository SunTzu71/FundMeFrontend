export interface JsonRpcRequest {
  jsonrpc: string;
  method: string;
  params?: unknown[];
  id?: number | string;
}

export interface JsonRpcResponse {
  jsonrpc: string;
  id: number | string;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export interface RequestArguments {
  method: string;
  params?: unknown[];
}
