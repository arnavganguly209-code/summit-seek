import type { Metadata } from "next";
import { DestinationRegionView } from "@/components/destinations/DestinationRegionView";
import {
  getBardiyaJungleSafariContent,
  getChitwanJungleSafariContent,
  getChitwanWildlifeLodgeSafariContent,
  getHiddenHimalayasRegionContent,
  getKoshiTappuSafariContent,
} from "@/lib/orbit/store";
import type { DestinationPackage } from "@/types/destination-region-cms";
import type { TrekPageContent } from "@/types/trek-page-cms";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

function parseDurationDays(label: string, fallback: number): number {
  const match = label.match(/(\d+)/);
  return match ? Number(match[1]) : fallback;
}

function mergePackageWithTour(
  pkg: DestinationPackage,
  tour: TrekPageContent | undefined,
): DestinationPackage {
  if (!tour) return pkg;
  return {
    ...pkg,
    title: tour.title || pkg.title,
    price: tour.price ?? pkg.price,
    compareAtPrice: tour.compareAtPrice ?? pkg.compareAtPrice,
    imageUrl: tour.heroMainImageUrl || tour.coverImageUrl || pkg.imageUrl,
    durationDays: parseDurationDays(tour.durationLabel, pkg.durationDays),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHiddenHimalayasRegionContent();
  const title = content.metaTitle || content.heading;
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/destinations/hidden-himalayas` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/destinations/hidden-himalayas`,
      ...(content.coverImageUrl ? { images: [{ url: content.coverImageUrl }] } : {}),
    },
  };
}

export default async function HiddenHimalayasPage() {
  const [content, chitwan, bardiya, koshi, chitwanLodge] = await Promise.all([
    getHiddenHimalayasRegionContent(),
    getChitwanJungleSafariContent(),
    getBardiyaJungleSafariContent(),
    getKoshiTappuSafariContent(),
    getChitwanWildlifeLodgeSafariContent(),
  ]);

  const tourByHref: Record<string, TrekPageContent> = {
    "/tours/chitwan-jungle-safari": chitwan,
    "/tours/bardiya-jungle-safari": bardiya,
    "/tours/koshi-tappu-safari": koshi,
    "/tours/chitwan-wildlife-lodge-safari": chitwanLodge,
  };

  const packages = content.packages
    .filter((pkg) => pkg.visible !== false)
    .map((pkg) => mergePackageWithTour(pkg, tourByHref[pkg.href]));

  return <DestinationRegionView content={{ ...content, packages }} />;
}
