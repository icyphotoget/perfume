"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { vibes } from "@/lib/data";

const baseVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 }
};

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Top Nav */}
      <header className="flex items-center justify-between mb-6 md:mb-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amberLux to-softGold shadow-lux-soft" />
          <span className="text-sm tracking-[0.25em] uppercase text-slate-300">
            Parfemi
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase text-slate-400">
          <Link
            href="/"
            className="hover:text-amberLux transition text-amberLux"
          >
            Discover
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
        key="home"
        variants={baseVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-8 md:space-y-10"
      >
        {/* Hero */}
        <section className="grid md:grid-cols-[3fr,2fr] gap-6 items-stretch">
          <div className="space-y-4 md:space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Niche perfume discovery
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-50">
              Find the{" "}
              <span className="bg-gradient-to-r from-amberLux to-softGold bg-clip-text text-transparent">
                perfume that feels like your vibe
              </span>
              , not your notes list.
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl">
              A dark, editorial discovery platform for niche fragrances where AI
              reads your lifestyle, mood and aesthetics — then translates them
              into scents.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-3xl px-5 py-3 text-sm font-medium bg-gradient-to-r from-amberLux to-softGold text-ink shadow-lux-soft hover:opacity-95 transition"
              >
                Start AI Scent Stylist
              </Link>
              <a
                href="#vibe-grid"
                className="inline-flex items-center justify-center rounded-3xl px-5 py-3 text-sm border border-slate-700/80 text-slate-200 hover:border-amberLux/70 hover:text-amberLux transition bg-fog/40 backdrop-blur-xs"
              >
                Browse by Vibe
              </a>
            </div>
          </div>
          {/* Hero visual */}
          <motion.div
            className="relative rounded-3xl bg-gradient-to-br from-fog via-slate-900 to-black shadow-lux-soft overflow-hidden flex items-end justify-between p-4 md:p-6"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.08),_transparent_60%)] pointer-events-none" />
            <div className="space-y-2 z-10 max-w-[60%]">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                Discovery Box of the Month
              </p>
              <h2 className="text-lg md:text-xl font-medium text-slate-50">
                Dark Academia Evening Study
              </h2>
              <p className="text-xs text-slate-400">
                5 sample vials that smell like ink, mahogany shelves and 2AM
                philosophy debates.
              </p>
              <button className="mt-2 inline-flex text-xs text-amberLux hover:text-softGold transition">
                View Discovery Box →
              </button>
            </div>
            <div className="relative h-36 w-24 md:h-44 md:w-28 rounded-2xl bg-gradient-to-b from-slate-200 to-slate-600 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_0%,_rgba(255,255,255,0.8),_transparent_55%)] mix-blend-screen" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.55rem] text-slate-900 tracking-[0.28em] uppercase">
                Parfemi
              </div>
            </div>
          </motion.div>
        </section>

        {/* Vibes grid */}
        <section id="vibe-grid" className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-2xl font-light tracking-tight text-slate-50">
              Browse by{" "}
              <span className="text-amberLux">vibe, mood, storyline.</span>
            </h2>
            <p className="hidden md:block text-xs text-slate-500">
              No notes, no pyramids — just scenarios and aesthetics.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {vibes.map(vibe => (
              <Link
                key={vibe.slug}
                href={`/vibe/${vibe.slug}`}
                className="relative group rounded-3xl overflow-hidden bg-fog/70 border border-slate-800/80 p-3 md:p-4 flex flex-col justify-between shadow-lux-soft/40 hover:border-amberLux/60 hover:shadow-lux-soft transition"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${vibe.accent} opacity-0 group-hover:opacity-40 transition`}
                />
                <div className="relative z-10 space-y-1 text-left">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
                    Vibe
                  </p>
                  <h3 className="text-sm md:text-base font-medium text-slate-50">
                    {vibe.name}
                  </h3>
                  <p className="hidden md:block text-[0.7rem] text-slate-400">
                    {vibe.tagline}
                  </p>
                </div>
                <div className="relative z-10 mt-4 flex items-center justify-between text-[0.65rem] text-slate-400">
                  <span>View curation</span>
                  <span className="text-amberLux group-hover:translate-x-0.5 transition">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </motion.main>
    </div>
  );
}
