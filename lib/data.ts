// lib/data.ts

export type Vibe = {
  slug: string;
  name: string;
  tagline: string;
  accent: string;
};

export const vibes: Vibe[] = [
  {
    slug: "old-money-weekend",
    name: "Old Money Weekend",
    tagline: "Quiet wealth, camel coats, countryside estates.",
    accent: "from-amberLux/40 via-fog to-ink"
  },
  {
    slug: "office-siren",
    name: "Office Siren",
    tagline: "Sharp tailoring, soft danger, boardroom seduction.",
    accent: "from-softGold/40 via-fog to-ink"
  },
  {
    slug: "moody-introvert",
    name: "Moody Introvert",
    tagline: "Rainy windows, quiet playlists, dark woods.",
    accent: "from-slate-700 via-fog to-ink"
  },
  {
    slug: "date-night-in-paris",
    name: "Date Night in Paris",
    tagline: "Red wine, wet cobblestones, late night confessions.",
    accent: "from-rose-500/40 via-fog to-ink"
  }
];

export type Product = {
  id: string;
  name: string;
  house: string;
  description: string;
  vibeTags: string[];
  longevity: number; // 1–10
  sillage: number; // 1–10
  vibeSlug: string;
  basePrice: number;
};

export const products: Product[] = [
  {
    id: "velvet-smoke",
    name: "Velvet Smoke",
    house: "Maison Obscura",
    description:
      "A dark, enveloping trail of oud, incense and black vanilla that clings to velvet and late-night conversations.",
    vibeTags: ["Night Creature", "Velvet Smoke", "Dark Academia"],
    longevity: 9,
    sillage: 8,
    vibeSlug: "moody-introvert",
    basePrice: 32
  },
  {
    id: "paris-midnight-rose",
    name: "Paris Midnight Rose",
    house: "Atelier Rue Noire",
    description:
      "A deep wine-rose accord with a whisper of smoke and rain, built for stolen glances and overlong goodbyes.",
    vibeTags: ["Date Night in Paris", "Vintage Romantic"],
    longevity: 7,
    sillage: 7,
    vibeSlug: "date-night-in-paris",
    basePrice: 29
  },
  {
    id: "heritage-cashmere",
    name: "Heritage Cashmere",
    house: "Maison du Patrimoine",
    description:
      "Soft woods, suede, and iris over a warm musky base — like slipping into an heirloom cashmere coat.",
    vibeTags: ["Old Money Weekend", "Quiet Luxury Fresh"],
    longevity: 8,
    sillage: 6,
    vibeSlug: "old-money-weekend",
    basePrice: 34
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: "It’s Friday night. Where are you?",
    options: [
      "Private dinner in a dimly-lit restaurant",
      "Reading alone with rain on the window",
      "Rooftop bar with too-loud music",
      "Packing for a spontaneous weekend trip"
    ]
  },
  {
    id: 2,
    question: "Pick the texture that feels like you.",
    options: ["Velvet", "Crisp cotton", "Leather", "Cashmere"]
  },
  {
    id: 3,
    question: "Your soundtrack today:",
    options: ["Soft jazz", "Indie sad girl", "Techno", "Classical piano"]
  }
];
