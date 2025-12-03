// app/page.tsx
import SmartHeader from "@/components/SmartHeader";
import PerfumeStories from "@/components/PerfumeStories";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-slate-50">
      <SmartHeader />
      {/* Height minus header (assumed ~64px). Adjust if yours is taller/shorter. */}
      <PerfumeStories />
    </main>
  );
}
