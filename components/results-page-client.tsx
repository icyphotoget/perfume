"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const baseVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 }
};

type RecommendedItem = {
  id: string;
  name: string;
  house: string;
  description: string;
  score: number; // 0–1
  vibeTags: string[];
  vibeSentence: string;
  wearingScenario: string;
  explanation?: string | null; // ⬅️ NEW (from AI)
};

type Props = {
  items: RecommendedItem[];
};

export default function ResultsPageClient({ items }: Props) {
  if (!items || items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-sm text-slate-300">
        <header className="flex items-center justify-between mb-6 md:mb-8">
          <Link
            href="/quiz"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-amberLux"
          >
            ← Adjust answers
          </Link>
        </header>
        <p>No recommendations yet. Try running the AI quiz again.</p>
      </div>
    );
  }

  const [primary, ...rest] = items;

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://perfume.example.com/results";

  const encodedShareUrl = encodeURIComponent(shareUrl);
  const shareText = encodeURIComponent(
    "My AI scent persona & niche perfume matches from Parfemi."
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Top nav */}
      <header className="flex items-center justify-between mb-6 md:mb-8">
        <Link
          href="/quiz"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-amberLux"
        >
          ← Adjust answers
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase text-slate-400">
          <Link href="/" className="hover:text-amberLux transition">
            Discover
          </Link>
          <Link href="/quiz" className="hover:text-amberLux transition">
            AI Scent Stylist
          </Link>
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
        className="space-y-8 md:space-y-10"
      >
        {/* Highlighted main match */}
        <section className="grid md:grid-cols-[2.1fr,1.4fr] gap-6 md:gap-10">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-lg shadow-black/40">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80 mb-4">
              Your signature match
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">
              {primary.name}
            </h1>
            <p className="text-sm text-slate-400 mb-4">{primary.house}</p>

            <p className="text-sm text-slate-200 mb-4">
              {primary.description}
            </p>

            <p className="text-sm text-slate-300 italic mb-4">
              {/* Prefer AI explanation, fallback to vibeSentence */}
              {primary.explanation ?? (
                <>
                  On you, this reads like{" "}
                  <span className="text-amber-200">
                    {primary.vibeSentence}
                  </span>
                  .
                </>
              )}
            </p>

            <p className="text-xs text-slate-400 mb-4">
              Best for{" "}
              <span className="text-slate-100">
                {primary.wearingScenario}
              </span>
              .
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {primary.vibeTags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-[0.18em] rounded-full border border-slate-700 px-3 py-1 text-slate-300 bg-slate-950/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1">
                Match score:
                <span className="text-amber-300 font-medium">
                  {(primary.score * 100).toFixed(0)}%
                </span>
              </span>
            </div>
          </div>

          {/* Share + meta */}
          <aside className="space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-5 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
                Share your aura
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full border border-slate-700 text-xs hover:border-amberLux hover:text-amberLux transition"
                >
                  Share on X
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full border border-slate-700 text-xs hover:border-amberLux hover:text-amberLux transition"
                >
                  Share on Facebook
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(shareUrl).catch(() => {});
                    }
                  }}
                  className="px-3 py-1.5 rounded-full border border-slate-700 text-xs hover:border-amberLux hover:text-amberLux transition"
                >
                  Copy link
                </button>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 text-xs text-slate-400">
              <p className="mb-2">
                These matches are generated by your answers + our AI scent
                stylist. Refine them by adjusting your mood, vibe or occasion.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 text-amber-200 hover:text-amber-100"
              >
                Re-tune my profile →
              </Link>
            </div>
          </aside>
        </section>

        {/* Secondary matches */}
        {rest.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Other fragrances in your orbit
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {rest.map(item => (
                <motion.article
                  key={item.id}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-slate-900/40 border border-slate-800 rounded-3xl p-4 text-sm"
                >
                  <p className="text-xs text-slate-400 mb-1">
                    {item.house}
                  </p>
                  <h3 className="text-base text-slate-50 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-300 mb-3 line-clamp-3">
                    {item.description}
                  </p>
                  <p className="text-xs text-slate-400 mb-3">
                    {item.explanation ?? item.vibeSentence}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.vibeTags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-[0.18em] rounded-full border border-slate-800 px-2 py-0.5 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Match score{" "}
                    <span className="text-amber-300">
                      {(item.score * 100).toFixed(0)}%
                    </span>
                  </p>
                </motion.article>
              ))}
            </div>
          </section>
        )}
      </motion.main>
    </div>
  );
}
