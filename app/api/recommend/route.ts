// app/api/recommend/route.ts

import { NextResponse, type NextRequest } from "next/server";
import { recommendProducts, type RecommendRequest } from "@/lib/recommend";

/**
 * POST /api/recommend
 *
 * Example payload:
 * {
 *   "answers": [
 *     "I love dark, smoky, night-time scents",
 *     "I read alone while it rains outside"
 *   ],
 *   "selectedVibes": ["moody-introvert", "night-creature"],
 *   "limit": 3
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const json = (await req.json()) as Partial<RecommendRequest> | null;

    if (!json || ( !json.answers && !json.selectedVibes)) {
      return NextResponse.json(
        {
          error:
            "Missing input. Provide at least `answers` or `selectedVibes`.",
          example: {
            answers: [
              "I like cozy scents for reading on rainy nights",
              "I prefer warm, spicy, evening fragrances"
            ],
            selectedVibes: ["moody-introvert", "dark-academia"],
            limit: 3
          }
        },
        { status: 400 }
      );
    }

    const payload: RecommendRequest = {
      answers: json.answers ?? [],
      selectedVibes: json.selectedVibes ?? [],
      limit: json.limit ?? 5
    };

    const results = recommendProducts(payload);

    return NextResponse.json(
      {
        input: payload,
        count: results.length,
        results: results.map(item => ({
          score: Number(item.score.toFixed(3)),
          matchedVibes: item.matchedVibes.map(v => ({
            slug: v.slug,
            name: v.name
          })),
          matchedKeywords: item.matchedKeywords,
          product: {
            id: item.product.id,
            name: item.product.name,
            house: item.product.house,
            description: item.product.description,
            vibeTags: item.product.vibeTags,
            longevity: item.product.longevity,
            sillage: item.product.sillage,
            vibeSlug: item.product.vibeSlug,
            basePrice: item.product.basePrice
          }
        }))
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/recommend", error);
    return NextResponse.json(
      {
        error: "Something went wrong while generating recommendations."
      },
      { status: 500 }
    );
  }
}

/**
 * Optionally support GET for quick debugging:
 * GET /api/recommend?demo=1
 */
export async function GET() {
  const demoPayload: RecommendRequest = {
    answers: [
      "I like dark, moody, evening scents with velvet and smoke.",
      "I read books alone when it rains."
    ],
    selectedVibes: ["moody-introvert"],
    limit: 3
  };

  const results = recommendProducts(demoPayload);

  return NextResponse.json(
    {
      demo: true,
      input: demoPayload,
      count: results.length,
      results: results.map(item => ({
        score: Number(item.score.toFixed(3)),
        product: {
          id: item.product.id,
          name: item.product.name,
          house: item.product.house
        },
        matchedVibes: item.matchedVibes.map(v => ({
          slug: v.slug,
          name: v.name
        })),
        matchedKeywords: item.matchedKeywords
      }))
    },
    { status: 200 }
  );
}
