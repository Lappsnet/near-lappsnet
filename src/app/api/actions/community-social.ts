"use server";

export type ForumPost = {
  id: string;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
};

export type Referral = {
  id: string;
  referredUser: string;
  status: "pending" | "completed";
  reward: string;
};

export type NFTReward = {
  id: string;
  name: string;
  description: string;
  image: string;
  points: number;
};

export type UserProfile = {
  accountId: string;
  totalPoints: number;
  nftRewards: NFTReward[];
};

export async function getForumPosts(
  page: number = 1,
  limit: number = 10
): Promise<ForumPost[]> {
  return Array.from({ length: limit }, (_, i) => ({
    id: `post-${(page - 1) * limit + i + 1}`,
    author: `foobar`,
    title: `Discussion Topic ${i + 1}`,
    content: `This is the content of discussion topic ${i + 1}. It's a great place to share ideas and get advice from the community.`,
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    likes: Math.floor(Math.random() * 50),
    replies: Math.floor(Math.random() * 20),
  }));
}

export async function createForumPost(
  title: string,
  content: string
): Promise<ForumPost> {
  return {
    id: `post-${Date.now()}`,
    author: "foobar",
    title,
    content,
    timestamp: new Date().toISOString(),
    likes: 0,
    replies: 0,
  };
}

export async function getReferrals(): Promise<Referral[]> {
  return [
    {
      id: "1",
      referredUser: "alice.near",
      status: "completed",
      reward: "100 Points",
    },
    {
      id: "2",
      referredUser: "bob.near",
      status: "pending",
      reward: "100 Points",
    },
    {
      id: "3",
      referredUser: "charlie.near",
      status: "completed",
      reward: "100 Points",
    },
  ];
}

// eslint-disable-next-line no-unused-vars
export async function submitFeedback(): Promise<{
  success: boolean;
  message: string;
}> {
  return { success: true, message: "Thank you for your feedback!" };
}

export async function getUserProfile(): Promise<UserProfile> {
  return {
    accountId: "foobar",
    totalPoints: 1250,
    nftRewards: [
      {
        id: "1",
        name: "Early Adopter",
        description: "Awarded for being one of our first users",
        image: "/public/pyramid.gif",
        points: 500,
      },
      {
        id: "2",
        name: "Savings Master",
        description: "Reached a savings milestone",
        image: "/public/pyramid.gif",
        points: 750,
      },
    ],
  };
}
