import "./globals.css";
import SmartHeader from "@/components/SmartHeader";
import SupabaseSessionInitializer from "@/components/auth/SupabaseSessionInitializer";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ink text-slate-50">
        {/* Ovo se mounta na SVAKOJ stranici i hvata OAuth callback */}
        <SupabaseSessionInitializer />
        <SmartHeader />
        {children}
      </body>
    </html>
  );
}
