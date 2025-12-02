"use client";

import { useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Ovo se učitava globalno (u layoutu).
 * Kad se vratiš s Google OAuth-a, Supabase ovdje pročita hash iz URL-a
 * i spremi session u localStorage, tako da ga kasnije getUser() vidi.
 */
export default function SupabaseSessionInitializer() {
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    supabase.auth.getSession().catch(err => {
      console.error("Supabase session init error:", err);
    });
  }, []);

  return null;
}
