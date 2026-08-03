import type { Metadata } from "next";
import { BestSellingPackagesSection } from "@/components/home/BestSellingPackages";
import { getBestSellingPackages } from "@/lib/orbit/store";
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

export default async function PackagesPage() {
  const content = await getBestSellingPackages();

  return (
    <div className="min-h-[70vh] bg-[#f7f8fb]">
      <div className="border-b border-[#e8edf3] bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <p className="font-[family-name:var(--font-ui)] text-[12px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Summit Seek
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-[2rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.5rem]">
            All Packages
          </h1>
          <p className="mt-3 max-w-2xl font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
            Explore our full collection of Himalayan treks, peak climbs, and curated
            journeys — professionally guided from Kathmandu.
          </p>
        </div>
      </div>
      <BestSellingPackagesSection
        content={{ ...content, visible: true }}
        mode="all"
      />
    </div>
  );
}
