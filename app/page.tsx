// app/page.tsx
import HomePageClient from "@/components/HomePageClient";
import { getAllPerfumes } from "@/lib/perfumes";
import { products as staticProducts } from "@/lib/data";

export default async function HomePage() {
  // probaj iz Supabasea
  const perfumesFromDb = await getAllPerfumes();

  // ako je baza prazna ili error -> fallback na staticProducts
  const productsToUse =
    perfumesFromDb.length > 0 ? perfumesFromDb : staticProducts;

  return <HomePageClient products={productsToUse} />;
}
