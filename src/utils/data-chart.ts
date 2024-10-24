export const depositData = [
  {
    id: 1,
    user: "Alice Smith",
    amount: 100000,
    date: "2023-05-01",
    status: "Completed",
  },
  {
    id: 2,
    user: "Bob Johnson",
    amount: 50000,
    date: "2023-05-03",
    status: "Pending",
  },
  {
    id: 3,
    user: "Charlie Brown",
    amount: 150000,
    date: "2023-04-28",
    status: "Completed",
  },
];

export const contractData = [
  {
    id: 1,
    name: "Mortgage Contract A",
    type: "Fixed Rate",
    apy: 5,
    tvl: 10000000,
    startDate: "2023-01-01",
    endDate: "2053-12-31",
  },
  {
    id: 2,
    name: "Personal Loan B",
    type: "Variable Rate",
    apy: 4.5,
    tvl: 2000000,
    startDate: "2023-02-15",
    endDate: "2028-02-14",
  },
  {
    id: 3,
    name: "Business Loan C",
    type: "Fixed Rate",
    apy: 6,
    tvl: 5000000,
    startDate: "2023-03-01",
    endDate: "2033-08-31",
  },
];

export const loanData = [
  {
    id: 1,
    borrower: "Alice Smith",
    amount: 50000,
    interestRate: 5,
    status: "Active",
    createdAt: "2023-05-01",
  },
  {
    id: 2,
    borrower: "Bob Johnson",
    amount: 100000,
    interestRate: 4.5,
    status: "Active",
    createdAt: "2023-05-03",
  },
  {
    id: 3,
    borrower: "Charlie Brown",
    amount: 75000,
    interestRate: 5.5,
    status: "Repaid",
    createdAt: "2023-04-28",
  },
  {
    id: 4,
    borrower: "David Lee",
    amount: 150000,
    interestRate: 4,
    status: "Active",
    createdAt: "2023-05-05",
  },
  {
    id: 5,
    borrower: "Eve Wilson",
    amount: 30000,
    interestRate: 6,
    status: "Defaulted",
    createdAt: "2023-04-15",
  },
];

export const chartData = [
  { name: "Jan", totalLoans: 4000000, activeContracts: 240, tvl: 24000000 },
  { name: "Feb", totalLoans: 3000000, activeContracts: 138, tvl: 22100000 },
  { name: "Mar", totalLoans: 2000000, activeContracts: 980, tvl: 22900000 },
  { name: "Apr", totalLoans: 2780000, activeContracts: 390, tvl: 20000000 },
  { name: "May", totalLoans: 1890000, activeContracts: 480, tvl: 21810000 },
  { name: "Jun", totalLoans: 2390000, activeContracts: 380, tvl: 25000000 },
  { name: "Jul", totalLoans: 3490000, activeContracts: 430, tvl: 21000000 },
];
