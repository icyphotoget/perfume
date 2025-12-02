// components/admin/AdminPerfumesPageClient.tsx
"use client";

import { useState } from "react";

type AdminPerfume = {
  id: string;
  name: string;
  house: string;
  description: string;
  vibeTags: string[];
  longevity: number;
  sillage: number;
  basePrice: number;
  imageUrl: string | null;
};

type Props = {
  initialPerfumes: AdminPerfume[];
};

export default function AdminPerfumesPageClient({ initialPerfumes }: Props) {
  const [perfumes, setPerfumes] = useState<AdminPerfume[]>(initialPerfumes);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingPerfume = perfumes.find(p => p.id === editingId) || null;

  // form state
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

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setHouse("");
    setDescription("");
    setVibeTags("");
    setLongevity("8");
    setSillage("7");
    setBasePrice("29");
    setImageUrl("");
  };

  const startEdit = (p: AdminPerfume) => {
    setEditingId(p.id);
    setName(p.name);
    setHouse(p.house);
    setDescription(p.description);
    setVibeTags(p.vibeTags.join(", "));
    setLongevity(String(p.longevity));
    setSillage(String(p.sillage));
    setBasePrice(String(p.basePrice));
    setImageUrl(p.imageUrl ?? "");
    setMessage(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const payload = {
      name,
      house,
      description,
      vibeTags,
      longevity,
      sillage,
      basePrice,
      imageUrl
    };

    const url = editingId
      ? `/api/admin/perfumes/${editingId}`
      : "/api/admin/perfumes";
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save perfume");
      }

      if (editingId) {
        // update in state
        setPerfumes(prev =>
          prev.map(p => (p.id === editingId ? mapApiPerfume(data) : p))
        );
        setMessage("Perfume updated.");
      } else {
        // add to top
        setPerfumes(prev => [mapApiPerfume(data), ...prev]);
        setMessage("Perfume created.");
      }

      resetForm();
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this perfume?")) return;

    try {
      const res = await fetch(`/api/admin/perfumes/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete perfume");
      }

      setPerfumes(prev => prev.filter(p => p.id !== id));
      if (editingId === id) resetForm();
    } catch (err: any) {
      alert(err.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-8">
      {/* FORM: add / edit */}
      <section className="border border-slate-800 rounded-2xl p-5 bg-black/40 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-slate-400">
              {editingId ? "Edit perfume" : "Add new perfume"}
            </h2>
            {editingId && (
              <p className="text-xs text-slate-500">
                Editing ID: <span className="text-slate-300">{editingId}</span>
              </p>
            )}
          </div>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs px-3 py-1 rounded-2xl border border-slate-700 text-slate-300 hover:border-amberLux hover:text-amberLux transition"
            >
              Cancel edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              rows={3}
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
              <label className="text-xs text-slate-400">
                Image URL (optional)
              </label>
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
            {loading
              ? editingId
                ? "Saving changes..."
                : "Creating..."
              : editingId
              ? "Save changes"
              : "Create perfume"}
          </button>

          {message && (
            <p className="text-xs text-emerald-400 pt-1">{message}</p>
          )}
          {error && <p className="text-xs text-red-400 pt-1">{error}</p>}
        </form>
      </section>

      {/* LISTA PARFEMA */}
      <section className="space-y-3">
        <h2 className="text-sm uppercase tracking-[0.22em] text-slate-400">
          Existing perfumes ({perfumes.length})
        </h2>

        {perfumes.length === 0 && (
          <p className="text-sm text-slate-500">
            Nema parfema još. Dodaj prvi gore u formi.
          </p>
        )}

        <div className="space-y-2">
          {perfumes.map(p => (
            <div
              key={p.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-3 border border-slate-800 rounded-2xl px-4 py-3 bg-black/40"
            >
              <div className="space-y-1">
                <p className="text-sm text-slate-50">
                  {p.name}{" "}
                  <span className="text-[0.7rem] text-slate-500 uppercase tracking-[0.18em]">
                    {p.house}
                  </span>
                </p>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {p.description}
                </p>
                <p className="text-[0.7rem] text-slate-500">
                  {p.vibeTags.join(" • ")}
                </p>
              </div>
              <div className="flex items-center gap-2 md:flex-none">
                <button
                  type="button"
                  onClick={() => startEdit(p)}
                  className="text-xs px-3 py-1 rounded-2xl border border-slate-700 text-slate-200 hover:border-amberLux hover:text-amberLux transition"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  className="text-xs px-3 py-1 rounded-2xl border border-red-800 text-red-300 hover:bg-red-900/40 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function mapApiPerfume(row: any): AdminPerfume {
  return {
    id: row.id,
    name: row.name,
    house: row.house,
    description: row.description ?? "",
    vibeTags: row.vibe_tags ?? [],
    longevity: row.longevity ?? 0,
    sillage: row.sillage ?? 0,
    basePrice: row.base_price ?? 0,
    imageUrl: row.image_url ?? null
  };
}
