/* eslint-disable no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Copy, CheckCircle, AlertCircle, ArrowUpRight, ArrowDownRight, ArrowLeftRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Define TypeScript interfaces (if not already defined elsewhere)
interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'transfer'
  amount: number
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
}

interface ActivityLogEntry {
  id: string
  action: string
  timestamp: string
}

interface UserProfile {
  name: string
  email: string
  walletAddress: string
  accountCreated: string
  kycStatus: 'approved' | 'pending' | 'rejected'
  totalBalance: number
  recentTransactions: Transaction[]
  activityLog: ActivityLogEntry[]
}

// Mock functions to simulate API calls
const mockGetUserProfile = async (): Promise<UserProfile> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Return fake user profile data
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    walletAddress: '0xABCDEF1234567890ABCDEF1234567890ABCDEF12',
    accountCreated: '2023-01-15T10:30:00Z',
    kycStatus: 'approved',
    totalBalance: 2500.75,
    recentTransactions: [
      {
        id: 'tx1',
        type: 'deposit',
        amount: 500.00,
        timestamp: '2024-10-25T14:48:00Z',
        status: 'completed',
      },
      {
        id: 'tx2',
        type: 'withdrawal',
        amount: 200.00,
        timestamp: '2024-10-20T09:15:00Z',
        status: 'pending',
      },
      {
        id: 'tx3',
        type: 'transfer',
        amount: 150.00,
        timestamp: '2024-10-18T16:30:00Z',
        status: 'completed',
      },
    ],
    activityLog: [
      {
        id: 'act1',
        action: 'Logged in',
        timestamp: '2024-10-30T08:00:00Z',
      },
      {
        id: 'act2',
        action: 'Updated profile',
        timestamp: '2024-10-28T12:45:00Z',
      },
      {
        id: 'act3',
        action: 'Performed a withdrawal',
        timestamp: '2024-10-20T09:15:00Z',
      },
    ],
  }
}

const mockUpdateUserProfile = async (name: string, email: string): Promise<{ message: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate successful update
  return { message: 'Profile updated successfully.' }
}

export default function UserProfileComponent() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { toast } = useToast()  

  useEffect(() => {
    async function fetchData() {
      try {
        const profile = await mockGetUserProfile()
        setUserProfile(profile)
        setName(profile.name)
        setEmail(profile.email)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user profile. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [toast])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const result = await mockUpdateUserProfile(name, email)
      toast({
        title: "Success",
        description: result.message,
      })
      setUserProfile((prev: any) => prev ? { ...prev, name, email } : null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Address copied to clipboard",
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!userProfile) {
    return <div className="text-center text-red-500">No user profile found.</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email"
                  required
                />
              </div>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Wallet Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Information</CardTitle>
            <CardDescription>Your blockchain wallet details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Wallet Address</p>
              <div className="flex items-center space-x-2">
                <code className="bg-muted p-2 rounded text-sm flex-1 overflow-x-auto">
                  {userProfile.walletAddress}
                </code>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(userProfile.walletAddress)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Account Created</p>
              <p>{new Date(userProfile.accountCreated).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">KYC Status</p>
              <div className="flex items-center space-x-2">
                {userProfile.kycStatus === 'approved' ? (
                  <CheckCircle className="text-green-500" />
                ) : userProfile.kycStatus === 'pending' ? (
                  <AlertCircle className="text-yellow-500" />
                ) : (
                  <AlertCircle className="text-red-500" />
                )}
                <span className="capitalize">{userProfile.kycStatus}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
          <CardDescription>Your current balance and recent activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-6">
            Total Balance: {userProfile.totalBalance.toFixed(2)} NEAR
          </div>
          <Tabs defaultValue="transactions">
            <TabsList className="mb-4">
              <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userProfile.recentTransactions.map((transaction: Transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {transaction.type === 'deposit' && <ArrowDownRight className="mr-2 text-green-500" />}
                          {transaction.type === 'withdrawal' && <ArrowUpRight className="mr-2 text-red-500" />}
                          {transaction.type === 'transfer' && <ArrowLeftRight className="mr-2 text-blue-500" />}
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.amount.toFixed(2)} NEAR</TableCell>
                      <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="activity">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userProfile.activityLog.map((activity: ActivityLogEntry) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{new Date(activity.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
