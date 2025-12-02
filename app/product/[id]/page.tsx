import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageClient from "@/components/product-page-client";
import { getAllPerfumes, getPerfumeById } from "@/lib/perfumes";

const siteUrl = "https://perfumai.vercel.app"; // stavi svoj pravi domain

type Props = {
  params: { id: string };
};

// Next će pre-generirati statičke product pageove za sve parfeme iz baze
export async function generateStaticParams() {
  const perfumes = await getAllPerfumes();

  return perfumes.map(p => ({
    id: p.id
  }));
}

// Dinamički metadata per parfem
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getPerfumeById(params.id);

  if (!product) {
    return {
      title: "Fragrance not found | Parfemi",
      description: "This niche fragrance could not be found."
    };
  }

  const url = `${siteUrl}/product/${product.id}`;
  const description = product.description.slice(0, 150);

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
          url:
            product.imageUrl ??
            `${siteUrl}/og/product-${product.id}.jpg`,
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

export default async function ProductPage({ params }: Props) {
  const product = await getPerfumeById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
