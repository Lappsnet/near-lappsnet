/* eslint-disable @next/next/no-img-element */
import AboutSection from "@/components/about-section";
import HeroSection from "@/components/hero-section";
import KeyStatisticsChart from "@/components/stadistics";
import Rewards from "@/components/rewards";
import FeaturesAndBenefits from "@/components/features";
import Faq from "@/components/faq";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <HeroSection />
      <AboutSection />
      <KeyStatisticsChart />
      <Rewards />
      <FeaturesAndBenefits />
      <Faq />
    </main>
  );
}
