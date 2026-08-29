import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import {
  getJanakpurCityContent,
  saveJanakpurCityContent,
} from "@/lib/orbit/store";
import type { TrekPageContent } from "@/types/trek-page-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getJanakpurCityContent());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as TrekPageContent;
    if (!body.title?.trim() || !body.coverTitle?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Title and cover title are required." },
        { status: 400 },
      );
    }
    await saveJanakpurCityContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save Janakpur City Tour page." },
      { status: 500 },
    );
  }
}
