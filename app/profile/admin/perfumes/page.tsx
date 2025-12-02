// app/profile/admin/perfumes/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  createPerfume,
  deletePerfume,
  updatePerfume,
  setFeaturedPerfume
} from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

type AdminPerfumesPageProps = {
  searchParams?: {
    house?: string;
    vibe?: string;
  };
};

export default async function AdminPerfumesPage({
  searchParams
}: AdminPerfumesPageProps) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Ako želiš hard admin check:
  // if (user.email !== "tvoj@mail.com") redirect("/");

  const houseFilter = (searchParams?.house ?? "").trim();
  const vibeFilter = (searchParams?.vibe ?? "").trim();

  let query = supabase
    .from("perfumes")
    .select(
      `
        id,
        name,
        house,
        description,
        vibe_tags,
        longevity,
        sillage,
        base_price,
        image_url,
        vibe_slug,
        is_featured,
        created_at
      `
    );

  if (houseFilter) {
    query = query.ilike("house", `%${houseFilter}%`);
  }

  if (vibeFilter) {
    query = query.eq("vibe_slug", vibeFilter);
  }

  const { data: perfumes, error } = await query.order("created_at", {
    ascending: false
  });

  if (error) {
    console.error("Error fetching perfumes for admin:", error);
  }

  const list = perfumes ?? [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">
            Admin · Perfumes
          </p>
          <h1 className="text-2xl md:3xl font-light text-slate-50">
            Perfume catalog dashboard
          </h1>
        </div>
        <Link
          href="/profile"
          className="text-xs text-slate-400 hover:text-amberLux transition"
        >
          ← Back to profile
        </Link>
      </div>

      {/* Filter bar */}
      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 md:p-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm uppercase tracking-[0.24em] text-slate-400">
            Filters
          </h2>
          <Link
            href="/profile/admin/perfumes"
            className="text-[0.7rem] text-slate-400 hover:text-amberLux transition"
          >
            Reset filters
          </Link>
        </div>
        <form
          method="GET"
          className="grid gap-3 md:grid-cols-3 items-end"
        >
          <div className="space-y-1">
            <label className="text-[0.7rem] text-slate-400">
              House (partial match)
            </label>
            <input
              name="house"
              defaultValue={houseFilter}
              placeholder="Parfums de Marly"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[0.7rem] text-slate-400">
              Vibe slug
            </label>
            <input
              name="vibe"
              defaultValue={vibeFilter}
              placeholder="old-money-weekend, moody-introvert..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>
          <div className="flex md:justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-3xl px-5 py-2.5 text-xs font-medium bg-slate-100/10 border border-slate-600 text-slate-100 hover:border-amberLux hover:text-amberLux transition"
            >
              Apply filters
            </button>
          </div>
        </form>
      </section>

      {/* Add new perfume form */}
      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 md:p-6 space-y-4">
        <h2 className="text-sm uppercase tracking-[0.24em] text-slate-400">
          Add new perfume
        </h2>
        <form
          action={createPerfume}
          className="grid gap-3 md:gap-4 md:grid-cols-2"
        >
          <div className="space-y-1 md:col-span-1">
            <label className="text-[0.7rem] text-slate-400">Name</label>
            <input
              name="name"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>

          <div className="space-y-1 md:col-span-1">
            <label className="text-[0.7rem] text-slate-400">House</label>
            <input
              name="house"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-[0.7rem] text-slate-400">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-[0.7rem] text-slate-400">
              Vibe tags (comma separated)
            </label>
            <input
              name="vibeTags"
              placeholder="dark, gourmand, winter, clubbing"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[0.7rem] text-slate-400">
              Longevity (0–10)
            </label>
            <input
              name="longevity"
              type="number"
              min={0}
              max={10}
              defaultValue={7}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[0.7rem] text-slate-400">
              Sillage (0–10)
            </label>
            <input
              name="sillage"
              type="number"
              min={0}
              max={10}
              defaultValue={7}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[0.7rem] text-slate-400">
              Base price (€) for 10ml
            </label>
            <input
              name="basePrice"
              type="number"
              step="0.01"
              defaultValue={39}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[0.7rem] text-slate-400">
              Image URL (e.g. /demo/herod.jpg)
            </label>
            <input
              name="imageUrl"
              placeholder="/demo/herod.jpg"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-[0.7rem] text-slate-400">
              Vibe slug (optional, for /vibe/[slug])
            </label>
            <input
              name="vibeSlug"
              placeholder="old-money-weekend, moody-introvert..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>

          <div className="md:col-span-2 flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-3xl px-5 py-2.5 text-xs font-medium bg-gradient-to-r from-amberLux to-softGold text-ink shadow-lux-soft hover:opacity-95 transition"
            >
              Add perfume
            </button>
          </div>
        </form>
      </section>

      {/* List of perfumes */}
      <section className="space-y-4">
        <h2 className="text-sm uppercase tracking-[0.24em] text-slate-400">
          Existing perfumes ({list.length})
        </h2>

        {list.length === 0 ? (
          <p className="text-sm text-slate-400">
            No perfumes in the database yet. Add your first one above.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {list.map((p: any) => (
              <div
                key={p.id}
                className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                      {p.house}
                    </p>
                    <h3 className="text-sm md:text-base text-slate-50">
                      {p.name}
                    </h3>
                    {p.vibe_tags && (
                      <p className="text-[0.7rem] text-slate-400">
                        {(p.vibe_tags as string[]).join(" • ")}
                      </p>
                    )}
                    <p className="text-[0.7rem] text-slate-500">
                      Longevity {p.longevity ?? 0}/10 · Sillage{" "}
                      {p.sillage ?? 0}/10 · €{Number(p.base_price ?? 0)}
                    </p>
                    {p.vibe_slug && (
                      <p className="text-[0.7rem] text-slate-500">
                        Vibe slug: <code>{p.vibe_slug}</code>
                      </p>
                    )}
                    <p className="text-xs text-slate-400 line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {/* FEATURE TOGGLE */}
                    <form action={setFeaturedPerfume}>
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        className={`text-[0.65rem] px-3 py-1.5 rounded-2xl border ${
                          p.is_featured
                            ? "border-emerald-500/70 text-emerald-300 bg-emerald-900/30"
                            : "border-slate-700 text-slate-300 hover:border-amberLux hover:text-amberLux"
                        } transition`}
                      >
                        {p.is_featured
                          ? "Featured of the week"
                          : "Set as featured"}
                      </button>
                    </form>

                    <form action={deletePerfume}>
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        className="text-[0.65rem] px-3 py-1.5 rounded-2xl border border-red-700/70 text-red-300 hover:bg-red-900/20 transition"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>

                {/* INLINE EDIT */}
                <details className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <summary className="text-[0.7rem] text-slate-300 cursor-pointer">
                    Edit perfume
                  </summary>
                  <form
                    action={updatePerfume}
                    className="mt-3 grid gap-2 text-[0.75rem]"
                  >
                    <input type="hidden" name="id" value={p.id} />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-slate-400">Name</label>
                        <input
                          name="name"
                          defaultValue={p.name}
                          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400">House</label>
                        <input
                          name="house"
                          defaultValue={p.house ?? ""}
                          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400">Description</label>
                      <textarea
                        name="description"
                        defaultValue={p.description ?? ""}
                        rows={2}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400">
                        Vibe tags (comma separated)
                      </label>
                      <input
                        name="vibeTags"
                        defaultValue={
                          p.vibe_tags ? (p.vibe_tags as string[]).join(", ") : ""
                        }
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label className="text-slate-400">Longevity</label>
                        <input
                          name="longevity"
                          type="number"
                          min={0}
                          max={10}
                          defaultValue={p.longevity ?? 0}
                          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400">Sillage</label>
                        <input
                          name="sillage"
                          type="number"
                          min={0}
                          max={10}
                          defaultValue={p.sillage ?? 0}
                          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400">Base price (€)</label>
                        <input
                          name="basePrice"
                          type="number"
                          step="0.01"
                          defaultValue={Number(p.base_price ?? 0)}
                          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400">Image URL</label>
                      <input
                        name="imageUrl"
                        defaultValue={p.image_url ?? ""}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400">Vibe slug</label>
                      <input
                        name="vibeSlug"
                        defaultValue={p.vibe_slug ?? ""}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-2xl px-4 py-1.5 text-[0.7rem] font-medium bg-slate-100/10 border border-slate-600 text-slate-100 hover:border-amberLux hover:text-amberLux transition"
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </details>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
