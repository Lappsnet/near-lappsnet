"use server";

export type Loan = {
  id: string;
  amount: number;
  interestRate: number;
  term: number;
  startDate: string;
  status: "active" | "paid" | "defaulted";
  remainingBalance: number;
};

export type LoanSummary = {
  totalLoans: number;
  totalAmount: number;
  averageInterestRate: number;
  activeLoans: number;
};

export type MonthlyPayment = {
  month: string;
  amount: number;
};

export async function getUserLoans(): Promise<Loan[]> {
  // This is a mock implementation. Replace with actual database queries or API calls.

  return [
    {
      id: "1",
      amount: 10000,
      interestRate: 5,
      term: 12,
      startDate: "2023-01-01",
      status: "active",
      remainingBalance: 8000,
    },
    {
      id: "2",
      amount: 5000,
      interestRate: 4.5,
      term: 6,
      startDate: "2023-03-15",
      status: "active",
      remainingBalance: 3000,
    },
    {
      id: "3",
      amount: 15000,
      interestRate: 6,
      term: 24,
      startDate: "2022-11-01",
      status: "active",
      remainingBalance: 12000,
    },
    {
      id: "4",
      amount: 7500,
      interestRate: 5.5,
      term: 9,
      startDate: "2023-02-01",
      status: "paid",
      remainingBalance: 0,
    },
  ];
}

export async function getLoanSummary(): Promise<LoanSummary> {
  // This is a mock implementation. Replace with actual database queries or API calls.

  return {
    totalLoans: 4,
    totalAmount: 37500,
    averageInterestRate: 5.25,
    activeLoans: 3,
  };
}

export async function getMonthlyPayments(): Promise<MonthlyPayment[]> {
  // This is a mock implementation. Replace with actual database queries or API calls.

  return [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 1300 },
    { month: "Mar", amount: 1100 },
    { month: "Apr", amount: 1400 },
    { month: "May", amount: 1250 },
    { month: "Jun", amount: 1350 },
  ];
}

export async function makePayment(
  loanId: string,
  amount: number
): Promise<{ success: boolean; message: string }> {
  // This is a mock implementation. Replace with actual payment processing logic.
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

  return {
    success: true,
    message: `Payment of ${amount} NEAR successfully made for loan ${loanId}`,
  };
}
