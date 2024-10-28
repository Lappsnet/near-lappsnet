/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getForumPosts, createForumPost, getReferrals, submitFeedback, getUserProfile, ForumPost, Referral, UserProfile } from '@/app/api/actions/community-social'
import { Loader2, ThumbsUp, MessageSquare, Share2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Textarea } from '@/components/ui/textarea'

export default function CommunitySocial() {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([])
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [feedback, setFeedback] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    async function fetchData() {
      try {
        const [posts, refs, profile] = await Promise.all([
          getForumPosts(),
          getReferrals(),
          getUserProfile()
        ])
        setForumPosts(posts)
        setReferrals(refs)
        setUserProfile(profile)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch community data. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [toast])

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newPost = await createForumPost(newPostTitle, newPostContent)
      setForumPosts(prevPosts => [newPost, ...prevPosts])
      setNewPostTitle('')
      setNewPostContent('')
      toast({
        title: "Success",
        description: "Your post has been created successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await submitFeedback()
      setFeedback('')
      toast({
        title: "Success",
        description: result.message,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
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
      <h1 className="text-3xl font-bold mb-6">Community & Social</h1>

      {userProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Your points and NFT rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-4">Total Points: {userProfile.totalPoints}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProfile.nftRewards.map((reward: any) => (
                <Card key={reward.id}>
                  <CardHeader>
                    <CardTitle>{reward.name}</CardTitle>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img src={reward.image} alt={reward.name} className="w-full h-auto" />
                    <p className="mt-2">Points: {reward.points}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>User Forums</CardTitle>
          <CardDescription>Engage with the community, share experiences, and seek advice</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreatePost} className="mb-6 space-y-4">
            <Input
              placeholder="Post Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Post Content"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              required
            />
            <Button type="submit">Create Post</Button>
          </form>
          <div className="space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>Posted by {post.author} on {new Date(post.timestamp).toLocaleString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.content}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {post.replies}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Referral Program</CardTitle>
          <CardDescription>Invite friends and earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Share your unique referral link: <strong>https://yourplatform.com/ref/{userProfile?.accountId}</strong></p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referred User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reward</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell>{referral.referredUser}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      referral.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {referral.status}
                    </span>
                  </TableCell>
                  <TableCell>{referral.reward}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
          <CardDescription>Help us improve by sharing your thoughts</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <Textarea
              placeholder="Your feedback"
              value={feedback}
              onChange={(e: any) => setFeedback(e.target.value)}
              required
            />
            <Button type="submit">Submit Feedback</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}