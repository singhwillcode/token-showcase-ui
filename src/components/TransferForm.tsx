import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

interface TransferFormProps {
  onTransfer: (recipient: string, amount: string) => Promise<void>;
  disabled?: boolean;
}

export const TransferForm = ({ onTransfer, disabled }: TransferFormProps) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;

    setLoading(true);
    try {
      await onTransfer(recipient, amount);
      setRecipient("");
      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Send className="h-5 w-5" />
        Transfer Tokens
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={disabled || loading}
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={disabled || loading}
          />
        </div>
        <Button
          type="submit"
          disabled={disabled || loading || !recipient || !amount}
          className="w-full"
        >
          {loading ? "Processing..." : "Transfer"}
        </Button>
      </form>
    </Card>
  );
};
