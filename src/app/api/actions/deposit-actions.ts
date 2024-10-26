'use server'

import { cookies } from 'next/headers'

export async function deposit(amount: string): Promise<{ success: boolean; message: string }> {
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
            methodName: 'deposit',
            args: {},
            gas: '30000000000000',
            deposit: (parseFloat(amount) * 1e24).toString(),
          },
        },
      ],
    })

    return { success: true, message: 'Deposit successful!' }
  } catch (error) {
    console.error('Deposit error:', error)
    return { success: false, message: 'Deposit failed. Please try again.' }
  }
}