import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "summit_admin_session";
export const ADMIN_SESSION_VALUE = "summit_admin_v1";

export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME?.trim() || "summit";
}

export function getAdminPassword(): string {
  const value = process.env.ADMIN_PASSWORD?.trim();
  if (value) return value;
  // Fallback for local/dev when host env is missing — set ADMIN_PASSWORD in production.
  return "summit#010203";
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
}
