import type { Metadata } from "next";
import Link from "next/link";
import { BestSellingPackagesSection } from "@/components/home/BestSellingPackages";
import { getBestSellingPackages } from "@/lib/orbit/store";
import { LINKABLE_PACKAGES, loadPackageContentsForHrefs } from "@/lib/orbit/package-content-by-href";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Packages",
  description: `Browse Summit Seek’s best selling trekking packages and Himalayan adventures. ${SITE.description}`,
  alternates: { canonical: `${SITE.url}/packages` },
  openGraph: {
    title: `Packages | ${SITE.name}`,
    description: "Best selling trekking packages across Nepal’s Himalaya.",
    url: `${SITE.url}/packages`,
  },
};

export default async function PackagesPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = (await searchParams) || {};
  const q = params.q?.trim().toLowerCase() || "";
  const content = await getBestSellingPackages();

  let searchResults: Array<{ href: string; label: string; price: number | null }> = [];
  if (q) {
    const matches = LINKABLE_PACKAGES.filter((pkg) => {
      const hay = `${pkg.label} ${pkg.href} ${pkg.group}`.toLowerCase();
      return q.split(/\s+/).every((token) => hay.includes(token));
    }).slice(0, 30);
    const byHref = await loadPackageContentsForHrefs(matches.map((m) => m.href));
    searchResults = matches.map((pkg) => ({
      href: pkg.href,
      label: byHref[pkg.href]?.title || pkg.label,
      price: byHref[pkg.href]?.price ?? null,
    }));
  }

  return (
    <div className="min-h-[70vh] bg-[#f7f8fb]">
      <div className="border-b border-[#e8edf3] bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <p className="font-[family-name:var(--font-ui)] text-[12px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Summit Seek
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-[2rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.5rem]">
            {q ? `Search: ${params.q}` : "All Packages"}
          </h1>
          <p className="mt-3 max-w-2xl font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
            {q
              ? `Showing packages related to “${params.q}”.`
              : "Explore our full collection of Himalayan treks, peak climbs, and curated journeys — professionally guided from Kathmandu."}
          </p>
        </div>
      </div>

      {q ? (
        <section className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 lg:px-10">
          {searchResults.length === 0 ? (
            <p className="rounded-2xl border border-[#e8edf3] bg-white px-5 py-8 text-[14px] text-[#5a6577]">
              No packages matched your search.
            </p>
          ) : (
            <ul className="divide-y divide-[#e8edf3] overflow-hidden rounded-2xl border border-[#e8edf3] bg-white">
              {searchResults.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-[#f8fafc]"
                  >
                    <span className="font-[family-name:var(--font-ui)] text-[15px] font-bold text-[#0b1524]">
                      {item.label}
                    </span>
                    {item.price != null ? (
                      <span className="font-[family-name:var(--font-ui)] text-[14px] font-extrabold text-[#16a34a]">
                        US${item.price.toLocaleString("en-US")}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <BestSellingPackagesSection
          content={{ ...content, visible: true }}
          mode="all"
        />
      )}
    </div>
  );
}
