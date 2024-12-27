import { useState, useEffect } from "react"; // Add useEffect
import "./App.css";

import WalletConnect from "./components/WalletConnect";
import GetBalance from "./components/GetBalance";
import FundAccount from "./components/FundAccount";
import WalletLogin from "./components/WalletLogin";
import WithdrawFunds from "./components/WithdrawFunds";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userSignature, setUserSignature] = useState("");

  // Adding conlsole log because we are not using them
  console.log("User address:", userAddress);
  console.log("User signature:", userSignature);

  // Check localStorage on component mount
  useEffect(() => {
    const storedAddress = localStorage.getItem("userAddress");
    const storedSignature = localStorage.getItem("userSignature");

    if (storedAddress && storedSignature) {
      setIsLoggedIn(true);
      setUserAddress(storedAddress);
      setUserSignature(storedSignature);
    }
  }, []);

  const handleLogin = (address: string, signature: string) => {
    setIsLoggedIn(true);
    setUserAddress(address);
    setUserSignature(signature);

    // Store in localStorage
    localStorage.setItem("userAddress", address);
    localStorage.setItem("userSignature", signature);

    console.log("Logged in with address:", address);
    console.log("Signature:", signature);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserAddress("");
    setUserSignature("");

    // Clear localStorage
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userSignature");

    console.log("Logged out");
  };

  return (
    <div className="app-container">
      <WalletLogin
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        userAddress={userAddress}
      />
      {isLoggedIn ? (
        <div className="authenticated-content">
          <WalletConnect />
          <FundAccount />
          <WithdrawFunds />
          <div className="balance-container">
            Balance: <GetBalance />
          </div>
        </div>
      ) : (
        <div className="unauthenticated-message">
          Please login with your wallet to access the application.
        </div>
      )}
    </div>
  );
}

export default App;
