/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import NavbarV0 from "@/components/navbar";
import { FooterV0 } from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XFY D-Money",
  description: "The platform for financial markets and digital asset ownership",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="icon" href="/solo-logo.jpg" type="image/png" sizes="any" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <NextTopLoader />
        <NavbarV0 />
        <main className="flex-grow">{children}</main>
        <FooterV0 />
      </body>
    </html>
  );
}
