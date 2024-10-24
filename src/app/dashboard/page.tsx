// app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import { DollarSign, RefreshCw, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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

const pieChartData = [
  { name: "Active", value: 400 },
  { name: "Repaid", value: 300 },
  { name: "Defaulted", value: 50 },
];

const COLORS = ["#00ED97", "#00BFA6", "#009688", "#00796B"];

export default function DashboardPage() {
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);

  const handleChartClick = (data: any) => {
    setSelectedDataPoint(data);
  };

  return (
    <main className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-3xl font-bold mb-4 text-00ED97">
        Dashboard - Overview
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black border border-00ED97">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-00ED97">
                Total Loans
              </CardTitle>
              <DollarSign className="h-5 w-5 text-00ED97" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-00ED97">$123,456,789</div>
              <p className="text-xs text-gray-400">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-black border border-00ED97">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-00ED97">
                Active Contracts
              </CardTitle>
              <RefreshCw className="h-5 w-5 text-00ED97" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-00ED97">567</div>
              <p className="text-xs text-gray-400">+10.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-black border border-00ED97">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-00ED97">
                Total Value Locked
              </CardTitle>
              <Shield className="h-5 w-5 text-00ED97" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-00ED97">$987,654,321</div>
              <p className="text-xs text-gray-400">+15.3% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-black border border-00ED97">
          <CardHeader>
            <CardTitle className="text-00ED97">Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} onClick={handleChartClick}>
                <CartesianGrid stroke="#00ED97" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#00ED97" />
                <YAxis stroke="#00ED97" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="totalLoans"
                  stackId="1"
                  stroke="#00ED97"
                  fill="#00ED97"
                />
                <Area
                  type="monotone"
                  dataKey="tvl"
                  stackId="1"
                  stroke="#00BFA6"
                  fill="#00BFA6"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-black border border-00ED97">
            <CardHeader>
              <CardTitle className="text-00ED97">Loan Distribution</CardTitle>
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
                    fill="#00ED97"
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

          <Card className="bg-black border border-00ED97">
            <CardHeader>
              <CardTitle className="text-00ED97">Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} onClick={handleChartClick}>
                  <CartesianGrid stroke="#00ED97" strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#00ED97" />
                  <YAxis stroke="#00ED97" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalLoans" fill="#00ED97" />
                  <Bar dataKey="activeContracts" fill="#00BFA6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Data Point Details Dialog */}
      <Dialog
        open={!!selectedDataPoint}
        onOpenChange={() => setSelectedDataPoint(null)}
      >
        <DialogContent className="bg-black border border-00ED97 text-00ED97">
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
    </main>
  );
}
