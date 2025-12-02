// lib/perfumes.ts
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/data";

// helper – mapiramo DB row u Product tip iz lib/data.ts
function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    house: row.house ?? "",
    description: row.description ?? "",
    vibeTags: (row.vibe_tags ?? []) as string[],
    longevity: row.longevity ?? 0,
    sillage: row.sillage ?? 0,
    basePrice: row.base_price ?? 0,
    imageUrl: row.image_url ?? null
  };
}

/**
 * Dohvati SVE parfeme iz Supabase `perfumes` tablice.
 * Možeš po želji promijeniti order (po nazivu, house, datumu…)
 */
export async function getAllPerfumes(): Promise<Product[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("perfumes")
    .select(
      `
      id,
      name,
      house,
      description,
      image_url,
      vibe_tags,
      longevity,
      sillage,
      base_price
    `
    )
    .order("name", { ascending: true });

  if (error) {
    console.error("Error loading perfumes from Supabase:", error.message);
    return [];
  }

  if (!data) return [];

  return data.map(mapRowToProduct);
}

/**
 * Dohvati jedan parfem po id-u.
 */
export async function getPerfumeById(
  id: string
): Promise<Product | null> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("perfumes")
    .select(
      `
      id,
      name,
      house,
      description,
      image_url,
      vibe_tags,
      longevity,
      sillage,
      base_price
    `
    )
    .eq("id", id)
    .maybeSingle(); // vrati null ako ne postoji

  if (error) {
    console.error("Error loading single perfume:", error.message);
    return null;
  }

  if (!data) return null;

  return mapRowToProduct(data);
}
