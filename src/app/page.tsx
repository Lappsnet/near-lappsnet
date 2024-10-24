/* eslint-disable @next/next/no-img-element */
import AboutSection from "@/components/about-section";
import HeroSection from "@/components/hero-section";
import KeyStatisticsChart from "@/components/stadistics";
import Rewards from "@/components/rewards";
import FeaturesAndBenefits from "@/components/features";
import Faq from "@/components/faq";
import NavbarV0 from "@/components/navbar";
import { FooterV0 } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <NavbarV0 />
      <HeroSection />
      <AboutSection />
      <KeyStatisticsChart />
      <Rewards />
      <FeaturesAndBenefits />
      <Faq />
      <FooterV0 />
    </main>
  );
}
