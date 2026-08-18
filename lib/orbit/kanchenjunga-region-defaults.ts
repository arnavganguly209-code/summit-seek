import type { DestinationRegionContent } from "@/types/destination-region-cms";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEFAULT_KANCHENJUNGA_REGION: DestinationRegionContent = {
  coverImageUrl: img("photo-1464822759023-fed622ff2c3b", 2200),
  coverTitle: "Kanchenjunga Region",
  coverSubtitle:
    "Expedition trails to the world’s third-highest peak — Circuit, North and South Base Camps, and the classic Base Camp approach.",
  eyebrow: "Destinations",
  heading: "Kanchenjunga Region Treks",
  intro:
    "Choose from four carefully curated Kanchenjunga adventures — the full Circuit, North Base Camp, South Base Camp, and the classic Base Camp trek. Each package is led by licensed guides with transparent pricing and flexible private departures.",
  packagesHeading: "Featured Kanchenjunga Packages",
  packages: [
    {
      id: "kjr-1",
      title: "Kanchenjunga Circuit Trek – 22 Days",
      durationDays: 22,
      rating: 5,
      reviewCount: 11,
      startLocation: "Kathmandu",
      price: 2790,
      compareAtPrice: 3190,
      href: "/treks/kanchenjunga-circuit",
      imageUrl: img("photo-1464822759023-fed622ff2c3b"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "kjr-2",
      title: "North Base Camp Trek – 18 Days",
      durationDays: 18,
      rating: 5,
      reviewCount: 8,
      startLocation: "Kathmandu",
      price: 2190,
      compareAtPrice: 2490,
      href: "/treks/kanchenjunga-north",
      imageUrl: img("photo-1486870591958-9b9d0d1dda99"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "kjr-3",
      title: "South Base Camp Trek – 17 Days",
      durationDays: 17,
      rating: 5,
      reviewCount: 7,
      startLocation: "Kathmandu",
      price: 2090,
      compareAtPrice: 2390,
      href: "/treks/kanchenjunga-south",
      imageUrl: img("photo-1544735716-392fe2489ffa"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "kjr-4",
      title: "Kanchenjunga Base Camp Trek – 22 Days",
      durationDays: 22,
      rating: 5,
      reviewCount: 9,
      startLocation: "Kathmandu",
      price: 2590,
      compareAtPrice: 2990,
      href: "/treks/kanchenjunga-bc",
      imageUrl: img("photo-1506905925346-21bda4d32df4"),
      ctaLabel: "Trip Details",
      visible: true,
    },
  ],
  metaTitle: "Kanchenjunga Region Treks | Summit Seek",
  metaDescription:
    "Explore Kanchenjunga Circuit, North Base Camp, South Base Camp, and Kanchenjunga Base Camp treks with Summit Seek — expert guides, clear pricing, and Himalayan hospitality.",
};
