import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getLangtangRegionContent, saveLangtangRegionContent } from "@/lib/orbit/store";
import type { DestinationRegionContent } from "@/types/destination-region-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getLangtangRegionContent());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as DestinationRegionContent;
    if (!body.coverTitle?.trim() || !body.heading?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Cover title and heading are required." },
        { status: 400 },
      );
    }
    await saveLangtangRegionContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save Langtang Region page." },
      { status: 500 },
    );
  }
}
