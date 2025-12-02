"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return { supabase, user };
}

export async function createPerfume(formData: FormData): Promise<void> {
  const { supabase } = await requireUser();

  const name = String(formData.get("name") ?? "").trim();
  const house = String(formData.get("house") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const vibeTagsRaw = String(formData.get("vibeTags") ?? "");
  const longevityRaw = String(formData.get("longevity") ?? "");
  const sillageRaw = String(formData.get("sillage") ?? "");
  const basePriceRaw = String(formData.get("basePrice") ?? "");
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const vibeSlug = String(formData.get("vibeSlug") ?? "").trim();

  if (!name) {
    redirect("/profile/admin/perfumes");
  }

  const vibe_tags = vibeTagsRaw
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);

  const longevity = Number(longevityRaw || 0);
  const sillage = Number(sillageRaw || 0);
  const base_price = Number(basePriceRaw || 0);

  const { error } = await supabase.from("perfumes").insert({
    name,
    house,
    description,
    vibe_tags,
    longevity,
    sillage,
    base_price,
    image_url: imageUrl || null,
    vibe_slug: vibeSlug || null
  });

  if (error) {
    console.error("Error creating perfume:", error);
  }

  redirect("/profile/admin/perfumes");
}

export async function updatePerfume(formData: FormData): Promise<void> {
  const { supabase } = await requireUser();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    redirect("/profile/admin/perfumes");
  }

  const name = String(formData.get("name") ?? "").trim();
  const house = String(formData.get("house") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const vibeTagsRaw = String(formData.get("vibeTags") ?? "");
  const longevityRaw = String(formData.get("longevity") ?? "");
  const sillageRaw = String(formData.get("sillage") ?? "");
  const basePriceRaw = String(formData.get("basePrice") ?? "");
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const vibeSlug = String(formData.get("vibeSlug") ?? "").trim();

  const vibe_tags = vibeTagsRaw
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);

  const longevity = Number(longevityRaw || 0);
  const sillage = Number(sillageRaw || 0);
  const base_price = Number(basePriceRaw || 0);

  const { error } = await supabase
    .from("perfumes")
    .update({
      name,
      house,
      description,
      vibe_tags,
      longevity,
      sillage,
      base_price,
      image_url: imageUrl || null,
      vibe_slug: vibeSlug || null
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating perfume:", error);
  }

  redirect("/profile/admin/perfumes");
}

export async function deletePerfume(formData: FormData): Promise<void> {
  const { supabase } = await requireUser();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    redirect("/profile/admin/perfumes");
  }

  const { error } = await supabase.from("perfumes").delete().eq("id", id);

  if (error) {
    console.error("Error deleting perfume:", error);
  }

  redirect("/profile/admin/perfumes");
}

/**
 * Feature of the week: postavlja JEDAN parfem kao featured
 * - sve ostale postavi na false
 * - ovaj na true
 */
export async function setFeaturedPerfume(
  formData: FormData
): Promise<void> {
  const { supabase } = await requireUser();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    redirect("/profile/admin/perfumes");
  }

  // makni featured sa svih ostalih
  const { error: clearError } = await supabase
    .from("perfumes")
    .update({ is_featured: false })
    .neq("id", id);

  if (clearError) {
    console.error("Error clearing featured flags:", clearError);
  }

  const { error } = await supabase
    .from("perfumes")
    .update({ is_featured: true })
    .eq("id", id);

  if (error) {
    console.error("Error setting featured perfume:", error);
  }

  redirect("/profile/admin/perfumes");
}
