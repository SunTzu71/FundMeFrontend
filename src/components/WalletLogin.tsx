import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { EthereumProvider, Address } from "../types/ethereum";

interface WalletLoginProps {
  onLogin: (address: string, signature: string) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  userAddress: string;
}

const WalletLogin: React.FC<WalletLoginProps> = ({
  onLogin,
  onLogout,
  isLoggedIn,
  userAddress,
}) => {
  const [walletAddress, setWalletAddress] = useState<Address>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Message to sign
  const MESSAGE_TO_SIGN = "Login to My App";

  useEffect(() => {
    checkWalletConnection();
    setupEventListeners();

    return () => removeEventListeners();
  }, []);

  const checkWalletConnection = async () => {
    try {
      const ethereum = window.ethereum as EthereumProvider;
      if (ethereum) {
        const accounts = (await ethereum.request({
          method: "eth_accounts",
        })) as string[];

        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      }
    } catch (err) {
      console.error("Error checking wallet connection:", err);
    }
  };

  const setupEventListeners = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }
  };

  const removeEventListeners = () => {
    if (window.ethereum) {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      handleLogout();
    } else {
      setWalletAddress(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    handleLogout();
    window.location.reload();
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      if (!window.ethereum) {
        throw new Error("Please install MetaMask to login");
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      setWalletAddress(address);

      // Create provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Request signature
      const signature = await signer.signMessage(MESSAGE_TO_SIGN);

      // Verify signature
      const recoveredAddress = ethers.verifyMessage(MESSAGE_TO_SIGN, signature);

      if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
        onLogin(address, signature);
      } else {
        throw new Error("Signature verification failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setWalletAddress("");
    onLogout();
  };

  return (
    <div className="wallet-login">
      {!isLoggedIn ? ( // Use isLoggedIn from props instead of local state
        <div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="login-button"
          >
            {loading ? "Connecting..." : "Login with Wallet"}
          </button>
          {walletAddress && (
            <p className="wallet-address">
              Wallet connected: {walletAddress}
              <br />
              Please sign the message to login
            </p>
          )}
        </div>
      ) : (
        <div>
          <p className="success-message">
            Successfully logged in with wallet: {userAddress}{" "}
            {/* Use userAddress from props */}
          </p>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}

      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
};

export default WalletLogin;
