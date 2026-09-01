import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import {
  isLinkablePackageHref,
  normalizePackageHref,
} from "@/lib/orbit/package-content-by-href";
import { getDayToursListing, saveDayToursListing } from "@/lib/orbit/store";
import type { DayToursListingContent } from "@/types/day-tours-listing";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getDayToursListing());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as DayToursListingContent;
    if (!body.heading?.trim()) {
      return NextResponse.json({ ok: false, error: "Heading is required." }, { status: 400 });
    }
    if (!Array.isArray(body.packages) || body.packages.length === 0) {
      return NextResponse.json(
        { ok: false, error: "At least one package link is required." },
        { status: 400 },
      );
    }
    for (const pkg of body.packages) {
      pkg.href = normalizePackageHref(pkg.href || "");
      if (!pkg.href || !isLinkablePackageHref(pkg.href)) {
        return NextResponse.json(
          { ok: false, error: "Each package must link to a live tour page." },
          { status: 400 },
        );
      }
    }
    await saveDayToursListing(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save day tours listing." }, { status: 500 });
  }
}
