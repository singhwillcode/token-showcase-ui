import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { SEPOLIA_CHAIN_ID } from "@/config/contract";
import { useToast } from "@/hooks/use-toast";

export const useWallet = () => {
  const [account, setAccount] = useState<string>("");
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to interact with this dApp",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      // Check if on Sepolia network
      const network = await provider.getNetwork();
      if (network.chainId !== BigInt(11155111)) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: SEPOLIA_CHAIN_ID }],
          });
        } catch (switchError: any) {
          toast({
            title: "Wrong Network",
            description: "Please switch to Sepolia testnet in MetaMask",
            variant: "destructive",
          });
          setIsConnecting(false);
          return;
        }
      }

      const signer = await provider.getSigner();
      setProvider(provider);
      setSigner(signer);
      setAccount(accounts[0]);
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setProvider(null);
    setSigner(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    };
  }, []);

  return {
    account,
    provider,
    signer,
    isConnecting,
    connectWallet,
    disconnectWallet,
    isConnected: !!account,
  };
};
