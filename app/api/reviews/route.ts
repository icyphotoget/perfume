// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const perfumeId = searchParams.get("perfumeId");

  let query = supabase
    .from("reviews")
    .select("*, profiles(username)")
    .order("created_at", { ascending: false });

  if (perfumeId) {
    query = query.eq("perfume_id", perfumeId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { perfume_id, rating, comment } = body;

  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        perfume_id,
        rating,
        comment,
        user_id: authData.user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
