import { cookies } from "next/headers";
import { prisma } from "@/lib/orbit/db";

export const ADMIN_SESSION_COOKIE = "summit_admin_session";
export const ADMIN_SESSION_VALUE = "summit_admin_v1";

export type AdminCredentials = {
  username: string;
  password: string;
};

const CREDENTIALS_KEY = "admin-credentials";

/** Strip accidental env comment truncation and wrapping quotes. */
export function cleanSecret(value: string | undefined | null): string {
  if (!value) return "";
  let v = value.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  return v.trim();
}

export function getEnvAdminUsername(): string {
  return cleanSecret(process.env.ADMIN_USERNAME) || "summit";
}

export function getEnvAdminPassword(): string {
  return cleanSecret(process.env.ADMIN_PASSWORD) || "summit#010203";
}

export async function getStoredAdminCredentials(): Promise<AdminCredentials | null> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { key: CREDENTIALS_KEY } });
    if (!row?.content || typeof row.content !== "object") return null;
    const data = row.content as Record<string, unknown>;
    const username = cleanSecret(String(data.username ?? ""));
    const password = cleanSecret(String(data.password ?? ""));
    if (!username || !password) return null;
    return { username, password };
  } catch {
    return null;
  }
}

export async function saveStoredAdminCredentials(
  creds: AdminCredentials,
): Promise<void> {
  const username = cleanSecret(creds.username);
  const password = cleanSecret(creds.password);
  if (!username || !password) {
    throw new Error("Username and password are required.");
  }
  await prisma.siteContent.upsert({
    where: { key: CREDENTIALS_KEY },
    create: {
      key: CREDENTIALS_KEY,
      content: { username, password },
    },
    update: {
      content: { username, password },
    },
  });
}

export async function resolveAdminCredentials(): Promise<AdminCredentials> {
  const stored = await getStoredAdminCredentials();
  if (stored) return stored;
  return {
    username: getEnvAdminUsername(),
    password: getEnvAdminPassword(),
  };
}

/** @deprecated use resolveAdminCredentials */
export function getAdminUsername(): string {
  return getEnvAdminUsername();
}

/** @deprecated use resolveAdminCredentials */
export function getAdminPassword(): string {
  return getEnvAdminPassword();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
}

export function getOrbitPasskeyDisplay(): string {
  const value = cleanSecret(process.env.ORBIT_PASSKEY);
  return value || "713304977";
}
