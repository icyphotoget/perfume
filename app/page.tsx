import { createSupabaseServerClient } from "@/lib/supabase/server";
import HomeSlider from "@/components/HomeSlider";

export type Product = {
  id: string;
  name: string;
  house: string | null;
  description: string | null;
  image_url: string | null;
  vibe_tags: string[] | null;
  longevity: number | null;
  sillage: number | null;
  base_price: number | null;
  is_featured?: boolean | null;
  vibe_slug?: string | null;
};


export default async function HomePage() {
  const supabase = createSupabaseServerClient();

 const { data, error } = await supabase
  .from("perfumes")
  .select("id, name, house, description, vibe_tags, image_url, longevity, sillage, base_price, is_featured, vibe_slug")
  .order("is_featured", { ascending: false })
  .order("created_at", { ascending: false })
  .limit(20);


  if (error) {
    console.error("Error fetching perfumes:", error);
  }

  const products: Product[] = (data ?? []).map((p) => ({
    ...p,
    vibe_tags: p.vibe_tags ?? [],
  }));

  return <HomeSlider products={products} />;
}
