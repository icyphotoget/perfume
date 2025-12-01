"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { vibes, products } from "@/lib/data";

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 }
};

const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};

const tabs = [
  { id: "aesthetic", label: "Aesthetic sections" },
  { id: "seasonal", label: "Seasonal vibes" },
  { id: "feels", label: "In my feels / mood" }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"aesthetic" | "seasonal" | "feels">(
    "aesthetic"
  );

  const featured = products[0];
  const newIn = products.slice(1); // mock "new in"

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-6 md:mb-8">
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

      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-8 md:space-y-10"
      >
        {/* HERO / HEADER TEXT */}
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
            Switch between aesthetics, seasonal moods and pure “in my feels”
            vibes. Underneath, your AI segment, featured fragrance of the week,
            new arrivals and slow-perfume editorial content.
          </p>
        </section>

        {/* TABS */}
        <section className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as "aesthetic" | "seasonal" | "feels")
                }
                className={`relative text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-3xl border transition ${
                  activeTab === tab.id
                    ? "border-amberLux text-amberLux bg-fog/70"
                    : "border-slate-700 text-slate-400 hover:border-amberLux/60 hover:text-amberLux"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="mt-2">
            <AnimatePresence mode="wait">
              {activeTab === "aesthetic" && (
                <motion.div
                  key="aesthetic"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {/* Aesthetic sections – each different layout */}
                  <AestheticCard
                    title="Dark Academia"
                    subtitle="Ink, mahogany shelves, late-night study sessions."
                    badge="Aesthetic section"
                  />
                  <AestheticCard
                    title="Old Money Weekend"
                    subtitle="Camel coats, heirloom cashmere and quiet countryside estates."
                    badge="Aesthetic section"
                  />
                  <AestheticCard
                    title="Minimal Future"
                    subtitle="Cold glass, skin scents, soft techno and gallery lighting."
                    badge="Aesthetic section"
                  />
                </motion.div>
              )}

              {activeTab === "seasonal" && (
                <motion.div
                  key="seasonal"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="grid md:grid-cols-4 gap-3 md:gap-4"
                >
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
                </motion.div>
              )}

              {activeTab === "feels" && (
                <motion.div
                  key="feels"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* AI SEGMENT */}
        <section className="grid md:grid-cols-[3fr,2.2fr] gap-5 items-start">
          <motion.div className="space-y-3">
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
                      {/* rating UI – non-functional for now */}
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
          </motion.div>

          {/* SIDE SUMMARY CARD */}
          <motion.div
            className="relative rounded-3xl bg-gradient-to-br from-fog via-slate-900 to-black p-4 md:p-6 shadow-lux-soft overflow-hidden"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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
          </motion.div>
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

          {/* Featured reviews – like newspaper quotes */}
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

/* --- small helper components --- */

function AestheticCard({
  title,
  subtitle,
  badge
}: {
  title: string;
  subtitle: string;
  badge: string;
}) {
  return (
    <div className="rounded-3xl bg-fog/80 border border-slate-800 p-4 flex flex-col justify-between shadow-lux-soft/40">
      <div className="space-y-2">
        <span className="inline-flex px-2 py-1 rounded-full bg-slate-950/70 border border-slate-700 text-[0.6rem] uppercase tracking-[0.2em] text-slate-400">
          {badge}
        </span>
        <h3 className="text-sm md:text-base text-slate-50">{title}</h3>
        <p className="text-xs md:text-sm text-slate-400">{subtitle}</p>
      </div>
      <p className="mt-3 text-[0.7rem] text-slate-500">
        In production this becomes a dedicated landing page with its own
        curated perfumes, imagery and micro-editorial.
      </p>
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
        Later: filter view showing scents that fit this season.
      </p>
    </div>
  );
}
