import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { vibes, products } from "@/lib/data";
import VibePageClient from "@/components/vibe-page-client";

const siteUrl = "https://perfume.example.com"; // TODO: change to real domain

type Props = {
  params: { slug: string };
};

// ✅ STATIC PARAMS — Next will pre-generate all vibe pages
export function generateStaticParams() {
  return vibes.map(vibe => ({
    slug: vibe.slug
  }));
}

// ✅ DYNAMIC METADATA PER VIBE
export function generateMetadata({ params }: Props): Metadata {
  const vibe = vibes.find(v => v.slug === params.slug);

  if (!vibe) {
    return {
      title: "Vibe not found | Parfemi",
      description: "This scent vibe could not be found."
    };
  }

  const url = `${siteUrl}/vibe/${vibe.slug}`;
  const description = `${vibe.tagline} Explore curated niche fragrances matching the ${vibe.name} vibe.`;

  return {
    title: `${vibe.name} | Perfume Vibe Discovery`,
    description,
    openGraph: {
      title: `${vibe.name} | Perfume Vibe Discovery`,
      description,
      url,
      type: "website",
      siteName: "Parfemi — Niche Perfume Discovery",
      images: [
        {
          url: `${siteUrl}/og/vibe-${vibe.slug}.jpg`, // placeholder
          width: 1200,
          height: 630,
          alt: `${vibe.name} vibe moodboard`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${vibe.name} | Perfume Vibe Discovery`,
      description
    }
  };
}

// ✅ SERVER COMPONENT WRAPPER
export default function VibePage({ params }: Props) {
  const vibe = vibes.find(v => v.slug === params.slug);

  if (!vibe) {
    notFound();
  }

  const vibeProducts = products.filter(p => p.vibeSlug === vibe!.slug);

  return <VibePageClient vibe={vibe!} products={vibeProducts} />;
}
