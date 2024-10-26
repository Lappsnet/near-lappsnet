"use server";

import { cookies } from "next/headers";
import { connect, KeyPair, keyStores, utils } from "near-api-js";
import { KeyPairString } from "near-api-js/lib/utils";

// NEAR configuration (reuse the same configuration as in your borrow function)
const nearConfig = {
  networkId: "testnet", // or 'mainnet'
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
  // Add other necessary configurations
};

// Initialize NEAR connection and account (reuse the same initialization as in your borrow function)
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

// Deposit function
export async function deposit(
  amount: string
): Promise<{ success: boolean; message: string }> {
  const accountId = cookies().get("accountId")?.value;

  if (!accountId) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    const account = await initializeNear();

    // Define the contract and method
    const contractId = "your-contract.testnet"; // Replace with your contract ID
    const methodName = "deposit";

    // Prepare arguments if any (assuming deposit doesn't require additional args)
    const args = {}; // Modify if your contract method requires arguments

    // Parse the amount to attach as yoctoNEAR
    const attachedDeposit = utils.format.parseNearAmount(amount);
    if (!attachedDeposit) {
      throw new Error("Invalid deposit amount");
    }

    // Define gas (use a reasonable amount, e.g., 30 TGas)
    const gas = "30000000000000"; // 30 TGas

    // Create and send the transaction
    const result = await account.functionCall({
      contractId,
      methodName,
      args,
      gas: BigInt(gas),
      attachedDeposit: BigInt(attachedDeposit),
    });

    console.log("Transaction result:", result);
    return { success: true, message: "Deposit successful!" };
  } catch (error) {
    console.error("Deposit error:", error);
    return { success: false, message: "Deposit failed. Please try again." };
  }
}
