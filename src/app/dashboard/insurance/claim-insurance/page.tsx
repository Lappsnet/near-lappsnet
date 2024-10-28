"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { claimInsuranceFund } from "@/app/api/actions/claim-insurance";
import { useToast } from "@/hooks/use-toast";

export default function ClaimInsurance() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleClaim() {
    setIsLoading(true);
    try {
      const result = await claimInsuranceFund();
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
        <CardTitle>Claim Insurance Fund</CardTitle>
        <CardDescription>
          Claim the insurance fund for the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Click the button below to claim the insurance fund. This action should
          only be performed in case of emergency or as per the platform
          guidelines.
        </p>
        <Button onClick={handleClaim} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Claiming...
            </>
          ) : (
            "Claim Insurance Fund"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
