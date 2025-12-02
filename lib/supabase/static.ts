// lib/supabase/static.ts
import { createClient } from "@supabase/supabase-js";

// Ovdje možeš dodati i tip Database ako ga imaš generiranog, za sada any
// import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase env vars");
}

// ✅ ovaj client NE koristi cookies, siguran je za build / SSG
export const supabaseStatic = createClient(
  supabaseUrl,
  supabaseAnonKey
  // <Database>  // ako imaš tip
);
