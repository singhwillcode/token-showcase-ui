import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/config/contract";
import { useToast } from "@/hooks/use-toast";

export const useContract = (signer: ethers.JsonRpcSigner | null) => {
  const { toast } = useToast();

  const getContract = () => {
    if (!signer) return null;
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  };

  const handleTransaction = async (
    txPromise: Promise<any>,
    successMessage: string
  ) => {
    try {
      const tx = await txPromise;
      
      toast({
        title: "Transaction Submitted",
        description: "Please wait for confirmation...",
      });

      const receipt = await tx.wait();
      
      toast({
        title: "Success!",
        description: successMessage,
      });

      return receipt;
    } catch (error: any) {
      console.error("Transaction error:", error);
      
      let errorMessage = "Transaction failed";
      if (error.reason) {
        errorMessage = error.reason;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Transaction Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    }
  };

  return {
    getContract,
    handleTransaction,
  };
};
