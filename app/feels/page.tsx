"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { vibes } from "@/lib/data";

const baseVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 }
};

export default function FeelsPage() {
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
            Tab 3
          </p>
          <h1 className="text-2xl md:text-4xl font-light text-slate-50">
            In my feels / mood
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl">
            Pure mood-based navigation: you don&apos;t have to know notes or
            families. Just pick the storyline that feels like you today.
          </p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {vibes.map(vibe => (
            <Link
              key={vibe.slug}
              href={`/vibe/${vibe.slug}`}
              className="relative group rounded-3xl overflow-hidden bg-fog/70 border border-slate-800/80 p-3 md:p-4 flex flex-col justify-between shadow-lux-soft/40 hover:border-amberLux/60 hover:shadow-lux-soft transition"
            >
              <div className="relative z-10 space-y-1 text-left">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
                  Mood
                </p>
                <h3 className="text-sm md:text-base font-medium text-slate-50">
                  {vibe.name}
                </h3>
                <p className="hidden md:block text-[0.7rem] text-slate-400">
                  {vibe.tagline}
                </p>
              </div>
              <div className="relative z-10 mt-3 flex items-center justify-between text-[0.65rem] text-slate-400">
                <span>See perfumes</span>
                <span className="text-amberLux group-hover:translate-x-0.5 transition">
                  →
                </span>
              </div>
            </Link>
          ))}
        </section>
      </motion.main>
    </div>
  );
}
