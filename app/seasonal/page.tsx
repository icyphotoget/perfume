"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sectionVariants = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 }
};

const seasons = [
  {
    id: "spring",
    title: "Spring Bloom",
    subtitle: "Fresh florals, soft greens, rainy sidewalks.",
    copy: "Light musks, dewy roses and tender greens that feel like opening windows after winter. Easy to overspray, easy to love.",
    bg: "from-emerald-200/20 via-slate-900 to-black"
  },
  {
    id: "summer",
    title: "Summer Heat",
    subtitle: "Solar skin, salt, citrus, sweaty nightlife.",
    copy: "Salty skin, sun lotion, late-night air and overripe fruits. The kind of scents that smell better the more you dance.",
    bg: "from-orange-200/20 via-slate-900 to-black"
  },
  {
    id: "autumn",
    title: "Autumn Smoke",
    subtitle: "Spice, woods, leather, golden-hour melancholy.",
    copy: "Cardamom, tobacco, boozy vanilla and quiet campfire trail. Feels like knitwear, low sun and nostalgia.",
    bg: "from-amber-200/20 via-slate-900 to-black"
  },
  {
    id: "winter",
    title: "Winter Velvet",
    subtitle: "Resins, incense, cashmere and candlelight.",
    copy: "Balsamic resins, incense, labdanum and cozy gourmands that turn your scarf into a portable fireplace.",
    bg: "from-slate-200/20 via-slate-900 to-black"
  }
];

export default function SeasonalPage() {
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
            <Link
              href="/seasonal"
              className="hover:text-amberLux transition text-amberLux"
            >
              Seasonal
            </Link>
            <Link href="/feels" className="hover:text-amberLux transition">
              Feels / Mood
            </Link>
          </nav>
        </div>
      </header>

      {/* Scroll-snap container */}
      <div className="h-[calc(100vh-52px)] max-h-[calc(100vh-52px)] overflow-y-scroll snap-y snap-mandatory">
        {seasons.map((season, idx) => (
          <section
            key={season.id}
            className="snap-start h-screen relative flex items-end md:items-center"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${season.bg}`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)] mix-blend-soft-light" />

            <motion.div
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-end md:items-center justify-between gap-6"
            >
              <div className="max-w-xl space-y-4 md:space-y-5">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-200">
                  Seasonal vibe #{idx + 1}
                </p>
                <h1 className="text-3xl md:text-5xl font-light leading-tight">
                  {season.title}
                </h1>
                <p className="text-sm md:text-base text-slate-100">
                  {season.subtitle}
                </p>
                <p className="text-xs md:text-sm text-slate-200">
                  {season.copy}
                </p>
                <p className="text-[0.7rem] text-slate-300 max-w-md">
                  Later, this slide becomes a filter: tap Spring Bloom and see
                  only perfumes that really shine in that part of the year.
                </p>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-3xl px-4 py-2.5 text-xs bg-slate-50 text-ink hover:bg-amberLux transition"
                >
                  Ask AI for {season.title.toLowerCase()} picks
                </Link>
              </div>

              <div className="w-full md:w-80 lg:w-96 h-56 md:h-80 rounded-3xl bg-slate-950/60 border border-slate-700/80 overflow-hidden shadow-lux-soft">
                <div className="h-full w-full bg-[radial-gradient(circle_at_bottom,_rgba(0,0,0,0.65),_transparent_60%)]" />
              </div>
            </motion.div>

            {idx === 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[0.7rem] text-slate-300 flex flex-col items-center gap-1">
                <span className="animate-pulse">Scroll through the seasons</span>
                <span className="text-xl leading-none">↓</span>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
