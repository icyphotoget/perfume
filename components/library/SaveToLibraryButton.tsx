"use client";

import { useState } from "react";

type Props = {
  perfumeId: string;
  perfumeName: string;
};

export default function SaveToLibraryButton({ perfumeId, perfumeName }: Props) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ perfumeId })
      });

      if (res.status === 401) {
        setError("Please log in to save perfumes to your library.");
        setSaved(false);
      } else if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Something went wrong.");
      } else {
        setSaved(true);
      }
    } catch (e) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading || saved}
        className={`inline-flex items-center justify-center rounded-3xl px-4 py-2.5 text-xs font-medium border transition ${
          saved
            ? "border-emerald-500/70 text-emerald-400 bg-emerald-900/20"
            : "border-slate-700 text-slate-200 hover:border-amberLux hover:text-amberLux bg-fog/40 backdrop-blur-xs"
        } ${loading ? "opacity-70 cursor-wait" : ""}`}
      >
        {saved ? "Saved to your library" : `Save ${perfumeName} to library`}
      </button>
      {error && (
        <p className="text-[0.7rem] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
