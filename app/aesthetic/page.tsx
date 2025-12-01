"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const baseVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 }
};

export default function AestheticPage() {
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
            Tab 1
          </p>
          <h1 className="text-2xl md:text-4xl font-light text-slate-50">
            Aesthetic sections
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl">
            High-level aesthetic worlds that shape how you wear perfume: each
            can later become its own mini-hub with hand-picked scents, imagery
            and editorial.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          <AestheticCard
            title="Dark Academia"
            subtitle="Ink, mahogany shelves, late-night study sessions."
          />
          <AestheticCard
            title="Old Money Weekend"
            subtitle="Camel coats, heirloom cashmere and quiet countryside estates."
          />
          <AestheticCard
            title="Minimal Future"
            subtitle="Cold glass, skin scents, soft techno and gallery lighting."
          />
        </section>
      </motion.main>
    </div>
  );
}

function AestheticCard({
  title,
  subtitle
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl bg-fog/80 border border-slate-800 p-4 flex flex-col justify-between shadow-lux-soft/40">
      <div className="space-y-2">
        <span className="inline-flex px-2 py-1 rounded-full bg-slate-950/70 border border-slate-700 text-[0.6rem] uppercase tracking-[0.2em] text-slate-400">
          Aesthetic section
        </span>
        <h3 className="text-sm md:text-base text-slate-50">{title}</h3>
        <p className="text-xs md:text-sm text-slate-400">{subtitle}</p>
      </div>
      <p className="mt-3 text-[0.7rem] text-slate-500">
        In the full build, this will open a curated collection of perfumes,
        visuals and vibe notes just for this aesthetic.
      </p>
    </div>
  );
}
