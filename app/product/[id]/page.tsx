import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import ProductPageClient from "@/components/product-page-client";

const siteUrl = "https://perfume.example.com"; // TODO: change to real domain

type Props = {
  params: { id: string };
};

// ✅ STATIC PARAMS — Next will pre-generate all product pages
export function generateStaticParams() {
  return products.map(product => ({
    id: product.id
  }));
}

// ✅ DYNAMIC METADATA PER PRODUCT
export function generateMetadata({ params }: Props): Metadata {
  const product = products.find(p => p.id === params.id);

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
          url: `${siteUrl}/og/product-${product.id}.jpg`, // placeholder
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

// ✅ SERVER COMPONENT WRAPPER
export default function ProductPage({ params }: Props) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
