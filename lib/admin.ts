// lib/admin.ts
const raw = process.env.ADMIN_EMAILS ?? "";

const ADMIN_EMAILS = raw
  .split(",")
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
