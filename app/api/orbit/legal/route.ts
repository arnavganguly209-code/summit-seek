import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getLegalContent, saveLegalContent } from "@/lib/orbit/store";
import type { LegalPageContent } from "@/types/legal-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getLegalContent());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as LegalPageContent;
    if (!body.coverTitle?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Cover title is required." },
        { status: 400 },
      );
    }
    await saveLegalContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save legal page." }, { status: 500 });
  }
}
