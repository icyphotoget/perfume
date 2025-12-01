"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sectionVariants = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 }
};

const aesthetics = [
  {
    id: "dark-academia",
    title: "Dark Academia",
    subtitle: "Ink stains, mahogany shelves, late-night libraries.",
    description:
      "Think wool blazers, candlelit study, rain on old stone and the soft smell of paper and smoke. Perfumes here lean leathery, inky, woody and quietly gothic.",
    // kasnije zamijeni sa pravim image URL-om
    bg: "from-slate-900 via-black to-slate-800"
  },
  {
    id: "old-money-weekend",
    title: "Old Money Weekend",
    subtitle: "Camel coats, heirloom cashmere, countryside estates.",
    description:
      "Soft suede, polished wood, clean linen and discreet florals. This aesthetic feels like generational wealth without the logo overload.",
    bg: "from-amber-200/10 via-slate-900 to-black"
  },
  {
    id: "minimal-future",
    title: "Minimal Future",
    subtitle: "Cold glass, skin scents, soft techno and gallery lighting.",
    description:
      "Sheer musks, iso-e, metallic florals and barely-there woods. Clean but not boring – like good architecture on skin.",
    bg: "from-slate-100/10 via-slate-800 to-black"
  }
];

export default function AestheticPage() {
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
            <Link href="/" className="hover:text-amberLux transition">
              Home
            </Link>
            <Link href="/seasonal" className="hover:text-amberLux transition">
              Seasonal
            </Link>
            <Link href="/feels" className="hover:text-amberLux transition">
              Feels / Mood
            </Link>
            <Link href="/quiz" className="hover:text-amberLux transition">
              AI Stylist
            </Link>
          </nav>
        </div>
      </header>

      {/* Scroll-snap container */}
      <div className="h-[calc(100vh-52px)] max-h-[calc(100vh-52px)] overflow-y-scroll snap-y snap-mandatory">
        {aesthetics.map((aesthetic, idx) => (
          <section
            key={aesthetic.id}
            className="snap-start h-screen relative flex items-end md:items-center"
          >
            {/* Background “image” / gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${aesthetic.bg}`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,191,119,0.22),_transparent_60%)] mix-blend-soft-light" />

            {/* Content */}
            <motion.div
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-end md:items-center justify-between gap-6"
            >
              <div className="max-w-xl space-y-4 md:space-y-5">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-300">
                  Aesthetic section #{idx + 1}
                </p>
                <h1 className="text-3xl md:text-5xl font-light leading-tight">
                  {aesthetic.title}
                </h1>
                <p className="text-sm md:text-base text-slate-200">
                  {aesthetic.subtitle}
                </p>
                <p className="text-xs md:text-sm text-slate-300">
                  {aesthetic.description}
                </p>
                <p className="text-[0.7rem] text-slate-400 max-w-md">
                  In the full product, swiping into this aesthetic would reveal
                  a curated list of niche perfumes, editorials and moodboards
                  that live entirely inside this world.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href="/quiz"
                    className="inline-flex items-center justify-center rounded-3xl px-4 py-2.5 text-xs bg-slate-50 text-ink hover:bg-amberLux transition"
                  >
                    Let AI pick for this aesthetic
                  </Link>
                  <span className="text-[0.7rem] text-slate-400">
                    Slide / scroll to see the next aesthetic →
                  </span>
                </div>
              </div>

              {/* Right “image block” */}
              <div className="w-full md:w-80 lg:w-96 h-56 md:h-80 rounded-3xl bg-slate-900/60 border border-slate-700/80 overflow-hidden shadow-lux-soft">
                <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_55%)]" />
              </div>
            </motion.div>

            {/* Scroll hint (bottom) */}
            {idx === 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[0.7rem] text-slate-400 flex flex-col items-center gap-1">
                <span className="animate-pulse">Scroll to explore aesthetics</span>
                <span className="text-xl leading-none">↓</span>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
