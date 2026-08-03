import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getTravelArticles, saveTravelArticles } from "@/lib/orbit/store";
import type { TravelArticlesContent } from "@/types/travel-articles";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getTravelArticles());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as TravelArticlesContent;
    if (!body.heading?.trim()) {
      return NextResponse.json({ ok: false, error: "Heading is required." }, { status: 400 });
    }
    if (!Array.isArray(body.articles)) {
      return NextResponse.json({ ok: false, error: "Articles are required." }, { status: 400 });
    }
    for (const article of body.articles) {
      if (!article.title?.trim() || !article.imageUrl?.trim()) {
        return NextResponse.json(
          { ok: false, error: "Each article needs a title and image." },
          { status: 400 },
        );
      }
    }
    await saveTravelArticles(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save travel articles." },
      { status: 500 },
    );
  }
}
