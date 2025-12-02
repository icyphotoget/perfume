// app/perfumes/[id]/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface PageProps {
  params: { id: string };
}

export default async function PerfumePage({ params }: PageProps) {
  const supabase = createSupabaseServerClient();

  const [{ data: perfume }, { data: reviews }] = await Promise.all([
    supabase.from("perfumes").select("*").eq("id", params.id).single(),
    supabase
      .from("reviews")
      .select("*, profiles(username)")
      .eq("perfume_id", params.id)
      .order("created_at", { ascending: false }),
  ]);

  if (!perfume) {
    return <div className="p-6">Parfem nije pronađen.</div>;
  }

  return (
    <main className="p-6 space-y-6">
      <section className="flex gap-6">
        {perfume.image_url && (
          <img
            src={perfume.image_url}
            alt={perfume.name}
            className="w-48 h-48 object-cover rounded-xl"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{perfume.name}</h1>
          <p className="text-sm opacity-70">{perfume.brand}</p>
          <p className="mt-4 text-sm">{perfume.description}</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Recenzije</h2>
        {reviews && reviews.length > 0 ? (
          reviews.map((r: any) => (
            <div key={r.id} className="border rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">
                  {r.profiles?.username ?? "Anon"}
                </span>
                <span>⭐ {r.rating}/5</span>
              </div>
              <p className="text-sm mt-2">{r.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-sm opacity-70">
            Još nema recenzija. Budi prvi!
          </p>
        )}
      </section>
    </main>
  );
}
