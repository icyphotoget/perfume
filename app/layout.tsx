// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SmartHeader from "@/components/SmartHeader";

export const metadata: Metadata = {
  title: "Parfemi — Niche Perfume Discovery",
  description:
    "Discover niche perfumes through aesthetics, seasons & feelings with AI-powered recommendations."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ink text-slate-50">
        {/* Global header (klijentska komponenta, sama rješava auth) */}
        <SmartHeader />
        {/* Mali padding da sadržaj ne ide ispod headera */}
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
