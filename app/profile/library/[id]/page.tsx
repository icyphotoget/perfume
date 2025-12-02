"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  type LibraryCollection,
  getCollections,
  removePerfumeFromCollection
} from "@/lib/library";
import { products } from "@/lib/data";

type Props = {
  params: { id: string };
};

const variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function CollectionDetailPage({ params }: Props) {
  const [collection, setCollection] = useState<LibraryCollection | null>(null);
  const [loading, setLoading] = useState(true);

  const collectionId = params.id;

  useEffect(() => {
    const all = getCollections();
    const col = all.find(c => c.id === collectionId) ?? null;
    setCollection(col);
    setLoading(false);
  }, [collectionId]);

  function handleRemove(perfumeId: string) {
    if (!collection) return;
    const updatedAll = removePerfumeFromCollection(collection.id, perfumeId);
    const updated = updatedAll.find(c => c.id === collection.id) ?? null;
    setCollection(updated);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-slate-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-[0.8rem] text-slate-400">Loading collection…</p>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-black text-slate-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 space-y-4">
          <p className="text-sm text-slate-50">
            This collection could not be found.
          </p>
          <Link
            href="/profile/library"
            className="text-[0.8rem] text-amberLux hover:underline"
          >
            ← Back to My Library
          </Link>
        </div>
      </div>
    );
  }

  const perfumes = collection.perfumeIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-black text-slate-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Collection
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-light text-slate-50">
              {collection.name}
            </h1>
            <p className="mt-1 text-[0.8rem] text-slate-400">
              {perfumes.length === 0
                ? "Empty board"
                : perfumes.length === 1
                ? "1 perfume"
                : `${perfumes.length} perfumes`}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Link
              href="/profile/library"
              className="text-[0.7rem] md:text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-amberLux transition"
            >
              ← Back to My Library
            </Link>
            <Link
              href="/"
              className="text-[0.7rem] md:text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-amberLux transition"
            >
              Discover more
            </Link>
          </div>
        </header>

        {/* Content */}
        <motion.main
          variants={variants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {perfumes.length === 0 && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 px-5 py-6 text-[0.8rem] text-slate-400">
              This board is empty. Open a perfume page and use “Save to
              Library” to pin scents into this collection.
            </div>
          )}

          {perfumes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {perfumes.map(p => (
                <div
                  key={p!.id}
                  className="group rounded-2xl border border-slate-800 bg-slate-950/70 overflow-hidden flex flex-col hover:border-amberLux/80 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(0,0,0,0.85)] transition-transform duration-150"
                >
                  {/* “bottle” */}
                  <div className="relative h-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-20 w-10 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-500 shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative">
                        <div className="absolute inset-x-2 top-3 h-3 rounded-full bg-amberLux/30 blur-[2px]" />
                      </div>
                    </div>
                  </div>

                  {/* text */}
                  <div className="px-3 py-3 space-y-1 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                        {p!.house}
                      </p>
                      <p className="text-sm text-slate-50 line-clamp-2">
                        {p!.name}
                      </p>
                      {p!.vibeTags && p!.vibeTags.length > 0 && (
                        <p className="mt-1 text-[0.7rem] text-slate-400 line-clamp-1">
                          {p!.vibeTags.join(" • ")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <Link
                        href={`/product/${p!.id}`}
                        className="text-[0.7rem] text-amberLux hover:underline"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleRemove(p!.id)}
                        className="text-[0.65rem] text-slate-500 hover:text-red-400 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.main>
      </div>
    </div>
  );
}
