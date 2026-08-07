import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getBlogContent, saveBlogContent } from "@/lib/orbit/store";
import type { BlogPageContent } from "@/types/blog-cms";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getBlogContent());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as BlogPageContent;
    if (!body.coverTitle?.trim()) {
      return NextResponse.json({ ok: false, error: "Cover title is required." }, { status: 400 });
    }
    if (!Array.isArray(body.posts)) {
      return NextResponse.json({ ok: false, error: "Posts are required." }, { status: 400 });
    }
    for (const post of body.posts) {
      if (!post.title?.trim() || !post.slug?.trim() || !post.coverImageUrl?.trim()) {
        return NextResponse.json(
          { ok: false, error: "Each post needs title, slug, and cover image." },
          { status: 400 },
        );
      }
    }
    const slugs = body.posts.map((p) => p.slug.trim().toLowerCase());
    if (new Set(slugs).size !== slugs.length) {
      return NextResponse.json({ ok: false, error: "Post slugs must be unique." }, { status: 400 });
    }
    await saveBlogContent(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save blog." }, { status: 500 });
  }
}
