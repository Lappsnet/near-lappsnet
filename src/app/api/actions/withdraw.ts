// /app/api/actions/withdraw.ts

let availableBalance = 1000; // Starting balance in NEAR

export async function getAvailableBalance(): Promise<number> {
  // Simulate fetching the available balance
  return availableBalance;
}

export async function withdrawFunds(
  amount: string
): Promise<{ success: boolean; message: string }> {
  const withdrawAmount = parseFloat(amount);

  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    return { success: false, message: "Invalid withdraw amount" };
  }

  if (withdrawAmount > availableBalance) {
    return { success: false, message: "Insufficient balance" };
  }

  // Simulate withdrawing funds by deducting from the available balance
  availableBalance -= withdrawAmount;

  return {
    success: true,
    message: `Successfully withdrew ${withdrawAmount.toFixed(2)} NEAR`,
  };
}
