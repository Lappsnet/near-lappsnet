/* eslint-disable no-unused-vars */
'use server'

import { cookies } from 'next/headers'

export type BankAccount = {
  id: string
  bankName: string
  accountNumber: string
  accountType: 'checking' | 'savings'
}

export type CreditCard = {
  id: string
  cardType: 'visa' | 'mastercard' | 'amex'
  lastFourDigits: string
}

export async function getBankAccounts(): Promise<BankAccount[]> {
  const accountId = cookies().get('accountId')?.value

  if (!accountId) {
    throw new Error('User not authenticated')
  }

  // This is a mock implementation. Replace with actual API call to your banking partner.
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay

  return [
    { id: '1', bankName: 'Global Bank', accountNumber: '****1234', accountType: 'checking' },
    { id: '2', bankName: 'Savings Co.', accountNumber: '****5678', accountType: 'savings' },
  ]
}

export async function getCreditCards(): Promise<CreditCard[]> {
  const accountId = cookies().get('accountId')?.value

  if (!accountId) {
    throw new Error('User not authenticated')
  }

  // This is a mock implementation. Replace with actual API call to your card issuer.
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay

  return [
    { id: '1', cardType: 'visa', lastFourDigits: '1234' },
    { id: '2', cardType: 'mastercard', lastFourDigits: '5678' },
  ]
}

export async function linkBankAccount(bankName: string, accountNumber: string, accountType: 'checking' | 'savings'): Promise<BankAccount> {
  const accountId = cookies().get('accountId')?.value

  if (!accountId) {
    throw new Error('User not authenticated')
  }

  // This is a mock implementation. Replace with actual API call to your banking partner.
  await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate network delay

  return {
    id: Math.random().toString(36).substr(2, 9),
    bankName,
    accountNumber: '****' + accountNumber.slice(-4),
    accountType,
  }
}

export async function addCreditCard(cardNumber: string, expiryDate: string, cvv: string): Promise<CreditCard> {
  const accountId = cookies().get('accountId')?.value

  if (!accountId) {
    throw new Error('User not authenticated')
  }

  // This is a mock implementation. Replace with actual API call to your card issuer.
  await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate network delay

  const cardType = cardNumber.startsWith('4') ? 'visa' : cardNumber.startsWith('5') ? 'mastercard' : 'amex'

  return {
    id: Math.random().toString(36).substr(2, 9),
    cardType,
    lastFourDigits: cardNumber.slice(-4),
  }
}

export async function convertFiatToNEAR(amount: number, currency: string): Promise<{ nearAmount: string }> {
  // This is a mock implementation. Replace with actual conversion logic and API calls.
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay

  // Mock conversion rate: 1 USD = 10 NEAR
  const conversionRate = 10
  const nearAmount = (amount * conversionRate).toFixed(2)

  return { nearAmount }
}

export async function convertNEARToFiat(amount: number, currency: string): Promise<{ fiatAmount: string }> {
  // This is a mock implementation. Replace with actual conversion logic and API calls.
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay

  // Mock conversion rate: 1 NEAR = 0.1 USD
  const conversionRate = 0.1
  const fiatAmount = (amount * conversionRate).toFixed(2)

  return { fiatAmount }
}