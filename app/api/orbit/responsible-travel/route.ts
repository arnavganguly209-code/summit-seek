import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import {
  getResponsibleTravelContent,
  saveResponsibleTravelContent,
} from "@/lib/orbit/store";
import type { ResponsibleTravelContent } from "@/types/responsible-travel-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getResponsibleTravelContent());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as ResponsibleTravelContent;
    if (!body.coverTitle?.trim() || !body.introHeading?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Cover title and intro heading are required." },
        { status: 400 },
      );
    }
    await saveResponsibleTravelContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save Responsible Travel page." },
      { status: 500 },
    );
  }
}
