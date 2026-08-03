import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import {
  getBestSellingPackages,
  saveBestSellingPackages,
} from "@/lib/orbit/store";
import type { BestSellingPackagesContent } from "@/types/best-selling-packages";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getBestSellingPackages();
  return NextResponse.json(content);
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as BestSellingPackagesContent;
    if (!body.heading?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Heading is required." },
        { status: 400 },
      );
    }
    if (!Array.isArray(body.packages)) {
      return NextResponse.json(
        { ok: false, error: "Packages list is required." },
        { status: 400 },
      );
    }

    for (const pkg of body.packages) {
      pkg.price = Number(pkg.price) || 0;
      pkg.durationDays = Number(pkg.durationDays) || 1;
      pkg.reviewCount = Number(pkg.reviewCount) || 0;
      pkg.rating = Number(pkg.rating) || 5;
      if (pkg.compareAtPrice != null) {
        pkg.compareAtPrice = Number(pkg.compareAtPrice) || 0;
      }
      if (!pkg.title?.trim()) {
        return NextResponse.json(
          { ok: false, error: "Every package needs a title." },
          { status: 400 },
        );
      }
      if (!pkg.imageUrl?.trim()) {
        return NextResponse.json(
          { ok: false, error: `Package "${pkg.title}" needs an image.` },
          { status: 400 },
        );
      }
    }

    await saveBestSellingPackages(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save best selling packages." },
      { status: 500 },
    );
  }
}
