// app/product/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageClient from "@/components/product-page-client";
import type { Product } from "@/lib/data";
import { supabaseStaticClient } from "@/lib/supabase/static";

const siteUrl = "https://perfume.example.com"; // TODO: promijeni na pravi domain

type Props = {
  params: { id: string };
};

// 🔹 Helper koji čita 1 parfem iz Supabase i mappa ga na Product
async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabaseStaticClient
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
    .single();

  if (error || !data) {
    console.error("Product not found or Supabase error:", error);
    return null;
  }

  const product: Product = {
    id: data.id,
    name: data.name,
    house: data.house,
    description: data.description ?? "",
    vibeTags: data.vibe_tags ?? [],
    longevity: data.longevity ?? 0,
    sillage: data.sillage ?? 0,
    basePrice: Number(data.base_price ?? 0),
    imageUrl: data.image_url ?? null
  };

  return product;
}

// ✅ Pre-generiraj product stranice
export async function generateStaticParams() {
  const { data, error } = await supabaseStaticClient
    .from("perfumes")
    .select("id");

  if (error || !data) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }

  return data.map(p => ({
    id: String(p.id)
  }));
}

// ✅ Metadata po parfemu
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: "Fragrance not found | Parfemi",
      description: "This niche fragrance could not be found."
    };
  }

  const url = `${siteUrl}/product/${params.id}`;
  const description = (product.description ?? "").slice(0, 150);

  return {
    title: `${product.name} by ${product.house} | Niche Perfume Decant`,
    description,
    openGraph: {
      title: `${product.name} by ${product.house} | Niche Perfume Decant`,
      description,
      url,
      type: "website",
      siteName: "Parfemi — Niche Perfume Discovery",
      images: [
        {
          url: product.imageUrl || `${siteUrl}/og/product-${params.id}.jpg`,
          width: 1200,
          height: 630,
          alt: `${product.name} fragrance bottle`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} by ${product.house} | Niche Perfume Decant`,
      description
    }
  };
}

// ✅ Server komponenta
export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
