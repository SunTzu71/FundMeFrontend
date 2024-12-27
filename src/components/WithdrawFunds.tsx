import { useContract } from "../UseContract";
import React, { useState } from "react";

const WithdrawFunds: React.FC = () => {
  const { contract } = useContract();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleWithdraw = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      // Call the withdraw function without any parameters
      const tx = await contract.withdraw();

      // Wait for the transaction to be mined
      await tx.wait();

      setSuccess(true);
    } catch (err) {
      console.error("Withdrawing error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while withdrawing",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-container">
      <h3>Withdraw Funds</h3>
      <div className="withdraw-form">
        <button onClick={handleWithdraw} disabled={loading}>
          {loading ? "Withdrawing..." : "Withdraw All Funds"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">Successfully withdrew all funds!</div>
      )}
    </div>
  );
};

export default WithdrawFunds;
