'use server';

import { cookies } from 'next/headers';
import {
  renderToStream,
  Document,
  Page,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';

type ReportType = 'activeLoans' | 'userActivities' | 'financials';

// Define styles for PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 10 },
  content: { fontSize: 12 },
});

// Mock data for demonstration purposes
const mockData = {
  activeLoans: [
    { id: '1', borrower: 'alice.near', amount: '1000 NEAR', dueDate: '2023-12-31' },
    { id: '2', borrower: 'bob.near', amount: '500 NEAR', dueDate: '2023-11-30' },
  ],
  userActivities: [
    { user: 'alice.near', action: 'deposit', amount: '100 NEAR', timestamp: '2023-10-15T10:30:00Z' },
    { user: 'bob.near', action: 'borrow', amount: '500 NEAR', timestamp: '2023-10-16T14:45:00Z' },
  ],
  financials: {
    totalDeposits: '10000 NEAR',
    totalLoans: '7500 NEAR',
    revenue: '250 NEAR',
    defaultRate: '2.5%',
  },
};

async function fetchReportData(reportType: ReportType) {
  // Return the mock data for the requested report type
  return mockData[reportType];
}

export async function generateReport(reportType: ReportType): Promise<Buffer> {
  // Check if the user is authenticated
  const accountId = cookies().get('accountId')?.value;
  if (!accountId) {
    throw new Error('User not authenticated');
  }

  // Fetch the report data
  const reportData = await fetchReportData(reportType);

  // Create the PDF document
  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{`${reportType} Report`}</Text>
        <Text style={styles.content}>{JSON.stringify(reportData, null, 2)}</Text>
      </Page>
    </Document>
  );

  // Render the PDF to a Buffer
  const pdfStream = await renderToStream(MyDocument);

  // Collect the stream data into a Buffer
  const chunks: any[] = [];
  for await (const chunk of pdfStream) {
    chunks.push(chunk);
  }
  const pdfBuffer = Buffer.concat(chunks);

  return pdfBuffer;
}
