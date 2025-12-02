// app/api/library/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createSupabaseServerClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("library_items")
    .select(
      `
        id,
        perfume_id,
        created_at,
        perfumes (
          id,
          name,
          house,
          description,
          vibe_tags,
          image_url
        )
      `
    )
    .eq("user_id", authData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching library:", error);
    return NextResponse.json({ error: "Failed to fetch library" }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const perfumeId: string | undefined = body.perfumeId;

  if (!perfumeId) {
    return NextResponse.json({ error: "perfumeId is required" }, { status: 400 });
  }

  // spriječi duplikate
  const { data: existing } = await supabase
    .from("library_items")
    .select("id")
    .eq("user_id", authData.user.id)
    .eq("perfume_id", perfumeId)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ ok: true, alreadySaved: true });
  }

  const { error } = await supabase.from("library_items").insert({
    user_id: authData.user.id,
    perfume_id: perfumeId
  });

  if (error) {
    console.error("Error saving to library:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const supabase = createSupabaseServerClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const perfumeId = searchParams.get("perfumeId");

  if (!perfumeId) {
    return NextResponse.json({ error: "perfumeId is required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("library_items")
    .delete()
    .eq("user_id", authData.user.id)
    .eq("perfume_id", perfumeId);

  if (error) {
    console.error("Error removing from library:", error);
    return NextResponse.json({ error: "Failed to remove" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
