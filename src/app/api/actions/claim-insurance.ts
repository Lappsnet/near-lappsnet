'use server'


export async function claimInsuranceFund() {
 /*  const accountId = cookies().get('accountId')?.value

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
            methodName: 'claimInsuranceFund',
            args: {},
            gas: '30000000000000',
            deposit: '0',
          },
        },
      ],
    })

    return { success: true, message: 'Insurance fund claimed successfully!' }
  } catch (error) {
    console.error('Claim error:', error)
    return { success: false, message: 'Claim failed. Please try again.' }
  } */
}