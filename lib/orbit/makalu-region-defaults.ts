import type { DestinationRegionContent } from "@/types/destination-region-cms";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEFAULT_MAKALU_REGION: DestinationRegionContent = {
  coverImageUrl: img("photo-1544735716-392fe2489ffa", 2200),
  coverTitle: "Makalu Region",
  coverSubtitle:
    "Wild approaches to the fifth-highest mountain — Makalu Base Camp, Barun Valley, Arun Valley, and the high Sherpani Col.",
  eyebrow: "Destinations",
  heading: "Makalu Region Treks",
  intro:
    "Choose from four carefully curated Makalu adventures — the classic Base Camp trek, Makalu Barun Valley, a gentler Arun Valley walk, and the demanding Sherpani Col crossing. Each package is led by licensed guides with transparent pricing and flexible private departures.",
  packagesHeading: "Featured Makalu Packages",
  packages: [
    {
      id: "mkr-1",
      title: "Makalu Base Camp Trek – 20 Days",
      durationDays: 20,
      rating: 5,
      reviewCount: 10,
      startLocation: "Kathmandu",
      price: 2390,
      compareAtPrice: 2790,
      href: "/treks/makalu-bc",
      imageUrl: img("photo-1544735716-392fe2489ffa"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "mkr-2",
      title: "Makalu Barun Valley Trek – 18 Days",
      durationDays: 18,
      rating: 5,
      reviewCount: 7,
      startLocation: "Kathmandu",
      price: 1990,
      compareAtPrice: 2290,
      href: "/treks/makalu-barun",
      imageUrl: img("photo-1464822759023-fed622ff2c3b"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "mkr-3",
      title: "Arun Valley Trek – 12 Days",
      durationDays: 12,
      rating: 5,
      reviewCount: 6,
      startLocation: "Kathmandu",
      price: 1190,
      compareAtPrice: 1490,
      href: "/treks/arun-valley",
      imageUrl: img("photo-1483728642387-6c3bdd6c93e5"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "mkr-4",
      title: "Sherpani Col Trek – 24 Days",
      durationDays: 24,
      rating: 5,
      reviewCount: 5,
      startLocation: "Kathmandu",
      price: 2890,
      compareAtPrice: 3290,
      href: "/treks/sherpani-col",
      imageUrl: img("photo-1486870591958-9b9d0d1dda99"),
      ctaLabel: "Trip Details",
      visible: true,
    },
  ],
  metaTitle: "Makalu Region Treks | Summit Seek",
  metaDescription:
    "Explore Makalu Base Camp, Makalu Barun Valley, Arun Valley, and Sherpani Col treks with Summit Seek — expert guides, clear pricing, and Himalayan hospitality.",
};
