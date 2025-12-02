// app/api/admin/perfumes/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

export async function GET() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("perfumes")
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
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading perfumes:", error);
    return NextResponse.json(
      { error: "Failed to load perfumes" },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
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

  if (!name || !house) {
    return NextResponse.json(
      { error: "Name and house are required" },
      { status: 400 }
    );
  }

  const tags = Array.isArray(vibeTags)
    ? vibeTags
    : String(vibeTags ?? "")
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);

  const { data, error } = await supabase
    .from("perfumes")
    .insert({
      name,
      house,
      description: description ?? "",
      vibe_tags: tags,
      longevity: Number(longevity) || 0,
      sillage: Number(sillage) || 0,
      base_price: Number(basePrice) || 0,
      image_url: imageUrl || null
    })
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
    console.error("Error inserting perfume:", error);
    return NextResponse.json(
      { error: "Failed to create perfume" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
