import type { Metadata } from "next";
import { CategoryPackagesGrid } from "@/components/packages/CategoryPackagesGrid";
import {
  getEverestBaseCampHelicopterTourContent,
  getEverestHeliViewContent,
  getMustangHeliVipContent,
} from "@/lib/orbit/store";
import type { FeaturedPackage } from "@/types/featured-packages";
import type { TrekPageContent } from "@/types/trek-page-cms";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Helicopter Tours",
  description:
    "Book Nepal helicopter tours — Everest View trek with heli landing, VIP Mustang charter, and 1-day Everest Base Camp helicopter tour with Summit Seek.",
  alternates: { canonical: `${SITE.url}/helicopter-tours` },
  openGraph: {
    title: `Helicopter Tours | ${SITE.name}`,
    description:
      "Everest heli tours, VIP Mustang helicopter, and EBC helicopter day trips in Nepal.",
    url: `${SITE.url}/helicopter-tours`,
  },
};

function parseDurationDays(label: string, fallback: number): number {
  const match = label.match(/(\d+)/);
  return match ? Number(match[1]) : fallback;
}

function trekToFeaturedPackage(
  trek: TrekPageContent,
  meta: {
    id: string;
    href: string;
    startLocation: string;
    endLocation?: string;
    reviewCount: number;
  },
): FeaturedPackage {
  return {
    id: meta.id,
    title: trek.title,
    durationDays: parseDurationDays(trek.durationLabel, 1),
    rating: trek.rating,
    reviewCount: meta.reviewCount,
    startLocation: meta.startLocation,
    endLocation: meta.endLocation ?? meta.startLocation,
    price: trek.price,
    compareAtPrice: trek.compareAtPrice,
    href: meta.href,
    imageUrl: trek.heroMainImageUrl || trek.coverImageUrl,
    visible: true,
  };
}

const HELICOPTER_TOURS: Array<{
  id: string;
  href: string;
  startLocation: string;
  endLocation?: string;
  reviewCount: number;
}> = [
  {
    id: "ht-1",
    href: "/treks/everest-heli-view",
    startLocation: "Kathmandu",
    reviewCount: 1,
  },
  {
    id: "ht-2",
    href: "/tours/mustang-heli-vip",
    startLocation: "Pokhara",
    reviewCount: 1,
  },
  {
    id: "ht-3",
    href: "/packages/everest-base-camp-helicopter-tour",
    startLocation: "Kathmandu",
    reviewCount: 3,
  },
];

export default async function HelicopterToursPage() {
  const [everestHeliView, mustangHeliVip, ebcHeliTour] = await Promise.all([
    getEverestHeliViewContent(),
    getMustangHeliVipContent(),
    getEverestBaseCampHelicopterTourContent(),
  ]);

  const trekByHref: Record<string, TrekPageContent> = {
    "/treks/everest-heli-view": everestHeliView,
    "/tours/mustang-heli-vip": mustangHeliVip,
    "/packages/everest-base-camp-helicopter-tour": ebcHeliTour,
  };

  const packages = HELICOPTER_TOURS.map((meta) =>
    trekToFeaturedPackage(trekByHref[meta.href], meta),
  );

  return (
    <CategoryPackagesGrid
      heading="Helicopter Tours"
      description="Fly into the Himalayas by helicopter — short Everest heli landings, VIP Upper Mustang charters, and full-day Everest Base Camp aerial circuits with clear pricing and licensed operators."
      packages={packages}
      columns={3}
    />
  );
}
