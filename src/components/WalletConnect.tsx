import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { EthereumProvider, Address } from "../types/ethereum";

interface StylesType {
  container: React.CSSProperties;
  button: React.CSSProperties;
  address: React.CSSProperties;
  error: React.CSSProperties;
}

const styles: StylesType = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
    margin: "10px 0",
  },
  address: {
    margin: "10px 0",
    wordBreak: "break-all",
  },
  error: {
    color: "red",
    margin: "10px 0",
  },
};

const WalletConnect: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<Address>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkConnection = async (): Promise<void> => {
      try {
        const ethereum = window.ethereum as EthereumProvider;
        if (typeof ethereum !== "undefined") {
          const accounts = (await ethereum.request({
            method: "eth_accounts",
            params: [], // optional but explicit
          })) as string[];

          if (accounts.length > 0) {
            setWalletAddress(accounts[0] as Address);
          }
        }
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      }
    };

    checkConnection();

    // Add event listeners
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    // Cleanup
    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged,
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts: string[]): void => {
    if (accounts.length > 0) {
      setWalletAddress(accounts[0]);
    } else {
      setWalletAddress("");
    }
  };

  const handleChainChanged = (): void => {
    window.location.reload();
  };

  const connectWallet = async (): Promise<void> => {
    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("Please install MetaMask to use this feature");
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);

      // Create Web3Provider instance
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get the signer
      const signer = await provider.getSigner();

      // Get and set the wallet address
      const address = await signer.getAddress();
      setWalletAddress(address);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    }
  };

  const disconnectWallet = (): void => {
    setWalletAddress("");
  };

  return (
    <div style={styles.container}>
      {!walletAddress ? (
        <button style={styles.button} onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <button style={styles.button} onClick={disconnectWallet}>
            Disconnect
          </button>
          <div style={styles.address}>
            <p>Connected Wallet: {walletAddress}</p>
          </div>
        </div>
      )}

      {error && (
        <div style={styles.error}>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
