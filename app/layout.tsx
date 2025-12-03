// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SmartHeader from "@/components/SmartHeader";
import { EB_Garamond, Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Parfemi — Niche Perfume Discovery",
  description:
    "Discover niche perfumes through aesthetics, seasons & feelings with AI-powered recommendations."
};

// Load fonts
const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${garamond.variable} ${inter.variable}`}>
      <body className="bg-ink text-slate-50 font-body">
        {/* Global header (klijentska komponenta, sama rješava auth) */}
        <SmartHeader />
        {/* Mali padding da sadržaj ne ide ispod headera */}
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
