'use server'

import { cookies } from 'next/headers'

type BorrowParams = {
  amount: string
  termInDays: string
  collateral: string
}

export async function borrow({ amount, termInDays, collateral }: BorrowParams): Promise<{ success: boolean; message: string }> {
  const accountId = cookies().get('accountId')?.value

  if (!accountId) {
    return { success: false, message: 'User not authenticated' }
  }

  try {
    // This is a mock implementation. Replace with actual NEAR contract call.
    const wallet = await import('@near-wallet-selector/core').then(m => m.setupWallet())
    await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: 'your-contract.testnet',
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: 'borrow',
            args: {
              amount: (parseFloat(amount) * 1e24).toString(),
              termInDays: parseInt(termInDays),
            },
            gas: '30000000000000',
            deposit: (parseFloat(collateral) * 1e24).toString(),
          },
        },
      ],
    })

    return { success: true, message: 'Borrow successful!' }
  } catch (error) {
    console.error('Borrow error:', error)
    return { success: false, message: 'Borrow failed. Please try again.' }
  }
}