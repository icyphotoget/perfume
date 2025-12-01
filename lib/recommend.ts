// lib/recommend.ts

import { products, type Product, type Vibe, vibes } from "./data";

export type RecommendRequest = {
  /**
   * Free-text answers from the AI Scent Stylist quiz.
   * Later this can be vectorized with embeddings.
   */
  answers?: string[];

  /**
   * Optionally pass selected vibe slugs from the UI,
   * e.g. ["moody-introvert", "old-money-weekend"]
   */
  selectedVibes?: string[];

  /**
   * Maximum number of products to return.
   */
  limit?: number;
};

export type ScoredProduct = {
  product: Product;
  score: number;
  matchedVibes: Vibe[];
  matchedKeywords: string[];
};

const DEFAULT_LIMIT = 5;

/**
 * Super simple mock scoring:
 * - Boost if product belongs to a selected vibe
 * - Boost if quiz answers contain keywords found in product description or vibe tags
 */
export function recommendProducts(payload: RecommendRequest): ScoredProduct[] {
  const answers = payload.answers ?? [];
  const selectedVibes = payload.selectedVibes ?? [];
  const limit = payload.limit ?? DEFAULT_LIMIT;

  const normalizedAnswers = answers
    .map(a => a.toLowerCase())
    .filter(Boolean);

  const selectedVibeSet = new Set(selectedVibes);

  const scored: ScoredProduct[] = products.map(product => {
    let score = 0;

    // 1) Base score to avoid all zeroes
    score += 0.1;

    // 2) If product belongs to one of the selected vibes → boost
    const productVibe = vibes.find(v => v.slug === product.vibeSlug) || null;
    const matchedVibes: Vibe[] = [];
    if (productVibe && selectedVibeSet.has(productVibe.slug)) {
      score += 2.5;
      matchedVibes.push(productVibe);
    }

    // 3) Keyword matching between answers and product text
    const searchableText = (
      product.description +
      " " +
      product.vibeTags.join(" ")
    ).toLowerCase();

    const matchedKeywords: string[] = [];

    for (const answer of normalizedAnswers) {
      // naive split by spaces for mock purposes
      const tokens = answer.split(/\s+/).filter(Boolean);
      for (const token of tokens) {
        if (token.length < 3) continue; // skip tiny words like "in", "of"
        if (searchableText.includes(token)) {
          score += 0.4;
          if (!matchedKeywords.includes(token)) {
            matchedKeywords.push(token);
          }
        }
      }
    }

    // 4) Tiny bonus if product has many vibe tags
    score += product.vibeTags.length * 0.05;

    return {
      product,
      score,
      matchedVibes,
      matchedKeywords
    };
  });

  // sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // slice to requested limit
  return scored.slice(0, limit);
}
