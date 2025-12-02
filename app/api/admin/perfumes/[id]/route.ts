// app/api/admin/perfumes/[id]/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

type Params = {
  params: { id: string };
};

export async function PATCH(req: Request, { params }: Params) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const {
    name,
    house,
    description,
    vibeTags,
    longevity,
    sillage,
    basePrice,
    imageUrl
  } = body;

  const update: any = {};

  if (name !== undefined) update.name = name;
  if (house !== undefined) update.house = house;
  if (description !== undefined) update.description = description;
  if (vibeTags !== undefined) {
    update.vibe_tags = Array.isArray(vibeTags)
      ? vibeTags
      : String(vibeTags ?? "")
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean);
  }
  if (longevity !== undefined) update.longevity = Number(longevity) || 0;
  if (sillage !== undefined) update.sillage = Number(sillage) || 0;
  if (basePrice !== undefined) update.base_price = Number(basePrice) || 0;
  if (imageUrl !== undefined) update.image_url = imageUrl || null;

  const { data, error } = await supabase
    .from("perfumes")
    .update(update)
    .eq("id", params.id)
    .select(
      `
      id,
      name,
      house,
      description,
      vibe_tags,
      longevity,
      sillage,
      base_price,
      image_url
    `
    )
    .single();

  if (error) {
    console.error("Error updating perfume:", error);
    return NextResponse.json(
      { error: "Failed to update perfume" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: Params) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error } = await supabase
    .from("perfumes")
    .delete()
    .eq("id", params.id);

  if (error) {
    console.error("Error deleting perfume:", error);
    return NextResponse.json(
      { error: "Failed to delete perfume" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
