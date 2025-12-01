import ResultsPageClient from "@/components/results-page-client";
import { products } from "@/lib/data";

export default function ResultsPage() {
  // For now, mock: take first 3 products from lib/data
  const base = products.slice(0, 3);

  const items = base.map((p, index) => {
    const scores = [0.93, 0.86, 0.79]; // mock scores
    const vibeSentences = [
      "a smoky, intimate aura that wraps around you like velvet in a low-lit room",
      "a romantic, wine-stained blush of florals and late-night city lights",
      "a soft, cashmere-hug of quiet luxury and understated comfort"
    ];
    const scenarios = [
      "slow, late-night conversations, small gatherings, and evenings where you want to feel cinematic without shouting",
      "dates that feel slightly dangerous in the best way, rooftop bars, and slow walks home through glowing streets",
      "weekend coffee runs, museum afternoons and those days where you want to feel expensive but relaxed"
    ];

    return {
      id: p.id,
      name: p.name,
      house: p.house,
      description: p.description,
      score: scores[index] ?? 0.75,
      vibeTags: p.vibeTags,
      vibeSentence: vibeSentences[index] ?? "a vibe-aligned extension of how you already move through the world.",
      wearingScenario:
        scenarios[index] ??
        "moments where you want to be quietly noticed rather than loudly announced."
    };
  });

  return <ResultsPageClient items={items} />;
}
