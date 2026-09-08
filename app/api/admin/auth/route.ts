import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  getAdminPassword,
  getAdminUsername,
} from "@/lib/admin/auth";
import {
  ORBIT_SESSION_COOKIE,
  ORBIT_SESSION_VALUE,
} from "@/lib/orbit/defaults";

export async function POST(req: Request) {
  try {
    const username = getAdminUsername();
    const password = getAdminPassword();
    if (!password) {
      return NextResponse.json(
        { ok: false, error: "Admin password is not configured on the server." },
        { status: 500 },
      );
    }

    const body = (await req.json()) as { username?: string; password?: string };
    const user = String(body.username ?? "").trim();
    const pass = String(body.password ?? "");

    if (!user || !pass || user !== username || pass !== password) {
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
    // Also unlock Orbit editors for the same session
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
