/* eslint-disable @next/next/no-img-element */
import { ArrowRightIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import Image from "next/image";

export default async function HeroSection() {
  return (
    <main className="w-full bg-gradient-to-r from-[#0c1851f1] via-[#0C184D] to-[#060e31] ">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-12 md:py-24  md:px-12 h-screen">
        <div className="w-full flex flex-col justify-center items-start text-white mb-10 md:mb-0 font-sans px-6">
          <h5 className="text-lg md:text-xl font-semibold uppercase mb-4">
            Empower Your Finances with XFY D-Money
          </h5>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            The platform for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2f80ed] via-[#0b91de] to-[#0e56b5]">
              financial markets and digital asset ownership
            </span>
          </h1>
          <p className="text-base md:text-lg leading-relaxed mt-6">
            Deposit just $1, convert to stablecoin, earn interest, and enjoy
            exclusive loyalty <br />
            rewards with our trusted banking partners.
          </p>
          <button className="bg-gradient-to-r from-[#2f80ed] via-[#2d9ee0] to-[#2b5790] text-white mt-8 px-6 py-3 rounded-2xl shadow-lg transition duration-300 transform hover:shadow-[rgba(47,128,237,0.8)] hover:scale-105 hover:brightness-125">
            Get Started Today
          </button>
        </div>
        <div className="w-full flex items-center justify-center ">
          <Image
            width={1000}
            height={1000}
            src="/tron.png"
            alt="XFY Tokenization Engine"
            className=" w-full h-full pr-10 md:pr-0 opacity-border" /* Ajusta el tamaño de la imagen */
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto py-12 md:py-24 lg:py-32 px-6 md:px-12">
        <div className="flex flex-col justify-center items-start text-white mb-12 font-sans">
          <h1 className="text-4xl md:text-5xl font-bold">
            Secure and Scalable Tokenization{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2f80ed] via-[#0b91de] to-[#0e56b5]">
              with Regulatory Compliance
            </span>
          </h1>
          <p className="text-base md:text-lg max-w-3xl text-left mt-4 md:mt-6">
            Our scalable platform is designed to handle high-volume
            transactions, offering security and reliability as your business
            grows
          </p>
        </div>
        <div className="grid gap-6 md:gap-8 px-4 md:px-0 lg:grid-cols-3 text-white">
          {/* Feature 1 */}
          <div className="space-y-4 rounded-lg bg-[#0B1853] shadow-md p-3">
            <LockOpen1Icon className="h-8 w-8 text-[#2d9ee0]" />
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#94c3ff] via-[#2d9ee0] to-[#5e9ae8]">
              Secure Tokenization
            </h3>
            <p className="text-base">
              XFY provides a secure and compliant infrastructure for tokenizing
              your assets.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="space-y-4 rounded-lg bg-[#0B1853] shadow-md p-3">
            <ArrowRightIcon className="h-8 w-8 text-[#2d9ee0]" />
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#94c3ff] via-[#2d9ee0] to-[#5e9ae8]">
              Scalable Platform
            </h3>
            <p className="text-base">
              Our platform is designed to handle high-volume transactions and
              scale with your business.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="space-y-4 rounded-lg bg-[#0B1853] shadow-md p-3">
            <ArrowRightIcon className="h-8 w-8 text-[#2d9ee0]" />
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#94c3ff] via-[#2d9ee0] to-[#5e9ae8]">
              Regulatory Compliance
            </h3>
            <p className="text-base">
              XFY ensures your tokenization activities are compliant with
              relevant regulations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
