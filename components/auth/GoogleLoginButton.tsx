"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const supabase = createSupabaseBrowserClient();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/`,
        },
      });

      if (error) {
        console.error("Google login error:", error.message);
        alert("Google login failed, try again.");
      }
      // supabase će sam redirectati na Google i natrag
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 text-slate-100 text-xs font-medium py-2.5 hover:border-amberLux hover:text-amberLux transition flex items-center justify-center gap-2 disabled:opacity-60"
    >
      <span className="text-lg">🟢</span>
      <span>{loading ? "Connecting…" : "Continue with Google"}</span>
    </button>
  );
}
