// lib/aiExplain.ts

import type { StructuredProfile } from "./aiProfile";
import type { Product } from "./data";

const FALLBACK_EXPLANATION =
  "This scent echoes the mood and texture of your answers, extending your natural aura instead of overpowering it.";

export async function explainMatchWithGroq(
  profile: StructuredProfile | undefined,
  product: Product
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  // If no key or no profile → safe fallback text
  if (!apiKey || !profile) {
    return FALLBACK_EXPLANATION;
  }

  const systemPrompt = `
You are an AI perfume stylist.

Given:
- a user's structured scent profile
- a perfume's basic information

Write a short, poetic explanation (2 sentences max) of WHY this perfume suits the user.

Style:
- intimate, aesthetic, a bit romantic
- no marketing cliches
- talk about the aura it creates around the wearer
- don't mention "profile", "tags", "JSON" or "AI"
`.trim();

  const userContent = JSON.stringify(
    {
      profile,
      perfume: {
        id: product.id,
        name: product.name,
        house: product.house,
        description: product.description,
        vibeTags: product.vibeTags,
        vibeSlug: product.vibeSlug,
        longevity: product.longevity,
        sillage: product.sillage,
        basePrice: product.basePrice
      }
    },
    null,
    2
  );

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent }
        ],
        temperature: 0.5,
        max_tokens: 120
      })
    });

    if (!res.ok) {
      console.error("Groq explanation API error:", await res.text());
      return FALLBACK_EXPLANATION;
    }

    const data = await res.json();
    const text: string | undefined = data.choices?.[0]?.message?.content;

    if (!text) return FALLBACK_EXPLANATION;

    return text.trim();
  } catch (err) {
    console.error("Groq explanation error:", err);
    return FALLBACK_EXPLANATION;
  }
}
