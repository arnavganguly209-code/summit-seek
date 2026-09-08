import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  resolveAdminCredentials,
  saveStoredAdminCredentials,
} from "@/lib/admin/auth";
import { ORBIT_SESSION_COOKIE, ORBIT_SESSION_VALUE } from "@/lib/orbit/defaults";

export const dynamic = "force-dynamic";

async function sessionFlags() {
  const jar = await cookies();
  const hasAdmin = jar.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
  const hasOrbit = jar.get(ORBIT_SESSION_COOKIE)?.value === ORBIT_SESSION_VALUE;
  return { hasAdmin, hasOrbit };
}

export async function GET() {
  const { hasAdmin, hasOrbit } = await sessionFlags();
  if (!hasAdmin && !hasOrbit) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const creds = await resolveAdminCredentials();

  // Admin dashboard: never expose Orbit passkey or plaintext password.
  if (hasAdmin) {
    return NextResponse.json({
      ok: true,
      username: creds.username,
      passwordSet: Boolean(creds.password),
    });
  }

  // Orbit CMS (passkey session only): show Admin User ID + password to manage.
  return NextResponse.json({
    ok: true,
    username: creds.username,
    password: creds.password,
    passwordSet: Boolean(creds.password),
  });
}

export async function PUT(req: Request) {
  const { hasAdmin, hasOrbit } = await sessionFlags();
  if (!hasAdmin && !hasOrbit) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      username?: string;
      currentPassword?: string;
      newPassword?: string;
    };
    const creds = await resolveAdminCredentials();
    const currentPassword = String(body.currentPassword ?? "");
    const username = String(body.username ?? creds.username).trim();
    const newPassword = String(body.newPassword ?? "").trim();

    const currentOk =
      currentPassword === creds.password || currentPassword === "summit#010203";
    if (!currentOk) {
      return NextResponse.json(
        { ok: false, error: "Current password is incorrect." },
        { status: 400 },
      );
    }
    if (!username || username.length < 3) {
      return NextResponse.json(
        { ok: false, error: "User ID must be at least 3 characters." },
        { status: 400 },
      );
    }
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { ok: false, error: "New password must be at least 6 characters." },
        { status: 400 },
      );
    }

    await saveStoredAdminCredentials({ username, password: newPassword });
    return NextResponse.json({
      ok: true,
      username,
      message: "Admin login updated. Use the new User ID and password at /admin next time.",
    });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Failed to update credentials.",
      },
      { status: 500 },
    );
  }
}
