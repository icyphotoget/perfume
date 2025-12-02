"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const baseVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 }
};

type RecommendedItem = {
  id: string;
  name: string;
  house: string;
  description: string;
  score: number; // 0–1
  vibeTags: string[];
  vibeSentence: string;
  wearingScenario: string;
};

type Props = {
  items: RecommendedItem[];
};

export default function ResultsPageClient({ items }: Props) {
  const primary = items[0];

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://perfume.example.com/results";

  const encodedShareUrl = encodeURIComponent(shareUrl);
  const shareText = encodeURIComponent(
    "My AI scent persona & niche perfume matches from Parfemi."
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Top nav */}
      <header className="flex items-center justify-between mb-6 md:mb-8">
        <Link
          href="/quiz"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-amberLux"
        >
          ← Adjust answers
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase text-slate-400">
          <Link href="/" className="hover:text-amberLux transition">
            Discover
          </Link>
          <Link href="/quiz" className="hover:text-amberLux transition">
            AI Scent Stylist
          </Link>
          {/* Cart → Log in */}
          <Link href="/login" className="hover:text-amberLux transition">
            Log in
          </Link>
        </nav>
      </header>

      <motion.main
        variants={baseVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-8 md:space-y-10"
      >
        {/* ...ostatak tvog koda ostaje ISTI... */}
        {/* (ništa drugo ne moraš dirati) */}
      </motion.main>
    </div>
  );
}
