import { EthereumProvider } from "./ethereum";

export interface MetaMaskEthereumProvider extends EthereumProvider {
  isMetaMask: true;

  // MetaMask specific methods
  _metamask: {
    isUnlocked: () => Promise<boolean>;
  };

  // Additional MetaMask specific events
  // Override the 'on' method to include MetaMask specific events
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
  on(event: "unlock", listener: () => void): void;
  on(event: "lock", listener: () => void): void;
  on(event: string, listener: (...args: unknown[]) => void): void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
