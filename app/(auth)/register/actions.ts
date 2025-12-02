"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function registerAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const username = String(formData.get("username") ?? "");

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    console.error("Register error:", error.message);
    redirect(`/register?error=${encodeURIComponent("Registration failed")}`);
  }

  const user = data.user;
  if (user) {
    await supabase.from("profiles").insert({
      id: user.id,
      username
    });
  }

  redirect("/");
}
