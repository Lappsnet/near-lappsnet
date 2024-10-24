import {
  ShoppingCart,
  Shield,
  DollarSign,
  Zap,
  Percent,
  CreditCard,
} from "lucide-react";

export const rewardsData = {
  rewardsProgram: {
    title: "XFY Rewards+",
    description:
      "Unlock Exclusive Rewards with Every Deposit. At XFY D-Money, we value your trust and commitment. Our XFY Rewards+ program is designed to reward you for your continued engagement and deposits. The more you deposit, the more you earn!",
    tiers: [
      {
        name: "Silver Tier",
        eligibility: "1,000 - 4,999 Points",
        benefits: [
          { text: "2% Bonus Interest", icon: "💰" },
          { text: "Priority Customer Support", icon: "📞" },
          { text: "Referral Boost", icon: "🔗" },
          { text: "Exclusive Webinars", icon: "🎓" },
        ],
        color: "bg-gradient-to-r from-[#ffffff] to-[#ffffff]", // Azul cielo suave a azul pastel
      },
      {
        name: "Gold Tier",
        eligibility: "5,000 - 14,999 Points",
        benefits: [
          { text: "3% Bonus Interest", icon: "💰" },
          { text: "Personal Financial Consultation", icon: "👨‍💼" },
          { text: "VIP Events", icon: "🎟️" },
          { text: "Higher Referral Bonus", icon: "🔝" },
        ],
        color: "bg-gradient-to-r from-[#ffffff] to-[#ffffff]", // Azul suave intermedio
      },
      {
        name: "Platinum Tier",
        eligibility: "15,000+ Points",
        benefits: [
          { text: "4% Bonus Interest", icon: "💰" },
          { text: "Dedicated Account Manager", icon: "👤" },
          { text: "Special Discounts", icon: "💸" },
          { text: "Premium VIP Events", icon: "🌟" },
          { text: "Unlimited Referrals", icon: "♾️" },
        ],
        color: "bg-gradient-to-r from-[#ffffff] to-[#ffffff]", // Azul claro con tono frío
      },
    ],
  },
};

export const faqData = [
  {
    question: "What is XFY D-Money?",
    answer:
      "XFY D-Money is a financial platform that allows users to deposit funds, convert them into stablecoins, earn interest, and have those deposits tokenized by trusted commercial banks, enabling a secure entry into the digital finance world.",
  },
  {
    question: "How does the tokenization process work?",
    answer:
      "When you deposit $1 on our platform, it is automatically converted into a stablecoin. Our partnered commercial banks then tokenize these stablecoin deposits, creating secure digital assets linked to your account.",
  },
  {
    question: "Is my deposit secure?",
    answer:
      "Absolutely. We use industry-leading encryption and security protocols, and our partnered banks ensure that your deposits are fully protected and regulated.",
  },
  {
    question: "How can I withdraw my funds?",
    answer:
      "Withdrawals can be made at any time by converting your stablecoins back to USD and transferring them to your linked bank account or digital wallet.",
  },
  {
    question: "Do I need to have prior experience with cryptocurrencies?",
    answer:
      "No prior experience is necessary. Our user-friendly interface and support team are here to help you every step of the way.",
  },
  {
    question: "How does the interest earning work?",
    answer:
      "Interest on your stablecoin deposits is calculated daily and compounded monthly, allowing your earnings to grow over time without any additional effort.",
  },
  {
    question: "What happens if the stablecoin loses value?",
    answer:
      "Stablecoins are designed to maintain a stable value pegged to a fiat currency like the USD. However, we continuously monitor market conditions and work with our banking partners to mitigate any potential risks.",
  },
];

export const features = [
  {
    icon: ShoppingCart,
    title: "Buy Everywhere",
    shortDescription: "Use our stablecoin at 10,000+ stores",
    fullDescription:
      "Transact on more than 10,000 stores without commission using our stablecoin.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    shortDescription: "Advanced encryption for your protection",
    fullDescription:
      "Advanced encryption protects your funds and personal information.",
  },
  {
    icon: DollarSign,
    title: "Low Minimum Deposit",
    shortDescription: "Start with just $1",
    fullDescription:
      "Start investing with as little as $1, making digital finance accessible to everyone.",
  },
  {
    icon: Zap,
    title: "Instant Conversion",
    shortDescription: "Real-time stablecoin conversion",
    fullDescription:
      "Deposits are converted to stablecoins in real-time, ensuring your funds are always ready.",
  },
  {
    icon: Percent,
    title: "Earn Competitive Interest",
    shortDescription: "Up to 4.0% Annual Interest",
    fullDescription:
      "Benefit from up to 4.0% Annual Interest on your stablecoin deposits.",
  },
  {
    icon: CreditCard,
    title: "Bank-Backed Tokenization",
    shortDescription: "Secure tokenization by partner banks",
    fullDescription:
      "Your deposits are tokenized by our partner banks, providing a layer of security and trust.",
  },
];
