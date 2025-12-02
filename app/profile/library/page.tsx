"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type DebugState =
  | { loading: true; user: null; error: null }
  | { loading: false; user: any | null; error: string | null };

export default function LibraryPage() {
  const supabase = createSupabaseBrowserClient();
  const [state, setState] = useState<DebugState>({
    loading: true,
    user: null,
    error: null
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.error("getUser error:", error);
          setState({
            loading: false,
            user: null,
            error: error.message || "Unknown error"
          });
          return;
        }

        setState({
          loading: false,
          user: data.user,
          error: null
        });
      } catch (e: any) {
        console.error("Unexpected error in LibraryPage:", e);
        setState({
          loading: false,
          user: null,
          error: e?.message || "Unexpected error"
        });
      }
    };

    load();
  }, [supabase]);

  if (state.loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-sm text-slate-400">Loading auth state…</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-2xl font-light text-slate-50">
        Your perfume library (DEBUG)
      </h1>

      {state.error && (
        <p className="text-sm text-red-400">
          getUser error: {state.error}
        </p>
      )}

      {state.user ? (
        <>
          <p className="text-sm text-emerald-400">
            ✅ Supabase vidi usera.
          </p>
          <p className="text-sm text-slate-200">
            User email: <span className="text-amberLux">{state.user.email}</span>
          </p>
          <pre className="text-[0.7rem] text-slate-400 bg-black/40 border border-slate-800 rounded-lg p-3 max-h-64 overflow-auto">
            {JSON.stringify(state.user, null, 2)}
          </pre>
          <p className="text-xs text-slate-500">
            Kad ovo proradi, vratit ćemo se na normalan prikaz libraryja.
          </p>
        </>
      ) : (
        <>
          <p className="text-sm text-red-400">
            ⚠️ Supabase kaže da NEMA usera (user === null).
          </p>
          <p className="text-sm text-slate-400">
            To znači da login (Google/email) nije kreirao session koji browser
            vidi.
          </p>
          <p className="text-sm text-slate-400">
            Pokušaj prvo:
            <br />– idi na{" "}
            <Link href="/login" className="text-amberLux underline">
              /login
            </Link>{" "}
            i ulogiraj se (Google ili email),
            <br />– onda se vrati na My Library i refreshaj.
          </p>
        </>
      )}
    </main>
  );
}
