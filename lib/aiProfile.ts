// lib/aiProfile.ts

export type StructuredProfile = {
  moods: string[];
  personality: string[];
  seasons: string[];
  occasions: string[];
  intensity?: "soft" | "moderate" | "loud";
  budget?: "low" | "medium" | "high";
  genders: string[];
  notePreferences: string[];
};

const EMPTY_PROFILE: StructuredProfile = {
  moods: [],
  personality: [],
  seasons: [],
  occasions: [],
  genders: [],
  notePreferences: []
};

export async function analyzeAnswersWithGroq(
  answers: string[]
): Promise<StructuredProfile> {
  if (!answers || answers.length === 0) return EMPTY_PROFILE;

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.warn("GROQ_API_KEY is not set – skipping AI analysis.");
    return EMPTY_PROFILE;
  }

  const prompt = `
You are an AI perfume stylist.

User has described what they like in perfumes. 
From their free-text answers, extract a structured profile.

Return ONLY valid JSON with this exact TypeScript-like schema:

{
  "moods": string[],              // e.g. ["moody", "romantic", "cozy"]
  "personality": string[],        // e.g. ["introvert", "playful", "mysterious"]
  "seasons": string[],            // e.g. ["autumn", "winter", "summer"]
  "occasions": string[],          // e.g. ["office", "date-night", "clubbing"]
  "intensity": "soft" | "moderate" | "loud" | null,
  "budget": "low" | "medium" | "high" | null,
  "genders": string[],            // e.g. ["masculine", "feminine", "unisex"]
  "notePreferences": string[]     // e.g. ["vanilla", "amber", "oud", "citrus"]
}

Do NOT include any extra keys or comments.
  `.trim();

  const userContent = answers.join("\n\n---\n\n");

  const res = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // fast & cheap :contentReference[oaicite:0]{index=0}
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userContent }
        ],
        temperature: 0.2
      })
    }
  );

  if (!res.ok) {
    console.error("Groq API error:", await res.text());
    return EMPTY_PROFILE;
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    console.warn("Groq returned no content for analysis.");
    return EMPTY_PROFILE;
  }

  try {
    const parsed = JSON.parse(content);
    return {
      ...EMPTY_PROFILE,
      ...parsed
    } as StructuredProfile;
  } catch (err) {
    console.error("Failed to parse Groq JSON:", err, content);
    return EMPTY_PROFILE;
  }
}
