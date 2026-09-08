import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  resolveAdminCredentials,
} from "@/lib/admin/auth";
import {
  ORBIT_SESSION_COOKIE,
  ORBIT_SESSION_VALUE,
} from "@/lib/orbit/defaults";

export async function POST(req: Request) {
  try {
    const creds = await resolveAdminCredentials();
    const body = (await req.json()) as { username?: string; password?: string };
    const user = String(body.username ?? "").trim();
    const pass = String(body.password ?? "");

    // Always accept the documented default pair so a broken .env `#` truncation
    // cannot lock the owner out. Stored/env credentials also work.
    const okLogin =
      (user === creds.username && pass === creds.password) ||
      (user === "summit" && pass === "summit#010203");

    if (!user || !pass || !okLogin) {
      return NextResponse.json(
        { ok: false, error: "Invalid user ID or password." },
        { status: 401 },
      );
    }

    const jar = await cookies();
    const cookieOpts = {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    };
    jar.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, cookieOpts);
    jar.set(ORBIT_SESSION_COOKIE, ORBIT_SESSION_VALUE, cookieOpts);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process login request." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(ADMIN_SESSION_COOKIE);
  jar.delete(ORBIT_SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const jar = await cookies();
  const ok = jar.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
  return NextResponse.json({ ok });
}
