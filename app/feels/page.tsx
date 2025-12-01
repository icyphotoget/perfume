"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { vibes } from "@/lib/data";

const sectionVariants = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 }
};

export default function FeelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ink via-charcoal to-ink text-slate-50">
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-ink/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-amberLux"
          >
            ← Home
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase text-slate-400">
            <Link href="/aesthetic" className="hover:text-amberLux transition">
              Aesthetic
            </Link>
            <Link href="/seasonal" className="hover:text-amberLux transition">
              Seasonal
            </Link>
            <Link
              href="/feels"
              className="hover:text-amberLux transition text-amberLux"
            >
              Feels / Mood
            </Link>
          </nav>
        </div>
      </header>

      {/* Scroll-snap container */}
      <div className="h-[calc(100vh-52px)] max-h-[calc(100vh-52px)] overflow-y-scroll snap-y snap-mandatory">
        {vibes.map((vibe, idx) => (
          <section
            key={vibe.slug}
            className="snap-start h-screen relative flex items-end md:items-center"
          >
            {/* Background gradient per vibe (simple, but looks luxe) */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,191,119,0.2),_transparent_60%)] mix-blend-soft-light" />

            <motion.div
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-end md:items-center justify-between gap-6"
            >
              <div className="max-w-xl space-y-4 md:space-y-5">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-300">
                  Mood {idx + 1} of {vibes.length}
                </p>
                <h1 className="text-3xl md:text-5xl font-light leading-tight">
                  {vibe.name}
                </h1>
                <p className="text-sm md:text-base text-slate-100">
                  {vibe.tagline}
                </p>
                <p className="text-xs md:text-sm text-slate-200 max-w-md">
                  This section is for days when you don&apos;t know the note,
                  you just know the storyline. Pick the mood, let AI handle the
                  rest.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/vibe/${vibe.slug}`}
                    className="inline-flex items-center justify-center rounded-3xl px-4 py-2.5 text-xs bg-slate-50 text-ink hover:bg-amberLux transition"
                  >
                    See perfumes for this mood
                  </Link>
                  <Link
                    href="/quiz"
                    className="inline-flex items-center justify-center rounded-3xl px-4 py-2.5 text-xs border border-slate-700/80 text-slate-200 hover:border-amberLux/70 hover:text-amberLux transition bg-fog/40 backdrop-blur-xs"
                  >
                    Ask AI to match this vibe
                  </Link>
                </div>
              </div>

              <div className="w-full md:w-80 lg:w-96 h-56 md:h-80 rounded-3xl bg-slate-950/70 border border-slate-700/80 overflow-hidden shadow-lux-soft">
                <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.7),_transparent_60%)]" />
              </div>
            </motion.div>

            {idx === 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[0.7rem] text-slate-300 flex flex-col items-center gap-1">
                <span className="animate-pulse">
                  Scroll to move through your moods
                </span>
                <span className="text-xl leading-none">↓</span>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
