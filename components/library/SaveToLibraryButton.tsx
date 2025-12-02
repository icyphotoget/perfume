"use client";

import { useEffect, useState } from "react";
import SaveToLibraryModal from "./SaveToLibraryModal";
import {
  getCollectionsContainingPerfume,
  isPerfumeInAnyCollection
} from "@/lib/library";

type Props = {
  perfumeId: string;
  perfumeName?: string;
  className?: string;
};

export default function SaveToLibraryButton({
  perfumeId,
  perfumeName,
  className
}: Props) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // only run on client
    if (typeof window === "undefined") return;
    setSaved(isPerfumeInAnyCollection(perfumeId));
  }, [perfumeId]);

  // refresh saved state when modal closes
  function handleClose() {
    setOpen(false);
    if (typeof window === "undefined") return;
    setSaved(isPerfumeInAnyCollection(perfumeId));
  }

  const label = saved ? "Saved to Library" : "Save to Library";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          className ??
          `inline-flex items-center gap-2 rounded-3xl border px-4 py-2 text-xs md:text-sm transition
          ${
            saved
              ? "border-amberLux bg-amberLux/10 text-amberLux"
              : "border-slate-600 bg-black/40 text-slate-100 hover:border-amberLux hover:text-amberLux"
          }`
        }
      >
        <span className="text-sm">{saved ? "★" : "☆"}</span>
        <span>{label}</span>
      </button>

      <SaveToLibraryModal
        open={open}
        onClose={handleClose}
        perfumeId={perfumeId}
        perfumeName={perfumeName}
      />
    </>
  );
}
