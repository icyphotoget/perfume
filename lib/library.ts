// lib/library.ts

export type LibraryCollection = {
  id: string;
  name: string;
  createdAt: string;
  perfumeIds: string[];
};

const STORAGE_KEY = "parfemi-library-v1";

function isBrowser() {
  return typeof window !== "undefined";
}

function loadCollections(): LibraryCollection[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LibraryCollection[];
  } catch {
    return [];
  }
}

function saveCollections(cols: LibraryCollection[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cols));
}

export function getCollections(): LibraryCollection[] {
  return loadCollections();
}

export function createCollection(name: string): LibraryCollection {
  const cols = loadCollections();
  const newCol: LibraryCollection = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name: name.trim() || "Untitled collection",
    createdAt: new Date().toISOString(),
    perfumeIds: []
  };
  const updated = [...cols, newCol];
  saveCollections(updated);
  return newCol;
}

export function addPerfumeToCollection(collectionId: string, perfumeId: string) {
  const cols = loadCollections();
  const updated = cols.map(col => {
    if (col.id !== collectionId) return col;
    if (col.perfumeIds.includes(perfumeId)) return col;
    return {
      ...col,
      perfumeIds: [...col.perfumeIds, perfumeId]
    };
  });
  saveCollections(updated);
  return updated;
}

export function removePerfumeFromCollection(
  collectionId: string,
  perfumeId: string
) {
  const cols = loadCollections();
  const updated = cols.map(col => {
    if (col.id !== collectionId) return col;
    return {
      ...col,
      perfumeIds: col.perfumeIds.filter(id => id !== perfumeId)
    };
  });
  saveCollections(updated);
  return updated;
}

export function getCollectionsContainingPerfume(
  perfumeId: string
): LibraryCollection[] {
  const cols = loadCollections();
  return cols.filter(col => col.perfumeIds.includes(perfumeId));
}

export function isPerfumeInAnyCollection(perfumeId: string): boolean {
  const cols = loadCollections();
  return cols.some(col => col.perfumeIds.includes(perfumeId));
}
