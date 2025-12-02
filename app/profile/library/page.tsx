"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Perfume = {
  id: string;
  name: string;
  house: string | null;
  description: string | null;
  image_url: string | null;
  vibe_tags: string[] | null;
};

type LibraryItem = {
  id: string;
  created_at: string;
  perfumes: Perfume | null;
};

export default function LibraryPage() {
  const supabase = createSupabaseBrowserClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [items, setItems] = useState<LibraryItem[]>([]);

  useEffect(() => {
    const load = async () => {
      // 1) user
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error getting user:", error);
      }

      if (!user) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(user);

      // 2) library items
      const { data, error: libError } = await supabase
        .from("library_items")
        .select(
          `
          id,
          created_at,
          perfumes (
            id,
            name,
            house,
            description,
            image_url,
            vibe_tags
          )
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (libError) {
        console.error("Error loading items:", libError);
      } else if (data) {
        const normalized: LibraryItem[] = data.map((row: any) => {
          const arr = row.perfumes;
          const perfume = Array.isArray(arr) ? arr[0] ?? null : arr ?? null;

          return {
            id: String(row.id),
            created_at: String(row.created_at),
            perfumes: perfume
              ? {
                  id: String(perfume.id),
                  name: perfume.name,
                  house: perfume.house,
                  description: perfume.description,
                  image_url: perfume.image_url,
                  vibe_tags: perfume.vibe_tags
                }
              : null
          };
        });

        setItems(normalized);
      }

      setLoading(false);
    };

    load();
  }, [supabase]);

  // LOADING
  if (loading) {
    return (
      <main className="min-h-[60vh] max-w-4xl mx-auto px-4 py-10 flex items-center justify-center">
        <p className="text-sm text-slate-400">Loading your library…</p>
      </main>
    );
  }

  // NOT LOGGED IN
  if (!user) {
    return (
      <main className="min-h-[60vh] max-w-4xl mx-auto px-4 py-10 flex flex-col items-center justify-center gap-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-light text-slate-50">
            Your perfume library
          </h1>
          <p className="text-sm text-slate-400">
            You need to{" "}
            <Link href="/login" className="text-amberLux underline">
              log in
            </Link>{" "}
            to see saved perfumes.
          </p>
        </div>
      </main>
    );
  }

  // LOGGED IN – MAIN VIEW
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      {/* header row */}
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-light text-slate-50">
            Your perfume library
          </h1>
          <p className="text-xs text-slate-500">
            Save perfumes you&apos;re testing, craving or already own.
          </p>
        </div>
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-amberLux transition"
        >
          ← Back to discover
        </Link>
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 ? (
        <section className="min-h-[40vh] flex items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/70 px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.8)] text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-amberLux/15 border border-amberLux/60 flex items-center justify-center text-lg">
                ⭐
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-light text-slate-50">
                Your shelf is still empty.
              </h2>
              <p className="text-sm text-slate-400">
                Run the AI Scent Stylist or browse vibes, then tap{" "}
                <span className="text-amberLux">“Save to library”</span> on any
                perfume you want to keep on your radar.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-3xl px-4 py-2.5 text-xs font-medium bg-gradient-to-r from-amberLux to-softGold text-ink shadow-lux-soft hover:opacity-95 transition"
              >
                Start AI Scent Stylist
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-3xl px-4 py-2.5 text-xs border border-slate-700/80 text-slate-200 hover:border-amberLux/70 hover:text-amberLux transition bg-fog/40 backdrop-blur-xs"
              >
                Browse aesthetic sections
              </Link>
            </div>
          </div>
        </section>
      ) : (
        // LISTA ITEMA
        <section className="grid md:grid-cols-2 gap-4">
          {items.map(entry => {
            const p = entry.perfumes;
            if (!p) return null;

            return (
              <Link
                key={entry.id}
                href={`/product/${p.id}`}
                className="group rounded-3xl border border-slate-800 bg-fog/60 backdrop-blur-xs p-4 hover:border-amberLux/70 hover:bg-slate-900/70 transition"
              >
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {p.house}
                  </p>
                  <h2 className="text-sm md:text-base text-slate-50">
                    {p.name}
                  </h2>

                  {p.vibe_tags && (
                    <p className="text-[0.7rem] text-slate-400">
                      {p.vibe_tags.join(" • ")}
                    </p>
                  )}

                  <p className="text-xs text-slate-400 mt-1 line-clamp-3">
                    {p.description}
                  </p>
                </div>

                <p className="text-[0.65rem] text-slate-500 mt-3">
                  Saved on{" "}
                  {new Date(entry.created_at).toLocaleDateString("en-GB")}
                </p>
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}
