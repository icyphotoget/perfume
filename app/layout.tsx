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

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-ink via-charcoal to-ink">
        {children}
      </body>
    </html>
  );
}
