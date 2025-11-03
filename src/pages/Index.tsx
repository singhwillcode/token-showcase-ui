import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/hooks/useWallet";
import { useContract } from "@/hooks/useContract";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/config/contract";
import { WalletConnect } from "@/components/WalletConnect";
import { TokenInfo } from "@/components/TokenInfo";
import { TransferForm } from "@/components/TransferForm";
import { ApproveForm } from "@/components/ApproveForm";
import { BurnForm } from "@/components/BurnForm";
import { FounderActions } from "@/components/FounderActions";
import { Card } from "@/components/ui/card";
import { Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import inc from "@/assets/instagram-1-svgrepo-com.svg";
import x from "@/assets/twitter-x.svg";


const Index = () => {
  const { account, signer, isConnecting, connectWallet, disconnectWallet, isConnected } = useWallet();
  const { getContract, handleTransaction } = useContract(signer);
  
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("0");
  const [userBalance, setUserBalance] = useState("0");
  const [isFounder, setIsFounder] = useState(false);

  const loadTokenData = async () => {
    if (!signer) return;

    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const [name, symbol, supply, balance, founder] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.totalSupply(),
        contract.balanceOf(account),
        contract.founder(),
      ]);

      setTokenName(name);
      setTokenSymbol(symbol);
      setTotalSupply(supply.toString());
      setUserBalance(balance.toString());
      setIsFounder(founder.toLowerCase() === account.toLowerCase());
    } catch (error) {
      console.error("Error loading token data:", error);
    }
  };

  useEffect(() => {
    if (isConnected && signer) {
      loadTokenData();
    }
  }, [isConnected, signer, account]);

  const handleTransfer = async (recipient: string, amount: string) => {
    const contract = getContract();
    if (!contract) return;

    await handleTransaction(
      contract.transfer(recipient, amount),
      `Successfully transferred ${amount} ${tokenSymbol} tokens`
    );
    await loadTokenData();
  };

  const handleApprove = async (spender: string, amount: string) => {
    const contract = getContract();
    if (!contract) return;

    await handleTransaction(
      contract.approve(spender, amount),
      `Successfully approved ${amount} ${tokenSymbol} tokens for ${spender.slice(0, 6)}...${spender.slice(-4)}`
    );
  };

  const handleIncreaseAllowance = async (spender: string, amount: string) => {
    const contract = getContract();
    if (!contract) return;

    await handleTransaction(
      contract.increaseAllowance(spender, amount),
      `Successfully increased allowance by ${amount} ${tokenSymbol} tokens`
    );
  };

  const handleDecreaseAllowance = async (spender: string, amount: string) => {
    const contract = getContract();
    if (!contract) return;

    await handleTransaction(
      contract.decreaseAllowance(spender, amount),
      `Successfully decreased allowance by ${amount} ${tokenSymbol} tokens`
    );
  };

  const handleBurn = async (amount: string) => {
    const contract = getContract();
    if (!contract) return;

    await handleTransaction(
      contract.burn(amount),
      `Successfully burned ${amount} ${tokenSymbol} tokens`
    );
    await loadTokenData();
  };

  const handleBurnFrom = async (account: string, amount: string) => {
    const contract = getContract();
    if (!contract) return;

    await handleTransaction(
      contract.burnFrom(account, amount),
      `Successfully burned ${amount} ${tokenSymbol} tokens from ${account.slice(0, 6)}...${account.slice(-4)}`
    );
    await loadTokenData();
  };

  const handleTokenBurning = async (amount: string) => {
    const contract = getContract();
    if (!contract) return;

    await handleTransaction(
      contract.tokenBurning(amount),
      `Successfully burned ${amount} ${tokenSymbol} tokens from supply`
    );
    await loadTokenData();
  };

  const handleFreezeId = async (address: string) => {
    const contract = getContract();
    if (!contract) return;

    await handleTransaction(
      contract.freezeId(address),
      `Successfully froze address ${address.slice(0, 6)}...${address.slice(-4)}`
    );
  };

  const handleUnfreezeId = async (address: string) => {
    const contract = getContract();
    if (!contract) return;

    await handleTransaction(
      contract.unfreezeId(address),
      `Successfully unfroze address ${address.slice(0, 6)}...${address.slice(-4)}`
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <img src={logo} alt="Black Buddha Peace" className="w-24 h-24 mx-auto mb-4" />
<h1 className="text-5xl font-bold mb-3 text-white">
  Black Buddha Peace Token
</h1>
          <p className="text-xl text-white mb-4">
  ERC20 Token Management Dashboard
</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
           <Button

  size="sm"
  asChild
  className="flex items-center gap-2 px-3 py-1 rounded border border-gray-400 bg-white text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500" // Removed bg-transparent, added bg-white, changed hover
>
  <a
    href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
    target="_blank"
    rel="noopener noreferrer"
    className="" 
  >
    <ExternalLink className="h-4 w-4" /> 
    View on Etherscan
  </a>
</Button>
            <Card className="px-3 py-1 text-sm bg-white border-primary/20">
  <span className="text-gray-700">Network:</span>{" "}
  <span className="font-semibold text-gray-900">Sepolia Testnet</span>
</Card>
          </div>
        </div>

        
        <div className="mb-8">
          <WalletConnect
            account={account}
            isConnecting={isConnecting}
            isConnected={isConnected}
            onConnect={connectWallet}
            onDisconnect={disconnectWallet}
          />
        </div>

        {isConnected && (
          <>
         
            <div className="mb-8">
              <TokenInfo
                name={tokenName}
                symbol={tokenSymbol}
                totalSupply={totalSupply}
                userBalance={userBalance}
                isFounder={isFounder}
              />
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <TransferForm
                onTransfer={handleTransfer}
                disabled={!isConnected}
              />
              <ApproveForm
                onApprove={handleApprove}
                onIncreaseAllowance={handleIncreaseAllowance}
                onDecreaseAllowance={handleDecreaseAllowance}
                disabled={!isConnected}
              />
              <BurnForm
                onBurn={handleBurn}
                onBurnFrom={handleBurnFrom}
                disabled={!isConnected}
              />
              
              {isFounder && (
                <FounderActions
                  onTokenBurning={handleTokenBurning}
                  onFreezeId={handleFreezeId}
                  onUnfreezeId={handleUnfreezeId}
                  disabled={!isConnected}
                />
              )}
            </div>

          <Card className="p-6 bg-gradient-to-br from-secondary/5 to-primary/5">
  <div className="flex items-start gap-3">
    <Shield className="h-5 w-5 text-primary mt-1" />
    <div className="flex-1">
      <h3 className="font-semibold mb-2">Contract Information</h3>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-medium">Address:</span>{" "}
          <code className="bg-muted px-2 py-1 rounded">{CONTRACT_ADDRESS}</code>
        </p>
        <p>
          <span className="font-medium">Network:</span> Sepolia Testnet (Chain ID: 11155111)
        </p>
        <p>
          <span className="font-medium">License:</span> GPL-3.0
        </p>
      </div>
<br/>
      <span> Social Links  </span>
      <div className="flex items-center gap-4 mt-4">
        <a
          href="https://www.instagram.com/singh_saheeb_g?igsh=MTFkMmZvOXRqNTVxMg=="
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300"
        >
          <img
            src={inc}
            alt="Instagram"
            className="w-6 h-6 object-contain rounded-full"
          />
        </a>

        <a
          href="https://x.com/GaurabS43863?t=BIDgXeHWFHwsvGVdgkyceA&s=08"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300"
        >
          <img
            src={x}
            alt="X"
            className="w-6 h-6 object-contain rounded-full"
          />
        </a>
      </div>
    </div>
  </div>
</Card>

            
          </>
        )}

        {!isConnected && (
          <Card className="p-12 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-muted-foreground">
              Please connect your wallet to interact with the Black Buddha Peace Token
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
