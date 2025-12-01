"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/data";

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 }
};

export default function HomePage() {
  const featured = products[0];
  const newIn = products.slice(1); // mock "new in"

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-4 md:mb-6">
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

      {/* THREE MAIN BUTTONS UNDER NAVBAR */}
      <section className="mb-6 md:mb-8">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/aesthetic"
            className="text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-3xl border border-slate-700 text-slate-300 hover:border-amberLux hover:text-amberLux bg-fog/60 transition"
          >
            Aesthetic sections
          </Link>
          <Link
            href="/seasonal"
            className="text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-3xl border border-slate-700 text-slate-300 hover:border-amberLux hover:text-amberLux bg-fog/60 transition"
          >
            Seasonal vibes
          </Link>
          <Link
            href="/feels"
            className="text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-3xl border border-slate-700 text-slate-300 hover:border-amberLux hover:text-amberLux bg-fog/60 transition"
          >
            In my feels / mood
          </Link>
        </div>
      </section>

      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-8 md:space-y-10"
      >
        {/* FRONT PAGE TEXT (hero) */}
        <section className="space-y-4 md:space-y-5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Front page
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-slate-50">
            Your niche perfume front page – curated by{" "}
            <span className="bg-gradient-to-r from-amberLux to-softGold bg-clip-text text-transparent">
              aesthetics, seasons and feelings.
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl">
            Use the buttons above to deep-dive into aesthetic sections, seasonal
            vibes or pure “in my feels” moods. Below, your AI segment, featured
            fragrance of the week, new arrivals and editorial content.
          </p>
        </section>

        {/* AI SEGMENT */}
        <section className="grid md:grid-cols-[3fr,2.2fr] gap-5 items-start">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              AI segment
            </p>
            <h2 className="text-lg md:text-xl font-light text-slate-50">
              Your AI Scent Stylist — plus feedback loop.
            </h2>
            <p className="text-sm md:text-base text-slate-300">
              The AI reads your lifestyle, music, outfits and moods, then
              suggests 3–5 niche perfumes. You can rate each recommendation so
              the system learns what “hit” or “miss” really means for you.
            </p>
            <div className="rounded-3xl bg-fog/80 border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Last recommendation session
                </span>
                <span className="text-[0.7rem] text-amberLux">
                  Mock UI — rating only
                </span>
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map(idx => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 bg-slate-950/60 border border-slate-800 rounded-2xl px-3 py-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-300">
                        Recommendation #{idx}
                      </span>
                      <span className="text-[0.7rem] text-slate-500">
                        Example perfume name
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-amberLux text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-amberLux/60 text-[0.65rem]"
                        >
                          {i + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[0.7rem] text-slate-500">
                In production, tapping a rating would send feedback to the AI
                engine and refine future matches for you and similar users.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-3xl px-4 py-2.5 text-xs bg-gradient-to-r from-amberLux to-softGold text-ink shadow-lux-soft hover:opacity-95 transition"
              >
                Start / redo AI recommendations
              </Link>
            </div>
          </div>

          <div
            className="relative rounded-3xl bg-gradient-to-br from-fog via-slate-900 to-black p-4 md:p-6 shadow-lux-soft overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,191,119,0.24),_transparent_60%)] opacity-80" />
            <div className="relative space-y-3">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
                Why rating matters
              </p>
              <p className="text-xs text-slate-200">
                Every rating becomes an anonymous datapoint that teaches the AI
                how real humans use perfume: which vibes overperform, which
                notes flop, and how lifestyle changes affect taste over time.
              </p>
              <p className="text-xs text-slate-400">
                Think of it as slowly training a fragrance sommelier that
                actually remembers how you felt last winter.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURED PERFUME + NEW IN + EDITORIAL */}
        <section className="space-y-6 md:space-y-8">
          {/* Featured perfume of the week/day */}
          <div className="space-y-3">
            <h2 className="text-sm md:text-base uppercase tracking-[0.22em] text-slate-400">
              Featured perfume of the week
            </h2>
            {featured && (
              <div className="grid md:grid-cols-[2.3fr,2fr] gap-5 items-start rounded-3xl bg-fog/80 border border-slate-800 p-4 md:p-6 shadow-lux-soft">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    {featured.house}
                  </p>
                  <h3 className="text-lg md:text-xl text-slate-50">
                    {featured.name}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {featured.description}
                  </p>
                  <p className="text-xs text-slate-400">
                    Tagged as: {featured.vibeTags.join(" • ")}
                  </p>
                  <Link
                    href={`/product/${featured.id}`}
                    className="inline-flex items-center justify-center rounded-3xl px-4 py-2.5 text-xs bg-gradient-to-r from-amberLux to-softGold text-ink shadow-lux-soft hover:opacity-95 transition"
                  >
                    Explore this week&apos;s feature →
                  </Link>
                </div>
                <div className="relative h-40 md:h-56 rounded-3xl bg-gradient-to-br from-slate-200/10 via-slate-50/5 to-amberLux/20 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_55%)] mix-blend-screen" />
                  <div className="absolute inset-0 flex items-end justify-center pb-6">
                    <div className="h-40 w-20 md:h-48 md:w-24 rounded-3xl bg-gradient-to-b from-slate-100 to-slate-500 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* New in */}
          <div className="space-y-3">
            <h2 className="text-sm md:text-base uppercase tracking-[0.22em] text-slate-400">
              New in
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {newIn.map(p => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="min-w-[220px] max-w-[260px] rounded-3xl bg-slate-950/70 border border-slate-800 p-3 flex flex-col justify-between hover:border-amberLux/70 hover:shadow-lux-soft transition"
                >
                  <div className="space-y-2">
                    <div className="h-24 rounded-2xl bg-gradient-to-br from-slate-300/10 via-slate-50/10 to-amberLux/20 mb-1" />
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500">
                      {p.house}
                    </p>
                    <p className="text-sm text-slate-50">{p.name}</p>
                    <p className="text-[0.7rem] text-slate-400 line-clamp-3">
                      {p.description}
                    </p>
                  </div>
                  <span className="mt-2 text-[0.7rem] text-amberLux">
                    View details →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Deep dive of the week */}
          <div className="space-y-3">
            <h2 className="text-sm md:text-base uppercase tracking-[0.22em] text-slate-400">
              Deep dive of the week
            </h2>
            <div className="rounded-3xl bg-slate-950/70 border border-slate-800 p-4 md:p-6 space-y-2">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Short post / educational
              </p>
              <h3 className="text-lg md:text-xl text-slate-50">
                What does “dark gourmand” actually mean?
              </h3>
              <p className="text-sm md:text-base text-slate-300">
                A quick, digestible explainer on one fragrance idea per week:
                reimagined categories, misunderstood notes, perfumers we love,
                and short nerdy dives that stay snackable.
              </p>
              <p className="text-xs text-slate-500">
                In production, this would link to your blog / editorial
                platform.
              </p>
            </div>
          </div>

          {/* Featured reviews */}
          <div className="space-y-3">
            <h2 className="text-sm md:text-base uppercase tracking-[0.22em] text-slate-400">
              Featured reviews
            </h2>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                {
                  source: "User review",
                  text: `"Feels like reading poetry in an empty bar at 1AM."`
                },
                {
                  source: "TikTok comment",
                  text: `"I smell like main character with a side quest."`
                },
                {
                  source: "Newsletter blurb",
                  text: `"A niche discovery experience that finally speaks in vibes, not pyramids."`
                }
              ].map((quote, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-slate-950/70 border border-slate-800 p-3 md:p-4 text-sm text-slate-300"
                >
                  <p className="italic mb-2">{quote.text}</p>
                  <p className="text-[0.7rem] text-slate-500 uppercase tracking-[0.18em]">
                    {quote.source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
