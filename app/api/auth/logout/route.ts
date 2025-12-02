// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
