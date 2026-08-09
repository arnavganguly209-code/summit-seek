import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import {
  getPackingChecklistContent,
  savePackingChecklistContent,
} from "@/lib/orbit/store";
import type { PackingChecklistContent } from "@/types/packing-checklist-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPackingChecklistContent());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as PackingChecklistContent;
    if (!body.coverTitle?.trim() || !body.introHeading?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Cover title and intro heading are required." },
        { status: 400 },
      );
    }
    await savePackingChecklistContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save Packing Checklist page." },
      { status: 500 },
    );
  }
}
