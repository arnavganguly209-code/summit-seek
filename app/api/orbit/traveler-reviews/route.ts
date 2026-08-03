import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getTravelerReviews, saveTravelerReviews } from "@/lib/orbit/store";
import type { TravelerReviewsContent } from "@/types/traveler-reviews";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getTravelerReviews());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as TravelerReviewsContent;
    if (!body.heading?.trim()) {
      return NextResponse.json({ ok: false, error: "Heading is required." }, { status: 400 });
    }
    if (!Array.isArray(body.reviews)) {
      return NextResponse.json({ ok: false, error: "Reviews list is required." }, { status: 400 });
    }
    for (const review of body.reviews) {
      review.rating = Number(review.rating) || 5;
      if (!review.title?.trim() || !review.author?.trim()) {
        return NextResponse.json(
          { ok: false, error: "Each review needs a title and author." },
          { status: 400 },
        );
      }
    }
    await saveTravelerReviews(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save traveler reviews." },
      { status: 500 },
    );
  }
}
