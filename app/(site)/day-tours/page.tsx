import type { Metadata } from "next";
import { CategoryPackagesGrid } from "@/components/packages/CategoryPackagesGrid";
import {
  getBhaktapurCityContent,
  getDayToursListing,
  getJanakpurCityContent,
  getKathmanduCityContent,
  getShivapuriYogaHikeContent,
} from "@/lib/orbit/store";
import type { DayToursPackageLink } from "@/types/day-tours-listing";
import type { FeaturedPackage } from "@/types/featured-packages";
import type { TrekPageContent } from "@/types/trek-page-cms";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

function parseDurationDays(label: string, fallback: number): number {
  const match = label.match(/(\d+)/);
  return match ? Number(match[1]) : fallback;
}

function linkToFeaturedPackage(
  link: DayToursPackageLink,
  tour: TrekPageContent | undefined,
): FeaturedPackage | null {
  if (!tour) return null;
  return {
    id: link.id,
    title: tour.title,
    durationDays: parseDurationDays(tour.durationLabel, 1),
    rating: tour.rating,
    reviewCount: link.reviewCount || tour.reviewCount,
    startLocation: link.startLocation,
    endLocation: link.startLocation,
    price: tour.price,
    compareAtPrice: tour.compareAtPrice,
    href: link.href,
    imageUrl: tour.heroMainImageUrl || tour.coverImageUrl,
    visible: link.visible !== false,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getDayToursListing();
  const title = content.metaTitle || content.heading;
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/day-tours` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/day-tours`,
    },
  };
}

export default async function DayToursPage() {
  const [listing, kathmandu, bhaktapur, shivapuri, janakpur] = await Promise.all([
    getDayToursListing(),
    getKathmanduCityContent(),
    getBhaktapurCityContent(),
    getShivapuriYogaHikeContent(),
    getJanakpurCityContent(),
  ]);

  const tourByHref: Record<string, TrekPageContent> = {
    "/tours/kathmandu-city": kathmandu,
    "/tours/bhaktapur-city": bhaktapur,
    "/tours/shivapuri-yoga-hike": shivapuri,
    "/tours/janakpur-city": janakpur,
  };

  const packages = listing.packages
    .filter((link) => link.visible !== false)
    .map((link) => linkToFeaturedPackage(link, tourByHref[link.href]))
    .filter((pkg): pkg is FeaturedPackage => pkg !== null);

  return (
    <CategoryPackagesGrid
      heading={listing.heading}
      description={listing.description}
      eyebrow={listing.eyebrow}
      packages={packages}
      columns={4}
    />
  );
}
