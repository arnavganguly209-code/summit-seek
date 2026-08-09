import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getWhySummitSeekContent, saveWhySummitSeekContent } from "@/lib/orbit/store";
import type { WhySummitSeekContent } from "@/types/why-summit-seek-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getWhySummitSeekContent());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as WhySummitSeekContent;
    if (!body.coverTitle?.trim() || !body.introHeading?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Cover title and intro heading are required." },
        { status: 400 },
      );
    }
    await saveWhySummitSeekContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save Why Summit Seek page." },
      { status: 500 },
    );
  }
}
