"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getAvailableBalance, withdrawFunds } from "@/app/api/actions/withdraw";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Amount must be a positive number"
    ),
});

const COLORS = ["#0088FE", "#00C49F"];

export default function WithdrawForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [availableBalance, setAvailableBalance] = useState(0);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  useEffect(() => {
    async function fetchBalance() {
      try {
        const balance = await getAvailableBalance();
        setAvailableBalance(balance);
      } catch (error) {
        toast({
          title: "Error",
          description:
            "Failed to fetch available balance. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchBalance();
  }, [toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await withdrawFunds(values.amount);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        form.reset();
        // Refresh available balance
        const newBalance = await getAvailableBalance();
        setAvailableBalance(newBalance);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const withdrawAmount = parseFloat(form.watch("amount")) || 0;
  const chartData = [
    { name: "Available", value: availableBalance - withdrawAmount },
    { name: "Withdraw", value: withdrawAmount },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Withdraw Deposit</CardTitle>
        <CardDescription>Withdraw your available NEAR balance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Available Balance</p>
          <p className="text-3xl font-bold">
            {availableBalance.toFixed(2)} NEAR
          </p>
        </div>
        <ChartContainer
          config={{
            available: {
              label: "Available Balance",
              color: "hsl(var(--chart-1))",
            },
            withdraw: {
              label: "Withdraw Amount",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount to Withdraw (NEAR)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      {...field}
                      type="number"
                      step="0.01"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the amount of NEAR you want to withdraw
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || withdrawAmount > availableBalance}
            >
              {isLoading ? "Processing..." : "Confirm Withdrawal"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
