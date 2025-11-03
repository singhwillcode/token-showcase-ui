import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Crown, Lock, Unlock, Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FounderActionsProps {
  onTokenBurning: (amount: string) => Promise<void>;
  onFreezeId: (address: string) => Promise<void>;
  onUnfreezeId: (address: string) => Promise<void>;
  disabled?: boolean;
}

export const FounderActions = ({
  onTokenBurning,
  onFreezeId,
  onUnfreezeId,
  disabled,
}: FounderActionsProps) => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBurning = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    setLoading(true);
    try {
      await onTokenBurning(amount);
      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  const handleFreeze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    try {
      await onFreezeId(address);
      setAddress("");
    } finally {
      setLoading(false);
    }
  };

  const handleUnfreeze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    try {
      await onUnfreezeId(address);
      setAddress("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-amber-600/5">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-500">
        <Crown className="h-5 w-5" />
        Founder Actions
      </h3>
      <Tabs defaultValue="burn" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="burn">Burn</TabsTrigger>
          <TabsTrigger value="freeze">Freeze</TabsTrigger>
          <TabsTrigger value="unfreeze">Unfreeze</TabsTrigger>
        </TabsList>
        
        <TabsContent value="burn">
          <form onSubmit={handleBurning} className="space-y-4">
            <div>
              <Label htmlFor="founder-burn">Amount to Burn</Label>
              <Input
                id="founder-burn"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={disabled || loading}
              />
            </div>
            <Button
              type="submit"
              disabled={disabled || loading || !amount}
              className="w-full"
              variant="destructive"
            >
              <Flame className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : "Burn Supply"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="freeze">
          <form onSubmit={handleFreeze} className="space-y-4">
            <div>
              <Label htmlFor="freeze-address">Address to Freeze</Label>
              <Input
                id="freeze-address"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={disabled || loading}
              />
            </div>
            <Button
              type="submit"
              disabled={disabled || loading || !address}
              className="w-full"
              variant="destructive"
            >
              <Lock className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : "Freeze Address"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="unfreeze">
          <form onSubmit={handleUnfreeze} className="space-y-4">
            <div>
              <Label htmlFor="unfreeze-address">Address to Unfreeze</Label>
              <Input
                id="unfreeze-address"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={disabled || loading}
              />
            </div>
            <Button
              type="submit"
              disabled={disabled || loading || !address}
              className="w-full"
            >
              <Unlock className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : "Unfreeze Address"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
