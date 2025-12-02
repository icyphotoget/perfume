"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCollections, type LibraryCollection } from "@/lib/library";
import { products } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" }
  }
};

export default function LibraryOverviewPage() {
  const [collections, setCollections] = useState<LibraryCollection[] | null>(
    null
  );

  useEffect(() => {
    // client-side only
    const cols = getCollections();
    setCollections(cols);
  }, []);

  const hasCollections = (collections?.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-black text-slate-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              My fragrance library
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-light text-slate-50">
              Boards & saved perfumes
            </h1>
          </div>
          <Link
            href="/"
            className="text-[0.7rem] md:text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-amberLux transition"
          >
            ← Back to discovery
          </Link>
        </header>

        {/* Body */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Loading state */}
          {collections === null && (
            <div className="text-[0.8rem] text-slate-400">
              Loading your library…
            </div>
          )}

          {/* Empty state */}
          {collections !== null && !hasCollections && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 px-5 py-6 md:px-7 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm md:text-base text-slate-50">
                  Your library is still empty.
                </p>
                <p className="text-[0.8rem] text-slate-400 max-w-md">
                  Browse perfumes, open a product page and tap{" "}
                  <span className="text-amberLux">“Save to Library”</span> to
                  start building your own Pinterest-style boards.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-3xl bg-gradient-to-r from-amberLux to-softGold text-ink text-xs md:text-sm shadow-lux-soft hover:opacity-95 transition"
              >
                Discover perfumes →
              </Link>
            </div>
          )}

          {/* Collections grid */}
          {collections !== null && hasCollections && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {collections.map(collection => {
                const perfumesInCol = collection.perfumeIds
                  .map(id => products.find(p => p.id === id))
                  .filter(Boolean);

                const count = perfumesInCol.length;
                const subtitle =
                  count === 0
                    ? "Empty board"
                    : count === 1
                    ? "1 perfume"
                    : `${count} perfumes`;

                const previewNames = perfumesInCol
                  .slice(0, 3)
                  .map(p => p!.name)
                  .join(" · ");

                return (
                  <Link
                    key={collection.id}
                    href={`/profile/library/${collection.id}`}
                    className="group rounded-[1.75rem] border border-slate-800 bg-slate-950/80 overflow-hidden flex flex-col shadow-[0_24px_80px_rgba(0,0,0,0.9)] hover:border-amberLux/70 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,0.95)] transition-transform duration-200"
                  >
                    {/* pseudo cover */}
                    <div className="relative h-32 md:h-36 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
                      <div className="absolute inset-2 grid grid-cols-3 gap-1 opacity-80">
                        {perfumesInCol.slice(0, 3).map(p => (
                          <div
                            key={p!.id}
                            className="rounded-xl bg-slate-900/70 border border-slate-700/80 flex items-center justify-center px-2"
                          >
                            <span className="text-[0.6rem] text-slate-200 text-center line-clamp-2">
                              {p!.name}
                            </span>
                          </div>
                        ))}
                        {count > 3 && (
                          <div className="rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-center">
                            <span className="text-[0.6rem] text-slate-400">
                              +{count - 3} more
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* text content */}
                    <div className="px-4 py-3 md:px-5 md:py-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[0.75rem] uppercase tracking-[0.25em] text-slate-500">
                          Collection
                        </p>
                        <h2 className="mt-1 text-sm md:text-base font-light text-slate-50 line-clamp-2">
                          {collection.name}
                        </h2>
                        <p className="mt-1 text-[0.7rem] text-slate-400">
                          {subtitle}
                        </p>
                      </div>
                      {previewNames && (
                        <p className="mt-2 text-[0.7rem] text-slate-500 line-clamp-2">
                          {previewNames}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </motion.main>
      </div>
    </div>
  );
}
