// app/profile/library/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function LibraryPage() {
  const supabase = createSupabaseServerClient();

  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-light text-slate-50 mb-3">
          Your perfume library
        </h1>
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

  const { data, error } = await supabase
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
    .eq("user_id", authData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading library:", error);
  }

  const items = data ?? [];

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-light text-slate-50">
          Your perfume library
        </h1>
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-amberLux transition"
        >
          ← Back to discover
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400">
          You haven&apos;t saved any perfumes yet. Browse{" "}
          <Link href="/" className="text-amberLux underline">
            the front page
          </Link>{" "}
          or{" "}
          <Link href="/quiz" className="text-amberLux underline">
            run the AI Scent Stylist
          </Link>{" "}
          to get recommendations.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((entry: any) => {
            const p = entry.perfumes;
            if (!p) return null;
            return (
              <Link
                key={entry.id}
                href={`/product/${p.id}`}
                className="group rounded-3xl border border-slate-800 bg-fog/60 backdrop-blur-xs p-4 flex flex-col justify-between hover:border-amberLux/70 hover:bg-slate-900/70 transition"
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
                      {(p.vibe_tags as string[]).join(" • ")}
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
        </div>
      )}
    </main>
  );
}
