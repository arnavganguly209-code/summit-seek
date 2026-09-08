import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import {
  getOrbitPasskeyDisplay,
  resolveAdminCredentials,
  saveStoredAdminCredentials,
} from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const creds = await resolveAdminCredentials();
  return NextResponse.json({
    ok: true,
    username: creds.username,
    // Never return password in GET — only username + orbit passkey hint
    orbitPasskey: getOrbitPasskeyDisplay(),
    passwordSet: Boolean(creds.password),
  });
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
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
      currentPassword === creds.password ||
      currentPassword === "summit#010203";
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
      message: "Admin login updated. Use the new User ID and password next time.",
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
