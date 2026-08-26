import type { DestinationRegionContent } from "@/types/destination-region-cms";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEFAULT_MANASLU_REGION: DestinationRegionContent = {
  coverImageUrl: img("photo-1486870591958-9b9d0d1dda99", 2200),
  coverTitle: "Manaslu Region",
  coverSubtitle:
    "Restricted-area circuits around the eighth-highest peak — Manaslu Circuit, Tsum Valley, and the high Rupina La pass.",
  eyebrow: "Destinations",
  heading: "Manaslu Region Treks",
  intro:
    "Choose from four carefully curated Manaslu adventures — the classic Circuit, combined Tsum Valley, a dedicated Tsum Valley trek, and the remote Rupina La crossing. Each package is led by licensed guides with transparent pricing and flexible private departures.",
  packagesHeading: "Featured Manaslu Packages",
  packages: [
    {
      id: "mnr-1",
      title: "Manaslu Circuit Trek – 14 Days",
      durationDays: 14,
      rating: 5,
      reviewCount: 16,
      startLocation: "Kathmandu",
      price: 925,
      compareAtPrice: 1175,
      href: "/treks/manaslu-circuit",
      imageUrl: img("photo-1506905925346-21bda4d32df4"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "mnr-2",
      title: "Manaslu Tsum Valley Trek – 21 Days",
      durationDays: 21,
      rating: 5,
      reviewCount: 9,
      startLocation: "Kathmandu",
      price: 2150,
      compareAtPrice: 2750,
      href: "/treks/manaslu-tsum",
      imageUrl: img("photo-1544735716-392fe2489ffa"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "mnr-3",
      title: "Tsum Valley Trek – 17 Days",
      durationDays: 17,
      rating: 5,
      reviewCount: 7,
      startLocation: "Kathmandu",
      price: 1290,
      compareAtPrice: 1590,
      href: "/treks/tsum-valley",
      imageUrl: img("photo-1464822759023-fed622ff2c3b"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "mnr-4",
      title: "Rupina La Trek – 18 Days",
      durationDays: 18,
      rating: 5,
      reviewCount: 5,
      startLocation: "Kathmandu",
      price: 1390,
      compareAtPrice: 1690,
      href: "/treks/rupina-la",
      imageUrl: img("photo-1483728642387-6c3bdd6c93e5"),
      ctaLabel: "Trip Details",
      visible: true,
    },
  ],
  metaTitle: "Manaslu Region Treks | Summit Seek",
  metaDescription:
    "Explore Manaslu Circuit, Manaslu Tsum Valley, Tsum Valley, and Rupina La treks with Summit Seek — expert guides, clear pricing, and Himalayan hospitality.",
};
