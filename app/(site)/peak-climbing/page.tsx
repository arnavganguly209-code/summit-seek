import type { Metadata } from "next";
import { CategoryPackagesGrid } from "@/components/packages/CategoryPackagesGrid";
import {
  getFeaturedPackages,
  getLobuchePeakContent,
  getMeraPeakContent,
  getPokaldePeakContent,
  getYalaPeakContent,
} from "@/lib/orbit/store";
import type { FeaturedPackage } from "@/types/featured-packages";
import type { TrekPageContent } from "@/types/trek-page-cms";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Peak Climbing",
  description:
    "Book Himalayan peak climbing in Nepal — Yala Peak, Mera Peak, Pokalde Peak, and Lobuche Peak with licensed guides and clear group pricing.",
  alternates: { canonical: `${SITE.url}/peak-climbing` },
  openGraph: {
    title: `Peak Climbing | ${SITE.name}`,
    description:
      "Yala, Mera, Pokalde, and Lobuche peak climbing packages with Summit Seek.",
    url: `${SITE.url}/peak-climbing`,
  },
};

function parseDurationDays(label: string, fallback: number): number {
  const match = label.match(/(\d+)/);
  return match ? Number(match[1]) : fallback;
}

function mergePackageWithTrekPage(
  pkg: FeaturedPackage,
  trek: TrekPageContent | undefined,
): FeaturedPackage {
  if (!trek) return pkg;
  return {
    ...pkg,
    title: trek.title || pkg.title,
    price: trek.price ?? pkg.price,
    compareAtPrice: trek.compareAtPrice ?? pkg.compareAtPrice,
    imageUrl: trek.heroMainImageUrl || trek.coverImageUrl || pkg.imageUrl,
    durationDays: parseDurationDays(trek.durationLabel, pkg.durationDays),
  };
}

export default async function PeakClimbingPage() {
  const [featured, yala, mera, pokalde, lobuche] = await Promise.all([
    getFeaturedPackages(),
    getYalaPeakContent(),
    getMeraPeakContent(),
    getPokaldePeakContent(),
    getLobuchePeakContent(),
  ]);

  const trekByHref: Record<string, TrekPageContent> = {
    "/treks/yala-peak": yala,
    "/treks/mera-peak": mera,
    "/treks/pokalde-peak": pokalde,
    "/treks/lobuche-peak": lobuche,
  };

  const category = featured.categories.find((c) => c.id === "peak-climbing");
  const packages = (category?.packages ?? [])
    .filter((p) => p.visible !== false)
    .map((pkg) => mergePackageWithTrekPage(pkg, trekByHref[pkg.href]));

  return (
    <CategoryPackagesGrid
      heading="Peak Climbing"
      description="Choose from our most popular Himalayan trekking peaks — non-technical and technical summits with licensed climbing guides, teahouse or high-camp logistics, and clear group pricing from Kathmandu."
      packages={packages}
    />
  );
}
