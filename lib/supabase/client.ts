// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

// Jedini browser Supabase klijent koji koristimo u appu
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
