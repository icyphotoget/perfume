// app/take-me/page.tsx
import Link from "next/link";
import { vibes } from "@/lib/data";

export const metadata = {
  title: "Take me to | Parfemi",
  description:
    "Let Parfemi take you straight to a mood, a season or AI-picked perfumes that match your current vibe."
};

export default function TakeMePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16 space-y-10">
      {/* Hero */}
      <section className="space-y-4">
        <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">
          Take me to…
        </p>
        <h1 className="text-2xl md:text-4xl font-light text-slate-50 max-w-3xl">
          Tell me{" "}
          <span className="bg-gradient-to-r from-amberLux to-softGold bg-clip-text text-transparent">
            where you want to go
          </span>{" "}
          and I’ll drop you straight into the right perfumes.
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl">
          Pick a quick path: let AI choose for you, jump into aesthetics, or
          browse by seasons and moods. This page is just a shortcut into the
          rest of the Parfemi world.
        </p>

        {/* Quick actions */}
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/quiz"
            className="group rounded-3xl border border-amberLux/70 bg-black/50 px-4 py-4 flex flex-col justify-between hover:bg-amberLux hover:text-ink transition shadow-lux-soft"
          >
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-amberLux group-hover:text-ink">
              AI route
            </div>
            <div className="mt-2 text-sm font-medium">
              Take me to <span className="italic">AI picks</span>
            </div>
            <p className="mt-1 text-[0.75rem] text-slate-300 group-hover:text-ink/80">
              Answer a few visual questions and get 3–5 perfumes chosen just
              for your vibe.
            </p>
          </Link>

          <Link
            href="/aesthetic"
            className="group rounded-3xl border border-slate-700 bg-black/40 px-4 py-4 flex flex-col justify-between hover:border-amberLux/80 hover:bg-slate-900/60 transition"
          >
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 group-hover:text-amberLux">
              Visual route
            </div>
            <div className="mt-2 text-sm font-medium">
              Take me to <span className="italic">aesthetic sections</span>
            </div>
            <p className="mt-1 text-[0.75rem] text-slate-300">
              Old money, dark academia, office siren and more curated worlds.
            </p>
          </Link>

          <Link
            href="/seasonal"
            className="group rounded-3xl border border-slate-700 bg-black/40 px-4 py-4 flex flex-col justify-between hover:border-amberLux/80 hover:bg-slate-900/60 transition"
          >
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 group-hover:text-amberLux">
              Time route
            </div>
            <div className="mt-2 text-sm font-medium">
              Take me to <span className="italic">seasonal vibes</span>
            </div>
            <p className="mt-1 text-[0.75rem] text-slate-300">
              Pick perfumes by weather, holidays and the type of light outside.
            </p>
          </Link>

          <Link
            href="/feels"
            className="group rounded-3xl border border-slate-700 bg-black/40 px-4 py-4 flex flex-col justify-between hover:border-amberLux/80 hover:bg-slate-900/60 transition"
          >
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 group-hover:text-amberLux">
              Emotion route
            </div>
            <div className="mt-2 text-sm font-medium">
              Take me to <span className="italic">my mood</span>
            </div>
            <p className="mt-1 text-[0.75rem] text-slate-300">
              I feel chaotic, romantic, introverted, feral, soft, unhinged…
              match it with scent.
            </p>
          </Link>
        </div>
      </section>

      {/* Vibes preview grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm md:text-base uppercase tracking-[0.22em] text-slate-400">
            Or take me to a specific vibe
          </h2>
          <p className="text-[0.7rem] text-slate-500">
            These link into the dedicated vibe pages.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {vibes.map(vibe => (
            <Link
              key={vibe.slug}
              href={`/vibe/${vibe.slug}`}
              className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-4 md:p-5 hover:border-amberLux/80 hover:shadow-lux-soft transition"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">
                    Vibe
                  </p>
                  <p className="text-sm md:text-base text-slate-50">
                    {vibe.name}
                  </p>
                  <p className="text-[0.75rem] text-slate-400">
                    {vibe.tagline}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amberLux/70 via-softGold/60 to-slate-900 opacity-80 group-hover:opacity-100" />
              </div>
              <p className="mt-3 text-[0.7rem] text-amberLux opacity-80 group-hover:opacity-100">
                Take me to this vibe →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
