"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const baseVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 }
};

export default function SeasonalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      <header className="flex items-center justify-between mb-6 md:mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-amberLux"
        >
          ← Back to home
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase text-slate-400">
          <Link href="/" className="hover:text-amberLux transition">
            Home
          </Link>
          <Link href="/quiz" className="hover:text-amberLux transition">
            AI Scent Stylist
          </Link>
          <Link href="/checkout" className="hover:text-amberLux transition">
            Cart
          </Link>
        </nav>
      </header>

      <motion.main
        variants={baseVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-6 md:space-y-8"
      >
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Tab 2
          </p>
          <h1 className="text-2xl md:text-4xl font-light text-slate-50">
            Seasonal vibes
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl">
            Quick seasonal moodboards. Each block later links to a filtered view
            of perfumes that feel right for that moment of the year.
          </p>
        </section>

        <section className="grid md:grid-cols-4 gap-3 md:gap-4">
          <SeasonCard
            season="Spring Bloom"
            note="Fresh florals, soft greens, rainy sidewalks."
          />
          <SeasonCard
            season="Summer Heat"
            note="Solar skin, salt, citrus, sweaty nightlife."
          />
          <SeasonCard
            season="Autumn Smoke"
            note="Spice, woods, leather, golden-hour melancholy."
          />
          <SeasonCard
            season="Winter Velvet"
            note="Resins, incense, cashmere and candlelight."
          />
        </section>
      </motion.main>
    </div>
  );
}

function SeasonCard({ season, note }: { season: string; note: string }) {
  return (
    <div className="rounded-3xl bg-slate-950/70 border border-slate-800 p-3 flex flex-col justify-between shadow-lux-soft/30">
      <div className="space-y-1">
        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500">
          {season}
        </p>
        <p className="text-xs text-slate-300">{note}</p>
      </div>
      <p className="mt-2 text-[0.7rem] text-slate-500">
        In the full product: click to see all scents that behave well in this
        season.
      </p>
    </div>
  );
}
