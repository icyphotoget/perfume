import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

export async function GET() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();

  // ako nema usera → guest
  if (error || !data.user) {
    return NextResponse.json(
      { user: null },
      { status: 404 }
    );
  }

  const user = data.user;

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      isAdmin: isAdminEmail(user.email),
    },
  });
}
