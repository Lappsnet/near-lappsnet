"use client";

import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateInterestRates } from "@/app/api/actions/update-interests";

const formSchema = z.object({
  baseInterestRate: z
    .string()
    .min(1, "Base Interest Rate is required")
    .refine(
      (val) =>
        !isNaN(parseFloat(val)) &&
        parseFloat(val) >= 0 &&
        parseFloat(val) <= 100,
      "Base Interest Rate must be a number between 0 and 100"
    ),
  minCollateralRatio: z
    .string()
    .min(1, "Minimum Collateral Ratio is required")
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Minimum Collateral Ratio must be a positive number"
    ),
  liquidationFee: z
    .string()
    .min(1, "Liquidation Fee is required")
    .refine(
      (val) =>
        !isNaN(parseFloat(val)) &&
        parseFloat(val) >= 0 &&
        parseFloat(val) <= 100,
      "Liquidation Fee must be a number between 0 and 100"
    ),
});

export default function UpdateInterestRates() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseInterestRate: "",
      minCollateralRatio: "",
      liquidationFee: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await updateInterestRates({
        baseInterestRate: parseFloat(values.baseInterestRate),
        minCollateralRatio: parseFloat(values.minCollateralRatio),
        liquidationFee: parseFloat(values.liquidationFee),
      });
      console.log(result);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Interest Rates</CardTitle>
        <CardDescription>
          Adjust the platform&apos;s interest rates and fees
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="baseInterestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="5.5"
                      {...field}
                      type="number"
                      step="0.1"
                    />
                  </FormControl>
                  <FormDescription>
                    The base interest rate for loans (0-100%)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minCollateralRatio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Collateral Ratio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1.5"
                      {...field}
                      type="number"
                      step="0.1"
                    />
                  </FormControl>
                  <FormDescription>
                    The minimum ratio of collateral to loan value
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="liquidationFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Liquidation Fee (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="10"
                      {...field}
                      type="number"
                      step="0.1"
                    />
                  </FormControl>
                  <FormDescription>
                    The fee charged for liquidations (0-100%)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Rates"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
