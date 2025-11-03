import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BurnFormProps {
  onBurn: (amount: string) => Promise<void>;
  onBurnFrom: (account: string, amount: string) => Promise<void>;
  disabled?: boolean;
  isFounder?: boolean;
}

export const BurnForm = ({ onBurn, onBurnFrom, disabled, isFounder }: BurnFormProps) => {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBurn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    setLoading(true);
    try {
      await onBurn(amount);
      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  const handleBurnFrom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !amount) return;

    setLoading(true);
    try {
      await onBurnFrom(account, amount);
      setAccount("");
      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Flame className="h-5 w-5" />
        Burn Tokens
      </h3>
      <Tabs defaultValue="burn" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="burn">Burn Own</TabsTrigger>
          <TabsTrigger value="burnFrom">Burn From</TabsTrigger>
        </TabsList>
        
        <TabsContent value="burn">
          <form onSubmit={handleBurn} className="space-y-4">
            <div>
              <Label htmlFor="burn-amount">Amount to Burn</Label>
              <Input
                id="burn-amount"
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
              {loading ? "Processing..." : "Burn"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="burnFrom">
          <form onSubmit={handleBurnFrom} className="space-y-4">
            <div>
              <Label htmlFor="burnfrom-account">Account Address</Label>
              <Input
                id="burnfrom-account"
                placeholder="0x..."
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                disabled={disabled || loading}
              />
            </div>
            <div>
              <Label htmlFor="burnfrom-amount">Amount to Burn</Label>
              <Input
                id="burnfrom-amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={disabled || loading}
              />
            </div>
            <Button
              type="submit"
              disabled={disabled || loading || !account || !amount}
              className="w-full"
              variant="destructive"
            >
              {loading ? "Processing..." : "Burn From"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
