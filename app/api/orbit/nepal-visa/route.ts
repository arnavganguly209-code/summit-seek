import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getNepalVisaContent, saveNepalVisaContent } from "@/lib/orbit/store";
import type { NepalVisaContent } from "@/types/nepal-visa-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getNepalVisaContent());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as NepalVisaContent;
    if (!body.coverTitle?.trim() || !body.introHeading?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Cover title and intro heading are required." },
        { status: 400 },
      );
    }
    await saveNepalVisaContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save Nepal Visa page." },
      { status: 500 },
    );
  }
}
