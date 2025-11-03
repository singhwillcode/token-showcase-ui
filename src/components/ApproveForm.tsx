import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, Plus, Minus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ApproveFormProps {
  onApprove: (spender: string, amount: string) => Promise<void>;
  onIncreaseAllowance: (spender: string, amount: string) => Promise<void>;
  onDecreaseAllowance: (spender: string, amount: string) => Promise<void>;
  disabled?: boolean;
}

export const ApproveForm = ({
  onApprove,
  onIncreaseAllowance,
  onDecreaseAllowance,
  disabled,
}: ApproveFormProps) => {
  const [spender, setSpender] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spender || !amount) return;

    setLoading(true);
    try {
      await onApprove(spender, amount);
      setSpender("");
      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spender || !amount) return;

    setLoading(true);
    try {
      await onIncreaseAllowance(spender, amount);
      setSpender("");
      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spender || !amount) return;

    setLoading(true);
    try {
      await onDecreaseAllowance(spender, amount);
      setSpender("");
      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CheckCircle className="h-5 w-5" />
        Manage Allowances
      </h3>
      <Tabs defaultValue="approve" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approve">Approve</TabsTrigger>
          <TabsTrigger value="increase">Increase</TabsTrigger>
          <TabsTrigger value="decrease">Decrease</TabsTrigger>
        </TabsList>
        
        <TabsContent value="approve">
          <form onSubmit={handleApprove} className="space-y-4">
            <div>
              <Label htmlFor="approve-spender">Spender Address</Label>
              <Input
                id="approve-spender"
                placeholder="0x..."
                value={spender}
                onChange={(e) => setSpender(e.target.value)}
                disabled={disabled || loading}
              />
            </div>
            <div>
              <Label htmlFor="approve-amount">Amount</Label>
              <Input
                id="approve-amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={disabled || loading}
              />
            </div>
            <Button
              type="submit"
              disabled={disabled || loading || !spender || !amount}
              className="w-full"
            >
              {loading ? "Processing..." : "Approve"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="increase">
          <form onSubmit={handleIncrease} className="space-y-4">
            <div>
              <Label htmlFor="increase-spender">Spender Address</Label>
              <Input
                id="increase-spender"
                placeholder="0x..."
                value={spender}
                onChange={(e) => setSpender(e.target.value)}
                disabled={disabled || loading}
              />
            </div>
            <div>
              <Label htmlFor="increase-amount">Amount to Add</Label>
              <Input
                id="increase-amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={disabled || loading}
              />
            </div>
            <Button
              type="submit"
              disabled={disabled || loading || !spender || !amount}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : "Increase Allowance"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="decrease">
          <form onSubmit={handleDecrease} className="space-y-4">
            <div>
              <Label htmlFor="decrease-spender">Spender Address</Label>
              <Input
                id="decrease-spender"
                placeholder="0x..."
                value={spender}
                onChange={(e) => setSpender(e.target.value)}
                disabled={disabled || loading}
              />
            </div>
            <div>
              <Label htmlFor="decrease-amount">Amount to Subtract</Label>
              <Input
                id="decrease-amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={disabled || loading}
              />
            </div>
            <Button
              type="submit"
              disabled={disabled || loading || !spender || !amount}
              className="w-full"
            >
              <Minus className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : "Decrease Allowance"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
