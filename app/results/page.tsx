// app/results/page.tsx

import { headers } from "next/headers";
import ResultsPageClient from "@/components/results-page-client";

type ResultsPageProps = {
  searchParams: {
    answers?: string;
    vibes?: string;
    limit?: string;
  };
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  // 1) Parse answers from query string (JSON-encoded array)
  let answers: string[] = [];
  if (searchParams.answers) {
    try {
      const parsed = JSON.parse(searchParams.answers);
      if (Array.isArray(parsed)) {
        answers = parsed.filter(Boolean);
      }
    } catch {
      // ignore parse errors, keep empty
    }
  }

  // 2) Parse selected vibes from query string ("a,b,c") – optional for later
  const selectedVibes =
    searchParams.vibes
      ?.split(",")
      .map(v => v.trim())
      .filter(Boolean) ?? [];

  const limit = searchParams.limit ? Number(searchParams.limit) || 3 : 3;

  // 3) Build an absolute URL for the API (fixes "Failed to parse URL" error)
  const headersList = headers();
  const host =
    headersList.get("x-forwarded-host") ?? headersList.get("host") ?? "localhost:3000";
  const protocol =
    headersList.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${protocol}://${host}`;

  const apiUrl = `${baseUrl}/api/recommend`;

  // 4) Call your AI recommendation API
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      answers.length > 0 || selectedVibes.length > 0
        ? { answers, selectedVibes, limit }
        : {
            answers: [
              "I like dark, moody, evening scents with velvet and smoke.",
              "I read books alone when it rains."
            ],
            selectedVibes: ["moody-introvert"],
            limit
          }
    ),
    cache: "no-store"
  });

  if (!res.ok) {
    console.error("Failed to fetch recommendations:", await res.text());
    return <ResultsPageClient items={[]} />;
  }

  const data = await res.json();

  const items =
    (data.results ?? []).map((r: any) => ({
      id: r.product.id,
      name: r.product.name,
      house: r.product.house,
      description: r.product.description,
      score: r.score ?? 0.75,
      vibeTags: r.product.vibeTags ?? [],
      vibeSentence:
        r.explanation ??
        "a vibe-aligned extension of how you already move through the world.",
      wearingScenario:
        "moments where you want to be quietly noticed rather than loudly announced.",
      explanation: r.explanation ?? null
    })) ?? [];

  return <ResultsPageClient items={items} />;
}
