"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getBankAccounts,
  getCreditCards,
  linkBankAccount,
  addCreditCard,
  convertFiatToNEAR,
  convertNEARToFiat,
  BankAccount,
  CreditCard,
} from "@/app/api/actions/integration";
import { Loader2, CreditCard as CreditCardIcon, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BankIntegration() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLinking, setIsLinking] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [fiatAmount, setFiatAmount] = useState("");
  const [nearAmount, setNearAmount] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const [accounts, cards] = await Promise.all([
          getBankAccounts(),
          getCreditCards(),
        ]);
        setBankAccounts(accounts);
        setCreditCards(cards);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch accounts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchAccounts();
  }, [toast]);

  const handleLinkBank = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLinking(true);
    const formData = new FormData(event.currentTarget);
    const bankName = formData.get("bankName") as string;
    const accountNumber = formData.get("accountNumber") as string;
    const accountType = formData.get("accountType") as "checking" | "savings";

    try {
      const newAccount = await linkBankAccount(
        bankName,
        accountNumber,
        accountType
      );
      setBankAccounts((prev) => [...prev, newAccount]);
      toast({
        title: "Success",
        description: "Bank account linked successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to link bank account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLinking(false);
    }
  };

  const handleAddCard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAdding(true);
    const formData = new FormData(event.currentTarget);
    const cardNumber = formData.get("cardNumber") as string;
    const expiryDate = formData.get("expiryDate") as string;
    const cvv = formData.get("cvv") as string;

    try {
      const newCard = await addCreditCard(cardNumber, expiryDate, cvv);
      setCreditCards((prev) => [...prev, newCard]);
      toast({
        title: "Success",
        description: "Credit card added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add credit card. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleFiatToNEAR = async () => {
    try {
      const { nearAmount: convertedAmount } = await convertFiatToNEAR(
        parseFloat(fiatAmount),
        "USD"
      );
      setNearAmount(convertedAmount);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert currency. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNEARToFiat = async () => {
    try {
      const { fiatAmount: convertedAmount } = await convertNEARToFiat(
        parseFloat(nearAmount),
        "USD"
      );
      setFiatAmount(convertedAmount);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert currency. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Linked Bank Accounts</CardTitle>
          <CardDescription>Your connected bank accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank Name</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Account Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.bankName}</TableCell>
                  <TableCell>{account.accountNumber}</TableCell>
                  <TableCell>{account.accountType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Link New Bank Account</CardTitle>
          <CardDescription>
            Connect a new bank account to your NEAR wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLinkBank} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input id="bankName" name="bankName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input id="accountNumber" name="accountNumber" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <Select name="accountType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isLinking}>
              {isLinking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Building2 className="mr-2 h-4 w-4" />
              )}
              Link Bank Account
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected Credit Cards</CardTitle>
          <CardDescription>Your linked credit cards</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Card Type</TableHead>
                <TableHead>Last Four Digits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creditCards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell>{card.cardType}</TableCell>
                  <TableCell>****{card.lastFourDigits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Credit Card</CardTitle>
          <CardDescription>
            Link a new credit card to your NEAR wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCard} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" name="cardNumber" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" name="cvv" required />
            </div>
            <Button type="submit" disabled={isAdding}>
              {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CreditCardIcon className="mr-2 h-4 w-4" />
              )}
              Add Credit Card
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Currency Conversion</CardTitle>
          <CardDescription>Convert between fiat and NEAR</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Fiat Amount"
                value={fiatAmount}
                onChange={(e) => setFiatAmount(e.target.value)}
              />
              <Button onClick={handleFiatToNEAR}>Convert to NEAR</Button>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="NEAR Amount"
                value={nearAmount}
                onChange={(e) => setNearAmount(e.target.value)}
              />
              <Button onClick={handleNEARToFiat}>Convert to Fiat</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
