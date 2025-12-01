import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        <header className="flex items-center justify-between mb-6 md:mb-8 print:mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amberLux to-softGold" />
            <span className="text-sm tracking-[0.25em] uppercase text-slate-300">
              Parfemi
            </span>
          </div>
          <div className="hidden print:hidden md:flex items-center gap-4 text-xs">
            <Link
              href="/results"
              className="text-slate-400 hover:text-amberLux transition"
            >
              Back to results
            </Link>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.print();
                }
              }}
              className="px-3 py-1.5 rounded-2xl border border-slate-600 text-slate-200 hover:border-amberLux hover:text-amberLux transition text-[0.7rem]"
            >
              Print / Save as PDF
            </button>
          </div>
        </header>

        <main className="bg-slate-950 print:bg-white print:text-black rounded-3xl print:rounded-none border border-slate-800 print:border-none shadow-lux-soft print:shadow-none p-5 md:p-8 space-y-6 md:space-y-8">
          {/* Header block */}
          <section className="flex flex-col md:flex-row justify-between gap-4 border-b border-slate-800 pb-4 md:pb-6 print:border-black/10">
            <div className="space-y-2">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500 print:text-black/60">
                AI Scent Profile
              </p>
              <h1 className="text-2xl md:text-3xl font-light text-slate-50 print:text-black">
                Your current{" "}
                <span className="text-amberLux print:text-black">
                  scent persona snapshot.
                </span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 print:text-black/80 max-w-xl">
                This document is designed to be shared with you, a partner, or a
                perfumery — a quick, aesthetic overview of what your AI Scent
                Stylist thinks you&apos;ll love right now.
              </p>
            </div>
            <div className="text-xs text-slate-400 print:text-black/70 space-y-1">
              <p>Date: ____________</p>
              <p>Generated for: ____________________</p>
              <p>Session ID: _____________</p>
            </div>
          </section>

          {/* Persona summary */}
          <section className="space-y-3">
            <h2 className="text-sm md:text-base uppercase tracking-[0.22em] text-slate-400 print:text-black/60">
              Persona Overview
            </h2>
            <p className="text-sm md:text-base text-slate-200 print:text-black/85">
              You gravitate towards{" "}
              <span className="text-amberLux font-medium print:text-black">
                moody, intimate and slow-burning atmospheres
              </span>{" "}
              — the kind of energy that feels like late-night conversations, dim
              rooms, heavy fabrics and quiet confidence rather than loud
              entrances.
            </p>
            <ul className="text-sm text-slate-300 print:text-black/80 list-disc list-inside space-y-1">
              <li>Prefers evening and late-afternoon wear over bright mornings.</li>
              <li>Comfortable with a bit of mystery, smoke, or depth.</li>
              <li>Enjoys scents that feel like stories, not just “smelling nice”.</li>
            </ul>
          </section>

          {/* Primary match */}
          <section className="space-y-3">
            <h2 className="text-sm md:text-base uppercase tracking-[0.22em] text-slate-400 print:text-black/60">
              Primary Match
            </h2>
            <div className="border border-slate-800 print:border-black/15 rounded-2xl p-4 space-y-2">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 print:text-black/55">
                Example:
              </p>
              <p className="text-base md:text-lg text-slate-50 print:text-black">
                Velvet Smoke — Maison Obscura
              </p>
              <p className="text-xs text-slate-400 print:text-black/70">
                Match score: ________ %
              </p>
              <p className="text-sm text-slate-200 print:text-black/80">
                A dark, enveloping trail of oud, incense and black vanilla that
                clings to velvet and late-night conversations.
              </p>
              <p className="text-sm text-slate-300 print:text-black/80">
                <span className="font-semibold print:font-semibold">
                  Why it fits:
                </span>{" "}
                it mirrors your preference for quiet intensity, cozy but
                sophisticated spaces, and that softly cinematic feeling you
                hinted at in your answers.
              </p>
              <p className="text-sm text-slate-300 print:text-black/80">
                <span className="font-semibold print:font-semibold">
                  Best worn:
                </span>{" "}
                dinners, dates, creative work at night, solo city walks,
                low-light bars.
              </p>
            </div>
          </section>

          {/* Supporting matches */}
          <section className="space-y-3">
            <h2 className="text-sm md:text-base uppercase tracking-[0.22em] text-slate-400 print:text-black/60">
              Supporting Matches
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="border border-slate-800 print:border-black/15 rounded-2xl p-3 space-y-1">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 print:text-black/55">
                  Example:
                </p>
                <p className="text-sm text-slate-50 print:text-black">
                  Paris Midnight Rose — Atelier Rue Noire
                </p>
                <p className="text-xs text-slate-400 print:text-black/70">
                  For romantic, wine-glass evenings and soft city glow.
                </p>
              </div>
              <div className="border border-slate-800 print:border-black/15 rounded-2xl p-3 space-y-1">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 print:text-black/55">
                  Example:
                </p>
                <p className="text-sm text-slate-50 print:text-black">
                  Heritage Cashmere — Maison du Patrimoine
                </p>
                <p className="text-xs text-slate-400 print:text-black/70">
                  For quiet luxury, weekend coffees and museum afternoons.
                </p>
              </div>
            </div>
          </section>

          {/* Notes / space to write */}
          <section className="space-y-3">
            <h2 className="text-sm md:text-base uppercase tracking-[0.22em] text-slate-400 print:text-black/60">
              Your notes
            </h2>
            <div className="space-y-4 text-sm text-slate-300 print:text-black/80">
              <p>
                Use this space to write which scents you actually tried, what
                they reminded you of, and how they behaved on your skin.
              </p>
              <div className="h-20 border border-dashed border-slate-700 print:border-black/25 rounded-xl" />
              <div className="h-20 border border-dashed border-slate-700 print:border-black/25 rounded-xl" />
            </div>
          </section>

          {/* Footer */}
          <section className="pt-4 mt-2 border-t border-slate-800 print:border-black/10 text-[0.65rem] text-slate-500 print:text-black/60 flex justify-between">
            <span>Parfemi — Niche Perfume Discovery & AI Scent Stylist</span>
            <span className="hidden md:inline">
              This is a design mock. In production, all data will reflect your
              actual quiz session.
            </span>
          </section>
        </main>
      </div>
    </div>
  );
}
