import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getHeroContent, saveHeroContent } from "@/lib/orbit/store";
import type { HeroContent } from "@/types/hero";

export async function GET() {
  const content = await getHeroContent();
  return NextResponse.json(content);
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as HeroContent;
    if (!body.headingLine1?.trim() || !body.headingLine2?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Heading lines are required." },
        { status: 400 },
      );
    }
    if (body.overlayOpacity < 0 || body.overlayOpacity > 0.9) {
      return NextResponse.json(
        { ok: false, error: "Overlay darkness must be between 0 and 0.9." },
        { status: 400 },
      );
    }

    await saveHeroContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save hero content." },
      { status: 500 },
    );
  }
}
