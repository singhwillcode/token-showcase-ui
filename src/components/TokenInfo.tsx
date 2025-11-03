import { Card } from "@/components/ui/card";
import { Coins, TrendingDown, Shield, User } from "lucide-react";

interface TokenInfoProps {
  name: string;
  symbol: string;
  totalSupply: string;
  userBalance: string;
  isFounder: boolean;
}

export const TokenInfo = ({
  name,
  symbol,
  totalSupply,
  userBalance,
  isFounder,
}: TokenInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Coins className="h-5 w-5 text-blue-500" />
          </div>
          <h3 className="font-semibold text-muted-foreground">Token Name</h3>
        </div>
        <p className="text-2xl font-bold">{name}</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Shield className="h-5 w-5 text-purple-500" />
          </div>
          <h3 className="font-semibold text-muted-foreground">Symbol</h3>
        </div>
        <p className="text-2xl font-bold">{symbol}</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-green-500/20">
            <TrendingDown className="h-5 w-5 text-green-500" />
          </div>
          <h3 className="font-semibold text-muted-foreground">Total Supply</h3>
        </div>
        <p className="text-2xl font-bold">{totalSupply}</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-orange-500/20">
            <User className="h-5 w-5 text-orange-500" />
          </div>
          <h3 className="font-semibold text-muted-foreground">Your Balance</h3>
        </div>
        <p className="text-2xl font-bold">{userBalance}</p>
        {isFounder && (
          <span className="text-xs text-orange-500 font-semibold mt-1 inline-block">
            FOUNDER
          </span>
        )}
      </Card>
    </div>
  );
};
