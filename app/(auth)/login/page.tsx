"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // 🔁 Ako je user već logiran → automatski ga makni s /login
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error checking existing session:", error.message);
      }

      if (user) {
        // već si logiran → vodi ga na library (ili home ako želiš)
        router.replace("/profile/library");
      } else {
        setCheckingSession(false);
      }
    };

    checkUser();
  }, [supabase, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoadingEmail(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoadingEmail(false);

    if (error) {
      console.error("Email login error:", error.message);
      setError("Invalid email or password.");
      return;
    }

    // nakon uspješnog logina → na library
    router.push("/profile/library");
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoadingGoogle(true);

    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // vrati se na home; od tamo te možeš kliknut na My Library
        redirectTo: `${origin}/`
      }
    });

    setLoadingGoogle(false);

    if (error) {
      console.error("Google login error:", error.message);
      setError("Google login failed, try again.");
    }
    // Supabase radi redirect na Google i natrag, mi ovdje ne radimo push
  };

  // dok provjeravamo jel već logiran → nemoj pokazivati formu da ne "blinka"
  if (checkingSession) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-slate-950">
        <p className="text-sm text-slate-400">Checking your session…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-slate-950">
      <div className="flex flex-col gap-4 border border-slate-800 bg-slate-950/80 p-6 rounded-2xl w-full max-w-sm shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <div>
          <h1 className="text-xl font-light text-slate-50 mb-1">
            Log in to Parfemi
          </h1>
          <p className="text-xs text-slate-400">
            Use your email password or continue with Google.
          </p>
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 rounded px-3 py-2">
            {error}
          </p>
        )}

        {/* Email / password login */}
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-3">
          <div className="space-y-2">
            <label className="text-[0.7rem] text-slate-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="border border-slate-700 bg-slate-900 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-amberLux"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.7rem] text-slate-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-slate-700 bg-slate-900 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-amberLux"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loadingEmail}
            className="mt-2 w-full rounded-3xl bg-gradient-to-r from-amberLux to-softGold text-ink text-sm font-medium py-2.5 hover:opacity-95 transition shadow-lux-soft disabled:opacity-60"
          >
            {loadingEmail ? "Signing in…" : "Log in"}
          </button>
        </form>

        <div className="flex items-center gap-2 my-1">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-[0.7rem] text-slate-500">or</span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* Google login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loadingGoogle}
          className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 text-slate-100 text-xs font-medium py-2.5 hover:border-amberLux hover:text-amberLux transition flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <span className="text-lg">🟢</span>
          <span>{loadingGoogle ? "Connecting…" : "Continue with Google"}</span>
        </button>

        <p className="text-[0.7rem] text-slate-500 text-center mt-1">
          Don&apos;t have an account? Registration happens automatically
          on first login.
        </p>
      </div>
    </main>
  );
}
