// app/layout.tsx
import "./globals.css";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import SmartHeader from "@/components/SmartHeader";

export const metadata = {
  title: "Parfemi",
  description: "Perfume discovery platform",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // SERVER-SIDE SESSION — jedini ispravni način
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        {/* Inject session to client via context */}
        <SmartHeader serverSession={session} />
        {children}
      </body>
    </html>
  );
}
