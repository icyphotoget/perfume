"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LibraryCollection,
  getCollections,
  createCollection,
  addPerfumeToCollection,
  removePerfumeFromCollection,
  getCollectionsContainingPerfume
} from "@/lib/library";

type SaveToLibraryModalProps = {
  open: boolean;
  onClose: () => void;
  perfumeId: string;
  perfumeName?: string;
};

export default function SaveToLibraryModal({
  open,
  onClose,
  perfumeId,
  perfumeName
}: SaveToLibraryModalProps) {
  const [collections, setCollections] = useState<LibraryCollection[]>([]);
  const [newName, setNewName] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setCollections(getCollections());
    }
  }, [open]);

  const usedCollections = getCollectionsContainingPerfume(perfumeId).map(
    c => c.id
  );

  function handleToggle(collectionId: string) {
    setBusyId(collectionId);
    const isAlreadyIn = usedCollections.includes(collectionId);

    if (isAlreadyIn) {
      const updated = removePerfumeFromCollection(collectionId, perfumeId);
      setCollections(updated);
    } else {
      const updated = addPerfumeToCollection(collectionId, perfumeId);
      setCollections(updated);
    }

    setBusyId(null);
  }

  function handleCreateCollection() {
    if (!newName.trim()) return;
    const col = createCollection(newName.trim());
    setCollections(prev => [...prev, col]);
    setNewName("");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md mx-4 rounded-3xl bg-ink border border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-5 space-y-4 text-slate-50"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">
                  Save to library
                </p>
                <h2 className="mt-1 text-sm font-light text-slate-100">
                  {perfumeName ?? "This perfume"}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Existing collections */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {collections.length === 0 && (
                <p className="text-[0.75rem] text-slate-400">
                  You don&apos;t have any collections yet. Create your first
                  board below.
                </p>
              )}

              {collections.map(col => {
                const isActive = col.perfumeIds.includes(perfumeId);
                return (
                  <button
                    key={col.id}
                    onClick={() => handleToggle(col.id)}
                    disabled={!!busyId}
                    className={`w-full flex items-center justify-between rounded-2xl border px-3 py-2 text-left text-[0.8rem] transition ${
                      isActive
                        ? "border-amberLux bg-amberLux/10 text-amberLux"
                        : "border-slate-700 bg-slate-900/60 text-slate-100 hover:border-slate-500"
                    }`}
                  >
                    <span className="truncate">{col.name}</span>
                    <span className="text-[0.7rem] text-slate-400 ml-2">
                      {isActive ? "Saved" : "Add"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Create new collection */}
            <div className="pt-2 border-t border-slate-800/70 space-y-2">
              <label className="block text-[0.7rem] text-slate-400 mb-1">
                Create new collection
              </label>
              <div className="flex gap-2">
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Winter rotation, Dark Academia..."
                  className="flex-1 rounded-2xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-[0.8rem] text-slate-100 placeholder:text-slate-500 outline-none focus:border-amberLux"
                />
                <button
                  onClick={handleCreateCollection}
                  className="px-3 py-2 rounded-2xl bg-amberLux text-ink text-[0.75rem] font-medium hover:opacity-90 transition"
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
