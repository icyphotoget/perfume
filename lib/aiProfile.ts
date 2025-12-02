// lib/aiProfile.ts

export type StructuredProfile = {
  moods: string[];
  personality: string[];
  seasons: string[];
  occasions: string[];
  intensity?: "soft" | "moderate" | "loud" | null;
  budget?: "low" | "medium" | "high" | null;
  genders: string[];
  notePreferences: string[];
};

const EMPTY_PROFILE: StructuredProfile = {
  moods: [],
  personality: [],
  seasons: [],
  occasions: [],
  genders: [],
  notePreferences: [],
  intensity: null,
  budget: null
};

export async function analyzeAnswersWithGroq(
  answers: string[]
): Promise<StructuredProfile> {
  // If no answers → nothing to analyze
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

Return ONLY valid JSON with this exact schema:

{
  "moods": string[],
  "personality": string[],
  "seasons": string[],
  "occasions": string[],
  "intensity": "soft" | "moderate" | "loud" | null,
  "budget": "low" | "medium" | "high" | null,
  "genders": string[],
  "notePreferences": string[]
}

Do NOT include any extra keys or comments.
  `.trim();

  const userContent = answers.join("\n\n---\n\n");

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userContent }
        ],
        temperature: 0.2,
        max_tokens: 300
      })
    });

    if (!res.ok) {
      console.error("Groq API error (profile):", await res.text());
      return EMPTY_PROFILE;
    }

    const data = await res.json();
    const content: string | undefined = data.choices?.[0]?.message?.content;

    if (!content) {
      console.warn("Groq returned no content for profile analysis.");
      return EMPTY_PROFILE;
    }

    const parsed = JSON.parse(content);

    return {
      ...EMPTY_PROFILE,
      ...parsed
    } as StructuredProfile;
  } catch (err) {
    console.error("Failed to analyze answers with Groq:", err);
    return EMPTY_PROFILE;
  }
}
