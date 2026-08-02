import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getAboutIntro, saveAboutIntro } from "@/lib/orbit/store";
import type { AboutIntroContent } from "@/types/about-intro";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getAboutIntro();
  return NextResponse.json(content);
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as AboutIntroContent;
    if (!body.heading?.trim() || !body.eyebrow?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Eyebrow and heading are required." },
        { status: 400 },
      );
    }
    if (!body.mainImageUrl?.trim() || !body.circleImageUrl?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Main and circle images are required." },
        { status: 400 },
      );
    }
    if (!Array.isArray(body.highlights) || body.highlights.length !== 3) {
      return NextResponse.json(
        { ok: false, error: "Exactly 3 highlight items are required." },
        { status: 400 },
      );
    }

    await saveAboutIntro(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save About section." },
      { status: 500 },
    );
  }
}
