import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getContactContent, saveContactContent } from "@/lib/orbit/store";
import type { ContactPageContent } from "@/types/contact-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getContactContent());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as ContactPageContent;
    if (!body.coverTitle?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Cover title, email, and phone are required." },
        { status: 400 },
      );
    }
    await saveContactContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save contact page." }, { status: 500 });
  }
}
