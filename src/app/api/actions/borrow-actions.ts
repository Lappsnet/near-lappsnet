"use server";

import { cookies } from "next/headers";
import { connect, KeyPair, keyStores, utils } from "near-api-js";
import { KeyPairString } from "near-api-js/lib/utils";

// NEAR configuration
const nearConfig = {
  networkId: "testnet", // or 'mainnet'
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
  // Add other necessary configurations
};

// Initialize key store and account
const initializeNear = async () => {
  const keyStore = new keyStores.InMemoryKeyStore();
  // Load your server's key pair (ensure this is secure)
  const privateKey = process.env.NEAR_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("NEAR_PRIVATE_KEY is not set");
  }
  const keyPair = KeyPair.fromString(privateKey as KeyPairString);
  const accountId = process.env.NEAR_ACCOUNT_ID;
  if (!accountId) {
    throw new Error("NEAR_ACCOUNT_ID is not set");
  }
  await keyStore.setKey(nearConfig.networkId, accountId, keyPair);

  const near = await connect({
    ...nearConfig,
    keyStore,
  });

  const account = await near.account(accountId);
  return account;
};

export async function borrow({ amount, termInDays, collateral }: any) {
  const accountId = cookies().get("accountId")?.value;

  if (!accountId) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    const account = await initializeNear();

    // Define the contract and method
    const contractId = "your-contract.testnet";
    const methodName = "borrow";
    const args = {
      amount: utils.format.parseNearAmount(amount.toString()) || "0",
      term_in_days: parseInt(termInDays, 10),
    };
    const gas = "30000000000000"; // 30 TGas
    const deposit = utils.format.parseNearAmount(collateral.toString()) || "0";

    // Create and send the transaction
    const result = await account.functionCall({
      contractId,
      methodName,
      args,
      gas: BigInt(gas),
      attachedDeposit: BigInt(deposit),
    });

    console.log("Transaction result:", result);
    return { success: true, message: "Borrow successful!" };
  } catch (error) {
    console.error("Borrow error:", error);
    return { success: false, message: "Borrow failed. Please try again." };
  }
}
