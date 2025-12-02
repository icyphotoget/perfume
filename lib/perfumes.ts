// lib/perfumes.ts
import type { Product } from "./data";
import { supabaseStatic } from "./supabase/static";

/**
 * Dohvati sve parfeme (za homepage, generateStaticParams itd.)
 * Ovo je SAFE za SSG jer ne koristi cookies.
 */
export async function getAllPerfumes(): Promise<Product[]> {
  const { data, error } = await supabaseStatic
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
    .order("name", { ascending: true });

  if (error) {
    console.error("Error loading perfumes:", error);
    return [];
  }

  if (!data) return [];

  return data.map(row => ({
    id: row.id,
    name: row.name,
    house: row.house,
    description: row.description,
    vibeTags: row.vibe_tags ?? [],
    longevity: row.longevity ?? 0,
    sillage: row.sillage ?? 0,
    basePrice: row.base_price ?? 0,
    imageUrl: row.image_url ?? null
  }));
}

/**
 * Dohvati jedan parfem po ID-u (za /product/[id]).
 * SAFE za SSG – nema cookies().
 */
export async function getPerfumeById(id: string): Promise<Product | null> {
  const { data, error } = await supabaseStatic
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
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error loading perfume by id:", error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    house: data.house,
    description: data.description,
    vibeTags: data.vibe_tags ?? [],
    longevity: data.longevity ?? 0,
    sillage: data.sillage ?? 0,
    basePrice: data.base_price ?? 0,
    imageUrl: data.image_url ?? null
  };
}
