import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getAboutPageContent, saveAboutPageContent } from "@/lib/orbit/store";
import type { AboutPageContent } from "@/types/about-page-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getAboutPageContent());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as AboutPageContent;
    if (!body.coverTitle?.trim() || !body.companyName?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Cover title and company name are required." },
        { status: 400 },
      );
    }
    await saveAboutPageContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save about page." }, { status: 500 });
  }
}
