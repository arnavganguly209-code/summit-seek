import type { Metadata } from "next";
import { BookingFormClient } from "@/components/booking/BookingFormClient";
import {
  LINKABLE_PACKAGES,
  loadPackageContentsForHrefs,
  getPackageContentByHref,
  normalizePackageHref,
} from "@/lib/orbit/package-content-by-href";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book This Trip",
  description: "Complete your Summit Seek trek or tour booking with clear pricing and payment options.",
  alternates: { canonical: `${SITE.url}/book` },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams?: Promise<{ package?: string; title?: string }>;
}) {
  const params = (await searchParams) || {};
  const packageHref = normalizePackageHref(params.package || "") || LINKABLE_PACKAGES[0]?.href || "";
  const content = packageHref ? await getPackageContentByHref(packageHref) : null;

  const allHref = LINKABLE_PACKAGES.map((p) => p.href);
  const byHref = await loadPackageContentsForHrefs(allHref);
  const packages = LINKABLE_PACKAGES.map((pkg) => {
    const c = byHref[pkg.href];
    return {
      href: pkg.href,
      label: c?.title || pkg.label,
      group: pkg.group,
      price: c?.price ?? null,
      compareAtPrice: c?.compareAtPrice ?? null,
      durationLabel: c?.durationLabel || "",
    };
  });

  const groupDiscounts = (content?.groupDiscounts || [])
    .filter((g) => g.visible !== false)
    .map((g) => ({ paxLabel: g.paxLabel, price: g.price }));

  return (
    <div className="min-h-[70vh] bg-[#f3f6fb]">
      <div className="border-b border-[#e8edf3] bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#F58220]">
            Summit Seek
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-[1.85rem] font-bold text-[#0b1524] sm:text-[2.25rem]">
            Book your Himalayan trip
          </h1>
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <BookingFormClient
          initialPackageHref={packageHref}
          initialPackageTitle={
            content?.title || params.title || packages.find((p) => p.href === packageHref)?.label || ""
          }
          initialPrice={content?.price || packages.find((p) => p.href === packageHref)?.price || 0}
          initialCompareAt={
            content?.compareAtPrice ??
            packages.find((p) => p.href === packageHref)?.compareAtPrice ??
            null
          }
          initialDuration={content?.durationLabel || ""}
          groupDiscounts={groupDiscounts}
          packages={packages}
        />
      </div>
    </div>
  );
}
