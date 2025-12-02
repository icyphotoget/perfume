// components/product-page-client.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data";
import SaveToLibraryButton from "@/components/library/SaveToLibraryButton";

const baseVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 }
};

type Props = {
  product: Product;
};

export default function ProductPageClient({ product }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      <header className="flex items-center justify-between mb-6 md:mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-amberLux"
        >
          ← Back to discover
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase text-slate-400">
          <Link href="/" className="hover:text-amberLux transition">
            Discover
          </Link>
          <Link href="/quiz" className="hover:text-amberLux transition">
            AI Scent Stylist
          </Link>
          {/* Cart → Log in */}
          <Link href="/login" className="hover:text-amberLux transition">
            Log in
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
        <section className="grid md:grid-cols-[2.1fr,2fr] gap-6 items-start">
          {/* Visuals */}
          <div className="space-y-4">
            {/* PRAVA SLIKA IZ SUPABASEA */}
            {product.imageUrl && (
              <div className="relative rounded-3xl overflow-hidden h-72 md:h-96 shadow-lux-soft">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
            )}

            {/* Ako nema slike, pokaži stiliziranu “fake bocu” */}
            {!product.imageUrl && (
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-200/10 via-slate-50/5 to-amberLux/15 h-72 md:h-96 shadow-lux-soft overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_55%)] mix-blend-screen" />
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <div className="h-48 w-24 md:h-64 md:w-28 rounded-3xl bg-gradient-to-b from-slate-100 to-slate-500 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative">
                    <div className="absolute inset-x-4 top-6 h-6 rounded-full bg-amberLux/20 blur-md" />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.55rem] tracking-[0.3em] uppercase text-slate-900 text-center px-1">
                      {product.name}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <div className="flex-1 h-16 rounded-2xl bg-fog/80 border border-slate-800 text-[0.7rem] text-slate-400 flex items-center justify-center">
                TikTok-style review clip 01
              </div>
              <div className="flex-1 h-16 rounded-2xl bg-fog/80 border border-slate-800 text-[0.7rem] text-slate-400 flex items-center justify-center">
                TikTok-style review clip 02
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 md:space-y-5">
            <div className="space-y-1">
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">
                {product.house}
              </p>
              <h1 className="text-2xl md:text-3xl font-light text-slate-50">
                {product.name}
              </h1>
              <p className="text-xs text-slate-400">
                {product.vibeTags.join(" • ")}
              </p>
            </div>

            <p className="text-sm md:text-base text-slate-300">
              {product.description}
            </p>

            {/* Vibe tags */}
            <div className="flex flex-wrap gap-2">
              {product.vibeTags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-fog/80 border border-slate-700 text-xs text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Performance pseudo-graph */}
            <div className="space-y-2">
              <p className="text-xs text-slate-400 uppercase tracking-[0.18em]">
                Performance
              </p>
              <div className="space-y-1 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-20">Longevity</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amberLux to-softGold"
                      style={{ width: `${product.longevity * 10}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-20">Sillage</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amberLux to-softGold/70"
                      style={{ width: `${product.sillage * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Decant selector + Save to Library */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Choose your decant
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { size: "2ml", price: 9 },
                  { size: "5ml", price: 19 },
                  { size: "10ml", price: product.basePrice }
                ].map(option => (
                  <button
                    key={option.size}
                    className="rounded-2xl border border-slate-700 bg-fog/70 px-3 py-3 text-center text-xs text-slate-200 hover:border-amberLux hover:text-amberLux transition"
                  >
                    <div className="font-medium text-slate-50">
                      {option.size}
                    </div>
                    <div className="text-[0.7rem] text-slate-400">
                      €{option.price}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[0.7rem] text-slate-500">
                In the real build, selecting a size would add this decant to
                your cart and take you to checkout.
              </p>

              <div className="pt-2">
                <SaveToLibraryButton
                  perfumeId={product.id}
                  perfumeName={product.name}
                />
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
