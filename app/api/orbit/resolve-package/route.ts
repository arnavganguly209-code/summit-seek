import { NextResponse } from "next/server";
import {
  getPackageContentByHref,
  normalizePackageHref,
  resolvePackageSnapshot,
} from "@/lib/orbit/package-content-by-href";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const href = new URL(req.url).searchParams.get("href")?.trim();
  if (!href) {
    return NextResponse.json({ ok: false, error: "href is required." }, { status: 400 });
  }

  const content = await getPackageContentByHref(href);
  if (!content) {
    return NextResponse.json({ ok: false, error: "Package not found." }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    ...resolvePackageSnapshot(normalizePackageHref(href), content),
  });
}
