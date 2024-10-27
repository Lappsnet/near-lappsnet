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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getCollateralAssets,
  tokenizeAsset,
  getTokenizedAssets,
  CollateralAsset,
  TokenizedAsset,
} from "@/app/api/actions/tokenization-actions";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Tokenization() {
  const [collateralAssets, setCollateralAssets] = useState<CollateralAsset[]>(
    []
  );
  const [tokenizedAssets, setTokenizedAssets] = useState<TokenizedAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenizing, setIsTokenizing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchAssets() {
      try {
        const [collateral, tokenized] = await Promise.all([
          getCollateralAssets(),
          getTokenizedAssets(),
        ]);
        setCollateralAssets(collateral);
        setTokenizedAssets(tokenized);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch assets. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchAssets();
  }, [toast]);

  const handleTokenize = async (assetId: string) => {
    setIsTokenizing(true);
    try {
      const newToken = await tokenizeAsset(assetId);
      setTokenizedAssets((prev) => [...prev, newToken]);
      setCollateralAssets((prev) =>
        prev.map((asset) =>
          asset.id === assetId ? { ...asset, tokenized: true } : asset
        )
      );
      toast({
        title: "Success",
        description: `Asset successfully tokenized as ${newToken.tokenSymbol}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to tokenize asset. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTokenizing(false);
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
          <CardTitle>Asset Tokenization</CardTitle>
          <CardDescription>Tokenize your collateral assets</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Name</TableHead>
                <TableHead>Value (NEAR)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collateralAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.value}</TableCell>
                  <TableCell>
                    {asset.tokenized ? "Tokenized" : "Not Tokenized"}
                  </TableCell>
                  <TableCell>
                    {!asset.tokenized && (
                      <Button
                        onClick={() => handleTokenize(asset.id)}
                        disabled={isTokenizing}
                      >
                        {isTokenizing ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Tokenize"
                        )}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tokenized Assets</CardTitle>
          <CardDescription>Your tokenized collateral assets</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token Symbol</TableHead>
                <TableHead>Token Amount</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokenizedAssets.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>{token.tokenSymbol}</TableCell>
                  <TableCell>{token.tokenAmount}</TableCell>
                  <TableCell>{token.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
