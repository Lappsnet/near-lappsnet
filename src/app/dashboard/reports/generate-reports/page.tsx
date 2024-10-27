"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

// Define the types of reports available
type ReportType = "activeLoans" | "userActivities" | "financials";

// Mock data to populate the reports
const mockData = {
  activeLoans: [
    {
      id: "1",
      borrower: "alice.near",
      amount: "1000 NEAR",
      dueDate: "2023-12-31",
    },
    {
      id: "2",
      borrower: "bob.near",
      amount: "500 NEAR",
      dueDate: "2023-11-30",
    },
  ],
  userActivities: [
    {
      user: "alice.near",
      action: "deposit",
      amount: "100 NEAR",
      timestamp: "2023-10-15T10:30:00Z",
    },
    {
      user: "bob.near",
      action: "borrow",
      amount: "500 NEAR",
      timestamp: "2023-10-16T14:45:00Z",
    },
  ],
  financials: {
    totalDeposits: "10000 NEAR",
    totalLoans: "7500 NEAR",
    revenue: "250 NEAR",
    defaultRate: "2.5%",
  },
};

// Delay function for simulation
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function GenerateReports() {
  const [reportType, setReportType] = useState<ReportType | "">("");
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle PDF generation and download
  const handleDownload = async () => {
    if (!reportType) return;
    setLoading(true);

    try {
      await delay(2000);

      // Dynamically import @react-pdf/renderer to avoid static generation errors
      const { pdf, Document, Page, Text, StyleSheet } = await import(
        "@react-pdf/renderer"
      );

      // Define styles within the dynamic import
      const styles = StyleSheet.create({
        page: { padding: 30 },
        title: { fontSize: 24, marginBottom: 10 },
        content: { fontSize: 12, marginBottom: 10 },
      });

      // Create the PDF document
      const MyDocument = (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.title}>
              {`${reportType.replace(/([A-Z])/g, " $1")} Report`}
            </Text>
            {/* Render content based on the selected report type */}
            {reportType === "activeLoans" &&
              mockData.activeLoans.map((loan) => (
                <Text key={loan.id} style={styles.content}>
                  {`Loan ID: ${loan.id}\nBorrower: ${loan.borrower}\nAmount: ${loan.amount}\nDue Date: ${loan.dueDate}`}
                </Text>
              ))}
            {reportType === "userActivities" &&
              mockData.userActivities.map((activity, index) => (
                <Text key={index} style={styles.content}>
                  {`User: ${activity.user}\nAction: ${activity.action}\nAmount: ${activity.amount}\nTimestamp: ${activity.timestamp}`}
                </Text>
              ))}
            {reportType === "financials" && (
              <Text style={styles.content}>
                {`Total Deposits: ${mockData.financials.totalDeposits}\nTotal Loans: ${mockData.financials.totalLoans}\nRevenue: ${mockData.financials.revenue}\nDefault Rate: ${mockData.financials.defaultRate}`}
              </Text>
            )}
          </Page>
        </Document>
      );

      const asPdf = pdf();
      asPdf.updateContainer(MyDocument);
      const blob = await asPdf.toBlob();

      // Create a download link and trigger the download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${reportType}_report.pdf`;
      document.body.appendChild(link);
      link.click();

      // Clean up the URL object and remove the link
      URL.revokeObjectURL(url);
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Reports</CardTitle>
        <CardDescription>
          Select a report type and generate a PDF report
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          value={reportType}
          onValueChange={(value) => setReportType(value as ReportType)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="activeLoans">Active Loans</SelectItem>
            <SelectItem value="userActivities">User Activities</SelectItem>
            <SelectItem value="financials">Financials</SelectItem>
          </SelectContent>
        </Select>

        {reportType && (
          <Button
            onClick={handleDownload}
            disabled={loading}
            className="w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Download Report"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
