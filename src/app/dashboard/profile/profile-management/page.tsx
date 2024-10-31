/* eslint-disable no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, AlertTriangle, UserCheck, ShieldAlert, DollarSign } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Define TypeScript interfaces (if not already defined elsewhere)
interface KYCDocument {
  id: string
  type: string
  status: 'pending' | 'approved' | 'rejected'
}

interface UserProfile {
  id: string
  name: string
  email: string
  kycStatus: 'pending' | 'approved' | 'rejected'
  amlStatus: 'clear' | 'flagged' | 'under review'
  riskScore: number
  totalBalance: number
  accountCreated: string
  recentTransactions: any[] // Replace with actual Transaction interface if available
}

// Mock functions to simulate API calls
const mockGetUserProfiles = async (): Promise<UserProfile[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Return fake user profiles
  return [
    {
      id: 'user1',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      kycStatus: 'pending',
      amlStatus: 'clear',
      riskScore: 25,
      totalBalance: 1500.50,
      accountCreated: '2023-05-10T09:30:00Z',
      recentTransactions: [], // Add mock transactions if needed
    },
    {
      id: 'user2',
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      kycStatus: 'approved',
      amlStatus: 'flagged',
      riskScore: 65,
      totalBalance: 3200.00,
      accountCreated: '2022-11-22T14:45:00Z',
      recentTransactions: [],
    },
    {
      id: 'user3',
      name: 'Charlie Davis',
      email: 'charlie.davis@example.com',
      kycStatus: 'rejected',
      amlStatus: 'under review',
      riskScore: 80,
      totalBalance: 500.75,
      accountCreated: '2024-01-05T12:15:00Z',
      recentTransactions: [],
    },
    // Add more mock users as needed
  ]
}

const mockGetKYCDocuments = async (userId: string): Promise<KYCDocument[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Return fake KYC documents based on userId
  const documents: { [key: string]: KYCDocument[] } = {
    'user1': [
      { id: 'doc1', type: 'Passport', status: 'pending' },
      { id: 'doc2', type: 'Utility Bill', status: 'pending' },
    ],
    'user2': [
      { id: 'doc3', type: 'Driver’s License', status: 'approved' },
      { id: 'doc4', type: 'Bank Statement', status: 'approved' },
    ],
    'user3': [
      { id: 'doc5', type: 'ID Card', status: 'rejected' },
      { id: 'doc6', type: 'Tax Document', status: 'rejected' },
    ],
  }

  return documents[userId] || []
}

const mockUpdateKYCStatus = async (userId: string, status: 'approved' | 'rejected'): Promise<{ message: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simulate successful update
  return { message: 'KYC status updated successfully.' }
}

const mockUpdateAMLStatus = async (userId: string, status: 'clear' | 'flagged' | 'under review'): Promise<{ message: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simulate successful update
  return { message: 'AML status updated successfully.' }
}

export default function ProfileManagementDashboard() {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([])
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [kycDocuments, setKycDocuments] = useState<KYCDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchData() {
      try {
        const profiles = await mockGetUserProfiles()
        setUserProfiles(profiles)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user profiles. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [toast])

  const handleUserSelect = async (user: UserProfile) => {
    setSelectedUser(user)
    try {
      const documents = await mockGetKYCDocuments(user.id)
      setKycDocuments(documents)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch KYC documents. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleKYCStatusUpdate = async (status: 'approved' | 'rejected') => {
    if (!selectedUser) return
    setIsUpdating(true)
    try {
      const result = await mockUpdateKYCStatus(selectedUser.id, status)
      toast({
        title: "Success",
        description: result.message,
      })
      setUserProfiles(profiles => profiles.map(profile => 
        profile.id === selectedUser.id ? { ...profile, kycStatus: status } : profile
      ))
      setSelectedUser(user => user ? { ...user, kycStatus: status } : null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update KYC status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleAMLStatusUpdate = async (status: 'clear' | 'flagged' | 'under review') => {
    if (!selectedUser) return
    setIsUpdating(true)
    try {
      const result = await mockUpdateAMLStatus(selectedUser.id, status)
      toast({
        title: "Success",
        description: result.message,
      })
      setUserProfiles(profiles => profiles.map(profile => 
        profile.id === selectedUser.id ? { ...profile, amlStatus: status } : profile
      ))
      setSelectedUser(user => user ? { ...user, amlStatus: status } : null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update AML status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Profile Management Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProfiles.length}</div>
          </CardContent>
        </Card>

        {/* Pending KYC Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProfiles.filter(user => user.kycStatus === 'pending').length}</div>
          </CardContent>
        </Card>

        {/* AML Flags Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AML Flags</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProfiles.filter(user => user.amlStatus === 'flagged').length}</div>
          </CardContent>
        </Card>

        {/* Total Balance Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userProfiles.reduce((sum, user) => sum + user.totalBalance, 0).toFixed(2)} NEAR
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Profiles Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Profiles</CardTitle>
          <CardDescription>Manage user profiles and check AML/KYC status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>AML Status</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userProfiles.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.kycStatus === 'approved' ? 'bg-green-100 text-green-800' :
                      user.kycStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.kycStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.amlStatus === 'clear' ? 'bg-green-100 text-green-800' :
                      user.amlStatus === 'flagged' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.amlStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.riskScore < 30 ? 'bg-green-100 text-green-800' :
                      user.riskScore < 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.riskScore}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => handleUserSelect(user)}>View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>User Profile: {user.name}</DialogTitle>
                          <DialogDescription>Review and update user&apos;s KYC and AML status</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Email:</span>
                            <span className="col-span-3">{user.email}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Account Created:</span>
                            <span className="col-span-3">{new Date(user.accountCreated).toLocaleDateString()}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">KYC Status:</span>
                            <Select 
                              onValueChange={(value) => handleKYCStatusUpdate(value as 'approved' | 'rejected')} 
                              defaultValue={user.kycStatus}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select KYC status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">AML Status:</span>
                            <Select 
                              onValueChange={(value) => handleAMLStatusUpdate(value as 'clear' | 'flagged' | 'under review')} 
                              defaultValue={user.amlStatus}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select AML status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="clear">Clear</SelectItem>
                                <SelectItem value="flagged">Flagged</SelectItem>
                                <SelectItem value="under review">Under Review</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Risk Score:</span>
                            <span className="col-span-3">{user.riskScore}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Total Balance:</span>
                            <span className="col-span-3">{user.totalBalance.toFixed(2)} NEAR</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-bold">Recent Transactions:</span>
                            <span className="col-span-3">N/A</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">KYC Documents</h4>
                          {kycDocuments.length > 0 ? (
                            kycDocuments.map((doc) => (
                              <div key={doc.id} className="flex justify-between items-center mb-2">
                                <span>{doc.type}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {doc.status}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p>No KYC documents available.</p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
