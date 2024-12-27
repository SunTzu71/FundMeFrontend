import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./ContractConfig";

export function useContract() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum) {
        try {
          // Get provider and signer
          const provider = new ethers.BrowserProvider(window.ethereum); // Changed this line
          const signer = await provider.getSigner(); // Added await
          setSigner(signer);

          // Initialize contract
          const contractInstance = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer,
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Failed to initialize contract:", error);
        }
      }
    };

    initContract();
  }, []);

  return { contract, signer };
}
