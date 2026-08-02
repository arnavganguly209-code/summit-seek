import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ORBIT_PASSKEY,
  ORBIT_SESSION_COOKIE,
  ORBIT_SESSION_VALUE,
} from "@/lib/orbit/defaults";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { passkey?: string };
    const passkey = String(body.passkey ?? "").trim();

    if (passkey !== ORBIT_PASSKEY) {
      return NextResponse.json(
        { ok: false, error: "Incorrect passkey. Access denied." },
        { status: 401 },
      );
    }

    const jar = await cookies();
    jar.set(ORBIT_SESSION_COOKIE, ORBIT_SESSION_VALUE, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

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
  jar.delete(ORBIT_SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const jar = await cookies();
  const ok = jar.get(ORBIT_SESSION_COOKIE)?.value === ORBIT_SESSION_VALUE;
  return NextResponse.json({ ok });
}
