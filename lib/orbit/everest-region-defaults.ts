import type { DestinationRegionContent } from "@/types/destination-region-cms";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEFAULT_EVEREST_REGION: DestinationRegionContent = {
  coverImageUrl: img("photo-1544735716-392fe2489ffa", 2200),
  coverTitle: "Everest Region",
  coverSubtitle:
    "Base camp trails, glacial lakes, and high Himalayan passes beneath the world’s highest peak — guided with Summit Seek care.",
  eyebrow: "Destinations",
  heading: "Everest Region Treks",
  intro:
    "Choose from four carefully curated Everest adventures — from a short scenic trek to full Base Camp, Gokyo Lakes, and the legendary Three Passes circuit. Each package is led by licensed guides with transparent pricing and flexible private departures.",
  packagesHeading: "Featured Everest Packages",
  packages: [
    {
      id: "evr-1",
      title: "Everest Base Camp Trek – 14 Days",
      durationDays: 14,
      rating: 5,
      reviewCount: 28,
      startLocation: "Kathmandu",
      price: 1590,
      compareAtPrice: 1790,
      href: "/treks/everest-base-camp",
      imageUrl: img("photo-1544735716-392fe2489ffa"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "evr-2",
      title: "Everest Three Passes – 18 Days",
      durationDays: 18,
      rating: 5,
      reviewCount: 14,
      startLocation: "Kathmandu",
      price: 1890,
      compareAtPrice: 2090,
      href: "/treks/three-passes",
      imageUrl: img("photo-1486870591958-9b9d0d1dda99", 1600),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "evr-3",
      title: "Gokyo Lakes Trek – 12 Days",
      durationDays: 12,
      rating: 5,
      reviewCount: 11,
      startLocation: "Kathmandu",
      price: 1390,
      compareAtPrice: 1590,
      href: "/treks/gokyo-lakes",
      imageUrl: img("photo-1506905925346-21bda4d32df4"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "evr-4",
      title: "Everest View Trek – 7 Days",
      durationDays: 7,
      rating: 5,
      reviewCount: 9,
      startLocation: "Kathmandu",
      price: 890,
      compareAtPrice: 990,
      href: "/treks/everest-view",
      imageUrl: img("photo-1464822759023-fed622ff2c3b"),
      ctaLabel: "Trip Details",
      visible: true,
    },
  ],
  metaTitle: "Everest Region Treks | Summit Seek",
  metaDescription:
    "Explore Everest Base Camp, Three Passes, Gokyo Lakes, and Everest View treks with Summit Seek — expert guides, clear pricing, and Himalayan hospitality.",
};
