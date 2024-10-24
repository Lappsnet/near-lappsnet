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
  Plus,
  Minus,
  AlertTriangle,
  Shield,
  RefreshCw,
  DollarSign,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
} from "recharts";
import { chartData } from "@/utils/data-chart";

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

  const handleChartClick = (data: any) => {
    setSelectedDataPoint(data);
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
            XFY Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Button
              className="hidden sm:block w-32 sm:w-64 mr-2" // Removed duplicate className
            />
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
        <div className="w-20 md:w-64 bg-gray-800 text-white p-2 md:p-4 overflow-y-auto">
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
                    <span className="ml-2 hidden md:block">{item.name}</span>
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
          <main className="p-2 sm:p-6">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 dark:text-white">
              {selectedMenuItem} - {selectedSubItem}
            </h2>

            {selectedMenuItem === "Dashboard" &&
              selectedSubItem === "Overview" && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Loans
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg sm:text-2xl font-bold">
                          $123,456,789
                        </div>
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
                        <div className="text-lg sm:text-2xl font-bold">567</div>
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
                        <div className="text-lg sm:text-2xl font-bold">
                          $987,654,321
                        </div>
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
                <div className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Performance Indicators</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h3 className="text-sm sm:text-lg font-semibold">
                            Return on Assets (ROA)
                          </h3>
                          <p className="text-lg sm:text-2xl font-bold">1.2%</p>
                          <p className="text-sm text-muted-foreground">
                            +0.3% from last year
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-lg font-semibold">
                            Net Interest Margin
                          </h3>
                          <p className="text-lg sm:text-2xl font-bold">3.5%</p>
                          <p className="text-sm text-muted-foreground">
                            -0.1% from last year
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-lg font-semibold">
                            Efficiency Ratio
                          </h3>
                          <p className="text-lg sm:text-2xl font-bold">62%</p>
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
                          <h3 className="text-sm sm:text-lg font-semibold mb-2">
                            Credit Risk
                          </h3>
                          <Progress value={65} className="w-full" />
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Moderate risk level
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-lg font-semibold mb-2">
                            Liquidity Risk
                          </h3>
                          <Progress value={40} className="w-full" />
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Low risk level
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-lg font-semibold mb-2">
                            Operational Risk
                          </h3>
                          <Progress value={55} className="w-full" />
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Moderate risk level
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-2 sm:p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div>© 2023 XFY Dashboard. All rights reserved.</div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
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
