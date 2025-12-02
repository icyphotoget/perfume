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
      // --- 1) Load user session ---
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();

      if (error) console.error("Error getting user:", error);
      if (!user) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(user);

      // --- 2) Load saved perfumes ---
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
        // Normalize perfumes[] → perfumes object
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

  // --- Loading state ---
  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-sm text-slate-400">Loading your library…</p>
      </main>
    );
  }

  // --- User not logged in ---
  if (!user) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-3">
        <h1 className="text-2xl font-light text-slate-50">Your perfume library</h1>
        <p className="text-sm text-slate-400">
          You need to{" "}
          <Link href="/login" className="text-amberLux underline">
            log in
          </Link>{" "}
          to see saved perfumes.
        </p>
      </main>
    );
  }

  // --- Show saved perfumes ---
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-light text-slate-50">Your perfume library</h1>
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-amberLux transition"
        >
          ← Back to discover
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400">
          You haven't saved any perfumes yet. Browse{" "}
          <Link href="/" className="text-amberLux underline">
            the front page
          </Link>{" "}
          or{" "}
          <Link href="/quiz" className="text-amberLux underline">
            run the AI Scent Stylist
          </Link>{" "}
          to discover your signature scents.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
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
                  <h2 className="text-sm md:text-base text-slate-50">{p.name}</h2>

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
                  Saved on {new Date(entry.created_at).toLocaleDateString("en-GB")}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
