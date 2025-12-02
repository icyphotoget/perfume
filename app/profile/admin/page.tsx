// app/profile/admin/page.tsx
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import AdminPerfumesPageClient from "@/components/admin/AdminPerfumesPageClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user || !isAdminEmail(user.email)) {
    redirect("/login?from=/profile/admin");
  }

  const { data, error: perfumesError } = await supabase
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
      image_url
    `
    )
    .order("created_at", { ascending: false });

  if (perfumesError) {
    console.error("Error loading perfumes for admin:", perfumesError);
  }

  const perfumes = (data ?? []).map(row => ({
    id: row.id as string,
    name: row.name as string,
    house: row.house as string,
    description: (row.description as string) ?? "",
    vibeTags: (row.vibe_tags as string[]) ?? [],
    longevity: (row.longevity as number) ?? 0,
    sillage: (row.sillage as number) ?? 0,
    basePrice: (row.base_price as number) ?? 0,
    imageUrl: (row.image_url as string | null) ?? null
  }));

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-light text-slate-50">
          Admin · Perfume catalog
        </h1>
        <p className="text-sm text-slate-400">
          Dodaj, uređuj i briši parfeme iz Supabase <code>perfumes</code>{" "}
          tablice. Ovo vidiš samo ti (admin).
        </p>
      </header>

      <AdminPerfumesPageClient initialPerfumes={perfumes} />
    </main>
  );
}
