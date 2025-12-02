// components/admin/AdminPerfumeForm.tsx
"use client";

import { useState } from "react";

export default function AdminPerfumeForm() {
  const [name, setName] = useState("");
  const [house, setHouse] = useState("");
  const [description, setDescription] = useState("");
  const [vibeTags, setVibeTags] = useState("");
  const [longevity, setLongevity] = useState("8");
  const [sillage, setSillage] = useState("7");
  const [basePrice, setBasePrice] = useState("29");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/perfumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          house,
          description,
          vibeTags,
          longevity,
          sillage,
          basePrice,
          imageUrl
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create perfume");
      }

      setMessage(`Perfume created with id ${data.id}`);
      // reset forme
      setName("");
      setHouse("");
      setDescription("");
      setVibeTags("");
      setLongevity("8");
      setSillage("7");
      setBasePrice("29");
      setImageUrl("");
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border border-slate-800 rounded-2xl p-5 bg-black/40"
    >
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs text-slate-400">Name</label>
          <input
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-400">House</label>
          <input
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100"
            value={house}
            onChange={e => setHouse(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-400">Description</label>
        <textarea
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs text-slate-400">
            Vibe tags (comma separated)
          </label>
          <input
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100"
            placeholder="old money, date night, dark gourmand"
            value={vibeTags}
            onChange={e => setVibeTags(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-400">Base price (€)</label>
          <input
            type="number"
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100"
            value={basePrice}
            onChange={e => setBasePrice(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-1">
          <label className="text-xs text-slate-400">Longevity (0–10)</label>
          <input
            type="number"
            min={0}
            max={10}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100"
            value={longevity}
            onChange={e => setLongevity(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-400">Sillage (0–10)</label>
          <input
            type="number"
            min={0}
            max={10}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100"
            value={sillage}
            onChange={e => setSillage(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-400">Image URL (optional)</label>
          <input
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-gradient-to-r from-amberLux to-softGold text-sm text-ink disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save perfume"}
      </button>

      {message && (
        <p className="text-xs text-emerald-400 pt-1">{message}</p>
      )}
      {error && <p className="text-xs text-red-400 pt-1">{error}</p>}
    </form>
  );
}
