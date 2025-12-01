import "./globals.css";
import type { Metadata } from "next";

const siteUrl = "https://perfume.example.com"; // promijeni kasnije

export const metadata: Metadata = {
  title: {
    default: "Parfemi — Niche Perfume Discovery & AI Scent Stylist",
    template: "%s | Parfemi"
  },
  description:
    "A dark, editorial niche perfume discovery platform with decants, discovery boxes and an AI Scent Stylist that matches scents to your vibe.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName: "Parfemi — Niche Perfume Discovery",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourhandle" // promijeni po želji
  }
};

import SmartHeader from "@/components/SmartHeader";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ink text-slate-50">
        <SmartHeader />
        <div className="pt-[70px]"> {/* pushes content down */}
          {children}
        </div>
      </body>
    </html>
  );
}
