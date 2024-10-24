// app/dashboard/analytics/page.tsx
"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { chartData } from "@/utils/data-chart";

export default function AnalyticsPage() {
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);

  const handleChartClick = (data: any) => {
    setSelectedDataPoint(data);
  };

  return (
    <main className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-3xl font-bold mb-4 text-00ED97">
        Dashboard - Analytics
      </h2>

      <div className="space-y-6">
        <Card className="bg-black border border-00ED97">
          <CardHeader>
            <CardTitle className="text-00ED97">
              Key Performance Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-00ED97">
                  Return on Assets (ROA)
                </h3>
                <p className="text-xl font-bold text-00ED97">1.2%</p>
                <p className="text-sm text-gray-400">+0.3% from last year</p>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-00ED97">
                  Net Interest Margin
                </h3>
                <p className="text-xl font-bold text-00ED97">3.5%</p>
                <p className="text-sm text-gray-400">-0.1% from last year</p>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-00ED97">
                  Efficiency Ratio
                </h3>
                <p className="text-xl font-bold text-00ED97">62%</p>
                <p className="text-sm text-gray-400">Improved by 2%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-00ED97">
          <CardHeader>
            <CardTitle className="text-00ED97">
              Loan Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} onClick={handleChartClick}>
                <CartesianGrid stroke="#00ED97" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#00ED97" />
                <YAxis stroke="#00ED97" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalLoans" stroke="#00ED97" />
                <Line type="monotone" dataKey="tvl" stroke="#00BFA6" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black border border-00ED97">
          <CardHeader>
            <CardTitle className="text-00ED97">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-00ED97 mb-2">
                  Credit Risk
                </h3>
                <Progress value={65} className="w-full bg-gray-700" />
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Moderate risk level
                </p>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-00ED97 mb-2">
                  Liquidity Risk
                </h3>
                <Progress value={40} className="w-full bg-gray-700" />
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Low risk level
                </p>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-00ED97 mb-2">
                  Operational Risk
                </h3>
                <Progress value={55} className="w-full bg-gray-700" />
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Moderate risk level
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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
