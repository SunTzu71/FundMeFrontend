import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useContract } from "../UseContract";
import { CONTRACT_ADDRESS } from "../ContractConfig";

const GetBalance: React.FC = () => {
  const { contract } = useContract();
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const getOwnerBalance = async () => {
      if (contract) {
        try {
          // Get the owner's address
          //const ownerAddress = await contract.getOwner();

          // Get the provider
          const provider = new ethers.BrowserProvider(
            window.ethereum as ethers.Eip1193Provider,
          );

          // Get the balance
          const balanceWei = await provider.getBalance(CONTRACT_ADDRESS);

          // Convert balance from Wei to Ether
          const balanceEth = ethers.formatEther(balanceWei);

          setBalance(balanceEth);
        } catch (error) {
          console.error("Error getting owner balance:", error);
        }
      }
    };

    getOwnerBalance();
  }, [contract]);

  return (
    <>
      <div>Contract Balance: {balance} ETH</div>
    </>
  );
};

export default GetBalance;
