import { NextResponse } from "next/server";
import { LINKABLE_PACKAGES } from "@/lib/orbit/package-content-by-href";
import { loadPackageContentsForHrefs } from "@/lib/orbit/package-content-by-href";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim().toLowerCase() || "";

  const hrefs = LINKABLE_PACKAGES.map((p) => p.href);
  const byHref = await loadPackageContentsForHrefs(hrefs);

  const results = LINKABLE_PACKAGES.map((pkg) => {
    const content = byHref[pkg.href];
    return {
      href: pkg.href,
      label: content?.title || pkg.label,
      group: pkg.group,
      price: content?.price ?? null,
      compareAtPrice: content?.compareAtPrice ?? null,
      durationLabel: content?.durationLabel || "",
      imageUrl: content?.heroMainImageUrl || content?.coverImageUrl || "",
    };
  }).filter((item) => {
    if (!q) return true;
    const hay = `${item.label} ${item.group} ${item.href} ${item.durationLabel}`.toLowerCase();
    return q.split(/\s+/).every((token) => hay.includes(token));
  });

  return NextResponse.json({
    ok: true,
    query: q,
    count: results.length,
    results: q ? results.slice(0, 24) : results.slice(0, 12),
  });
}
