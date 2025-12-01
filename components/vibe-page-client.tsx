"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product, Vibe } from "@/lib/data";

const baseVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 }
};

type Props = {
  vibe: Vibe;
  products: Product[];
};

export default function VibePageClient({ vibe, products }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      <header className="flex items-center justify-between mb-6 md:mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-amberLux"
        >
          ← Back to all vibes
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase text-slate-400">
          <Link href="/" className="hover:text-amberLux transition">
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
        variants={baseVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-6 md:space-y-8"
      >
        <section className="grid md:grid-cols-[2.2fr,2fr] gap-5 items-start">
          <div className="space-y-4 md:space-y-5">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">
              Vibe curation
            </p>
            <h1 className="text-2xl md:text-4xl font-light text-slate-50">
              {vibe.name}
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl">
              {vibe.tagline} This curation is built for people who choose scent
              the way they choose outfits, playlists and timelines — emotionally
              first, logically later.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-fog/80 border border-slate-700 text-xs text-slate-300">
                Curated selection
              </span>
              <span className="px-3 py-1 rounded-full bg-fog/80 border border-slate-700 text-xs text-slate-300">
                Decant friendly
              </span>
              <span className="px-3 py-1 rounded-full bg-fog/80 border border-slate-700 text-xs text-slate-300">
                AI-enhanced picks
              </span>
            </div>
          </div>

          <motion.div
            className="relative rounded-3xl bg-gradient-to-br from-fog via-slate-900 to-black p-4 md:p-6 shadow-lux-soft overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,191,119,0.25),_transparent_58%)] opacity-80" />
            <div className="relative space-y-3">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
                Vibe Moodboard
              </p>
              <p className="text-xs text-slate-200">
                Think editorial collages: lifestyle shots, interiors, fabrics
                and tiny details that visually translate{" "}
                <span className="text-amberLux">{vibe.name}</span>. In
                production, this block becomes a swipeable, full-bleed
                moodboard.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm uppercase tracking-[0.22em] text-slate-400">
            Fragrances in this vibe
          </h2>
          {products.length === 0 ? (
            <p className="text-sm text-slate-500">
              No products linked to this vibe yet. In production, this will show
              AI-curated and manually curated picks.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {products.map(product => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="rounded-3xl bg-fog/80 border border-slate-800 p-4 flex flex-col justify-between shadow-lux-soft/40 hover:border-amberLux/70 hover:shadow-lux-soft transition"
                >
                  <div className="space-y-2">
                    <div className="h-32 rounded-2xl bg-gradient-to-br from-slate-300/10 via-slate-50/10 to-amberLux/20 shadow-inner mb-3" />
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500">
                      {product.house}
                    </p>
                    <h3 className="text-sm md:text-base text-slate-50">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-amberLux hover:text-softGold transition">
                      View details →
                    </span>
                    <span className="text-[0.7rem] text-slate-400">
                      From €9 (2ml decant)
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </motion.main>
    </div>
  );
}
