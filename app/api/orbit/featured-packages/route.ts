import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import {
  getFeaturedPackages,
  saveFeaturedPackages,
} from "@/lib/orbit/store";
import type { FeaturedPackagesContent } from "@/types/featured-packages";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getFeaturedPackages();
  return NextResponse.json(content);
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as FeaturedPackagesContent;
    if (!Array.isArray(body.categories) || body.categories.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Categories are required." },
        { status: 400 },
      );
    }

    for (const cat of body.categories) {
      if (!cat.id?.trim() || !cat.label?.trim()) {
        return NextResponse.json(
          { ok: false, error: "Each category needs an id and label." },
          { status: 400 },
        );
      }
      if (!Array.isArray(cat.packages) || cat.packages.length !== 4) {
        return NextResponse.json(
          { ok: false, error: `Category "${cat.label}" must have exactly 4 packages.` },
          { status: 400 },
        );
      }
      for (const pkg of cat.packages) {
        pkg.durationDays = Number(pkg.durationDays) || 1;
        pkg.price = Number(pkg.price) || 0;
        pkg.rating = Number(pkg.rating) || 0;
        pkg.reviewCount = Number(pkg.reviewCount) || 0;
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
        if (typeof pkg.price !== "number" || Number.isNaN(pkg.price) || pkg.price < 0) {
          return NextResponse.json(
            { ok: false, error: `Invalid price for "${pkg.title}".` },
            { status: 400 },
          );
        }
      }
    }

    await saveFeaturedPackages(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save featured packages." },
      { status: 500 },
    );
  }
}
