import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getFooterContent, saveFooterContent } from "@/lib/orbit/store";
import type { FooterContent } from "@/types/footer-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getFooterContent());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as FooterContent;
    if (!Array.isArray(body.partners) || !Array.isArray(body.payments)) {
      return NextResponse.json(
        { ok: false, error: "Partners and payments are required." },
        { status: 400 },
      );
    }
    await saveFooterContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save footer." }, { status: 500 });
  }
}
