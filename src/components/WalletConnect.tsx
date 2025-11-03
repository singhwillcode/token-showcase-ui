import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, LogOut } from "lucide-react";

interface WalletConnectProps {
  account: string;
  isConnecting: boolean;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletConnect = ({
  account,
  isConnecting,
  isConnected,
  onConnect,
  onDisconnect,
}: WalletConnectProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Wallet Connection</h2>
          {isConnected ? (
            <p className="text-muted-foreground">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          ) : (
            <p className="text-muted-foreground">
              Connect your wallet to interact with the token
            </p>
          )}
        </div>
        {isConnected ? (
          <Button onClick={onDisconnect} variant="outline" size="lg">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        ) : (
          <Button onClick={onConnect} disabled={isConnecting} size="lg">
            <Wallet className="mr-2 h-4 w-4" />
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </div>
    </Card>
  );
};
