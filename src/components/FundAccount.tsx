import React, { useState } from "react";
import { useContract } from "../UseContract";
import { ethers } from "ethers";

const FundAccount: React.FC = () => {
  const { contract } = useContract();
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleFund = async () => {
    if (!contract || !amount) return;

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      // Convert amount from ETH to Wei
      const amountInWei = ethers.parseEther(amount);

      // Call the fund function with the specified amount
      const tx = await contract.fund({ value: amountInWei });

      // Wait for the transaction to be mined
      await tx.wait();

      setSuccess(true);
      setAmount("");
    } catch (err) {
      console.error("Funding error:", err);
      setError(
        err instanceof Error ? err.message : "An error occurred while funding",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Fund Contract</h2>
      <div>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in ETH"
          disabled={loading}
        />
        <button onClick={handleFund} disabled={loading || !amount || !contract}>
          {loading ? "Processing..." : "Fund"}
        </button>
      </div>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

      {success && (
        <div style={{ color: "green", marginTop: "10px" }}>
          Successfully funded the contract!
        </div>
      )}
    </div>
  );
};

export default FundAccount;
