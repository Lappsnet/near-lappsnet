"use client";

import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Search,
  Settings,
  Sun,
  Moon,
  ArrowUpDown,
  Plus,
  Minus,
  AlertTriangle,
  Shield,
  RefreshCw,
  DollarSign,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";

type MenuItem = {
  name: string;
  subItems: string[];
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    subItems: ["Overview", "Analytics"],
    icon: <ChevronRight className="h-4 w-4" />,
  },
  {
    name: "Loan Management",
    subItems: ["View Loans", "Create Loan", "Loan Details"],
    icon: <Plus className="h-4 w-4" />,
  },
  {
    name: "Contract Management",
    subItems: ["View Contracts", "Create Contract", "Contract Details"],
    icon: <RefreshCw className="h-4 w-4" />,
  },
  {
    name: "Deposits",
    subItems: ["Make Deposit", "View Deposits"],
    icon: <Plus className="h-4 w-4" />,
  },
  {
    name: "Borrowing",
    subItems: ["Request Loan", "View Loans"],
    icon: <Minus className="h-4 w-4" />,
  },
  {
    name: "Withdrawals",
    subItems: ["Request Withdrawal", "View Withdrawals"],
    icon: <Minus className="h-4 w-4" />,
  },
  {
    name: "Liquidations",
    subItems: ["Liquidate Position", "View Liquidations"],
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    name: "Insurance Fund",
    subItems: ["Make Claim", "View Claims"],
    icon: <Shield className="h-4 w-4" />,
  },
  {
    name: "Interest Rates",
    subItems: ["Set Rates", "View Current Rates"],
    icon: <Percent className="h-4 w-4" />,
  },
];

const loanData = [
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

const contractData = [
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

const depositData = [
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

const chartData = [
  { name: "Jan", totalLoans: 4000000, activeContracts: 240, tvl: 24000000 },
  { name: "Feb", totalLoans: 3000000, activeContracts: 138, tvl: 22100000 },
  { name: "Mar", totalLoans: 2000000, activeContracts: 980, tvl: 22900000 },
  { name: "Apr", totalLoans: 2780000, activeContracts: 390, tvl: 20000000 },
  { name: "May", totalLoans: 1890000, activeContracts: 480, tvl: 21810000 },
  { name: "Jun", totalLoans: 2390000, activeContracts: 380, tvl: 25000000 },
  { name: "Jul", totalLoans: 3490000, activeContracts: 430, tvl: 21000000 },
];

const pieChartData = [
  { name: "Active", value: 400 },
  { name: "Repaid", value: 300 },
  { name: "Defaulted", value: 50 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("Dashboard");
  const [selectedSubItem, setSelectedSubItem] = useState<string>("Overview");
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);

  const toggleExpand = (item: string) => {
    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  const sortData = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data: any[]) => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const getFilteredData = (data: any[]) => {
    if (filterStatus === "All") return getSortedData(data);
    return getSortedData(data).filter((item) => item.status === filterStatus);
  };

  const handleChartClick = (data: any) => {
    setSelectedDataPoint(data);
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">XFY Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Input type="text" placeholder="Search..." className="w-64 mr-4" />
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-4 overflow-y-auto">
          <nav>
            {menuItems.map((item) => (
              <div key={item.name} className="mb-2">
                <Button
                  variant="ghost"
                  className={`flex items-center justify-between w-full p-2 rounded ${
                    selectedMenuItem === item.name
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedMenuItem(item.name);
                    toggleExpand(item.name);
                  }}
                >
                  <span className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </span>
                  {expandedItems.includes(item.name) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                {expandedItems.includes(item.name) && (
                  <div className="ml-4 mt-1">
                    {item.subItems.map((subItem) => (
                      <Button
                        key={subItem}
                        variant="ghost"
                        className={`block w-full text-left p-2 rounded ${
                          selectedSubItem === subItem
                            ? "bg-gray-700"
                            : "hover:bg-gray-700"
                        }`}
                        onClick={() => setSelectedSubItem(subItem)}
                      >
                        {subItem}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
          <main className="p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {selectedMenuItem} - {selectedSubItem}
            </h2>

            {selectedMenuItem === "Dashboard" &&
              selectedSubItem === "Overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Loans
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$123,456,789</div>
                        <p className="text-xs text-muted-foreground">
                          +20.1% from last month
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Active Contracts
                        </CardTitle>
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">567</div>
                        <p className="text-xs text-muted-foreground">
                          +10.5% from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Value Locked
                        </CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$987,654,321</div>
                        <p className="text-xs text-muted-foreground">
                          +15.3% from last month
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData} onClick={handleChartClick}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="totalLoans"
                            stackId="1"
                            stroke="#8884d8"
                            fill="#8884d8"
                          />
                          <Area
                            type="monotone"
                            dataKey="tvl"
                            stackId="1"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Loan Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={pieChartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              onClick={handleChartClick}
                            >
                              {pieChartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Monthly Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={chartData} onClick={handleChartClick}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalLoans" fill="#8884d8" />
                            <Bar dataKey="activeContracts" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

            {selectedMenuItem === "Dashboard" &&
              selectedSubItem === "Analytics" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Performance Indicators</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            Return on Assets (ROA)
                          </h3>
                          <p className="text-2xl font-bold">1.2%</p>
                          <p className="text-sm text-muted-foreground">
                            +0.3% from last year
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            Net Interest Margin
                          </h3>
                          <p className="text-2xl font-bold">3.5%</p>
                          <p className="text-sm text-muted-foreground">
                            -0.1% from last year
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            Efficiency Ratio
                          </h3>
                          <p className="text-2xl font-bold">62%</p>
                          <p className="text-sm text-muted-foreground">
                            Improved by 2%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Loan Performance Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="totalLoans"
                            stroke="#8884d8"
                          />
                          <Line
                            type="monotone"
                            dataKey="tvl"
                            stroke="#82ca9d"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Credit Risk
                          </h3>
                          <Progress value={65} className="w-full" />
                          <p className="text-sm text-muted-foreground mt-1">
                            Moderate risk level
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Liquidity Risk
                          </h3>
                          <Progress value={40} className="w-full" />
                          <p className="text-sm text-muted-foreground mt-1">
                            Low risk level
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Operational Risk
                          </h3>
                          <Progress value={55} className="w-full" />
                          <p className="text-sm text-muted-foreground mt-1">
                            Moderate risk level
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

            {selectedMenuItem === "Loan Management" &&
              selectedSubItem === "View Loans" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <Select
                        value={filterStatus}
                        onValueChange={setFilterStatus}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Repaid">Repaid</SelectItem>
                          <SelectItem value="Defaulted">Defaulted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">
                            <Button
                              variant="ghost"
                              onClick={() => sortData("id")}
                            >
                              ID <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("borrower")}
                            >
                              Borrower <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("amount")}
                            >
                              Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("interestRate")}
                            >
                              Interest Rate{" "}
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("status")}
                            >
                              Status <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("createdAt")}
                            >
                              Created At{" "}
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredData(loanData).map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium">
                              {loan.id}
                            </TableCell>
                            <TableCell>{loan.borrower}</TableCell>
                            <TableCell>
                              ${loan.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>{loan.interestRate}%</TableCell>
                            <TableCell>{loan.status}</TableCell>
                            <TableCell>{loan.createdAt}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

            {selectedMenuItem === "Contract Management" &&
              selectedSubItem === "View Contracts" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contract Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">
                            <Button
                              variant="ghost"
                              onClick={() => sortData("id")}
                            >
                              ID <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("name")}
                            >
                              Name <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("type")}
                            >
                              Type <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("apy")}
                            >
                              APY <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("tvl")}
                            >
                              TVL <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("startDate")}
                            >
                              Start Date{" "}
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("endDate")}
                            >
                              End Date <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getSortedData(contractData).map((contract) => (
                          <TableRow key={contract.id}>
                            <TableCell className="font-medium">
                              {contract.id}
                            </TableCell>
                            <TableCell>{contract.name}</TableCell>
                            <TableCell>{contract.type}</TableCell>
                            <TableCell>{contract.apy}%</TableCell>
                            <TableCell>
                              ${contract.tvl.toLocaleString()}
                            </TableCell>
                            <TableCell>{contract.startDate}</TableCell>
                            <TableCell>{contract.endDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

            {selectedMenuItem === "Deposits" &&
              selectedSubItem === "View Deposits" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Deposit Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">
                            <Button
                              variant="ghost"
                              onClick={() => sortData("id")}
                            >
                              ID <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("user")}
                            >
                              User <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("amount")}
                            >
                              Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("date")}
                            >
                              Date <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => sortData("status")}
                            >
                              Status <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getSortedData(depositData).map((deposit) => (
                          <TableRow key={deposit.id}>
                            <TableCell className="font-medium">
                              {deposit.id}
                            </TableCell>
                            <TableCell>{deposit.user}</TableCell>
                            <TableCell>
                              ${deposit.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>{deposit.date}</TableCell>
                            <TableCell>{deposit.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

            {selectedMenuItem === "Borrowing" &&
              selectedSubItem === "Request Loan" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Request a Loan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div>
                        <Label
                          htmlFor="amount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Loan Amount
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter loan amount"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="term"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Loan Term (months)
                        </Label>
                        <Input
                          id="term"
                          type="number"
                          placeholder="Enter loan term"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="purpose"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Loan Purpose
                        </Label>
                        <Select>
                          <SelectTrigger id="purpose">
                            <SelectValue placeholder="Select loan purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="mortgage">Mortgage</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit">Submit Loan Request</Button>
                    </form>
                  </CardContent>
                </Card>
              )}

            {selectedMenuItem === "Withdrawals" &&
              selectedSubItem === "Request Withdrawal" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Request a Withdrawal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div>
                        <Label
                          htmlFor="withdrawal Amount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Withdrawal Amount
                        </Label>
                        <Input
                          id="withdrawalAmount"
                          type="number"
                          placeholder="Enter withdrawal amount"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="accountType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Account Type
                        </Label>
                        <Select>
                          <SelectTrigger id="accountType">
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="investment">
                              Investment
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label
                          htmlFor="withdrawalMethod"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Withdrawal Method
                        </Label>
                        <Select>
                          <SelectTrigger id="withdrawalMethod">
                            <SelectValue placeholder="Select withdrawal method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bankTransfer">
                              Bank Transfer
                            </SelectItem>
                            <SelectItem value="check">Check</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit">Submit Withdrawal Request</Button>
                    </form>
                  </CardContent>
                </Card>
              )}

            {selectedMenuItem === "Liquidations" &&
              selectedSubItem === "View Liquidations" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Liquidation Risk Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Collateral Health
                        </h3>
                        <Progress value={75} className="w-full" />
                        <p className="text-sm text-gray-500 mt-1">
                          75% of loans are well-collateralized
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Liquidation Threshold
                        </h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <ScatterChart
                            margin={{
                              top: 20,
                              right: 20,
                              bottom: 20,
                              left: 20,
                            }}
                          >
                            <CartesianGrid />
                            <XAxis
                              type="number"
                              dataKey="x"
                              name="collateral ratio"
                              unit="%"
                            />
                            <YAxis
                              type="number"
                              dataKey="y"
                              name="debt value"
                              unit="$"
                            />
                            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                            <Scatter
                              name="Loans"
                              data={[
                                { x: 150, y: 1000000 },
                                { x: 170, y: 2000000 },
                                { x: 140, y: 3000000 },
                                { x: 180, y: 4000000 },
                                { x: 130, y: 5000000 },
                              ]}
                              fill="#8884d8"
                            />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

            {selectedMenuItem === "Insurance Fund" &&
              selectedSubItem === "View Claims" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Insurance Fund Claims</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Claim ID</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>Alice Smith</TableCell>
                          <TableCell>$50,000</TableCell>
                          <TableCell>Liquidation</TableCell>
                          <TableCell>Pending</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2</TableCell>
                          <TableCell>Bob Johnson</TableCell>
                          <TableCell>$100,000</TableCell>
                          <TableCell>Smart Contract Failure</TableCell>
                          <TableCell>Approved</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

            {selectedMenuItem === "Interest Rates" &&
              selectedSubItem === "View Current Rates" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Current Interest Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Rate</TableHead>
                          <TableHead>Last Updated</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Savings Account</TableCell>
                          <TableCell>0.5%</TableCell>
                          <TableCell>2023-07-01</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>1-Year CD</TableCell>
                          <TableCell>2.0%</TableCell>
                          <TableCell>2023-07-01</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>5-Year CD</TableCell>
                          <TableCell>3.5%</TableCell>
                          <TableCell>2023-07-01</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>30-Year Fixed Mortgage</TableCell>
                          <TableCell>3.75%</TableCell>
                          <TableCell>2023-07-01</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>15-Year Fixed Mortgage</TableCell>
                          <TableCell>3.25%</TableCell>
                          <TableCell>2023-07-01</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Personal Loan</TableCell>
                          <TableCell>6.5%</TableCell>
                          <TableCell>2023-07-01</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>© 2023 XFY Dashboard. All rights reserved.</div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>

      {/* Data Point Details Dialog */}
      <Dialog
        open={!!selectedDataPoint}
        onOpenChange={() => setSelectedDataPoint(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Data Point Details</DialogTitle>
          </DialogHeader>
          <div>
            {selectedDataPoint && (
              <div>
                {Object.entries(selectedDataPoint).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong>{" "}
                    {value ? value.toString() : "Unknown"}
                  </p>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
