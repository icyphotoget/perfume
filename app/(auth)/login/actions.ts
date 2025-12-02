"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("Login error:", error.message);
    // jednostavan način: redirect nazad na login s query paramom
    redirect(`/login?error=${encodeURIComponent("Invalid email or password")}`);
  }

  redirect("/");
}
