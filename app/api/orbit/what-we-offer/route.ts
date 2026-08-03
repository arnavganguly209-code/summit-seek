import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getWhatWeOffer, saveWhatWeOffer } from "@/lib/orbit/store";
import type { WhatWeOfferContent } from "@/types/what-we-offer";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getWhatWeOffer());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as WhatWeOfferContent;
    if (!body.heading?.trim()) {
      return NextResponse.json({ ok: false, error: "Heading is required." }, { status: 400 });
    }
    if (!Array.isArray(body.cards)) {
      return NextResponse.json({ ok: false, error: "Cards are required." }, { status: 400 });
    }
    for (const card of body.cards) {
      if (!card.title?.trim() || !card.imageUrl?.trim()) {
        return NextResponse.json(
          { ok: false, error: "Each card needs a title and image." },
          { status: 400 },
        );
      }
    }
    await saveWhatWeOffer(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save What We Offer." }, { status: 500 });
  }
}
