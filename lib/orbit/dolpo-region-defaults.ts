import type { DestinationRegionContent } from "@/types/destination-region-cms";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEFAULT_DOLPO_REGION: DestinationRegionContent = {
  coverImageUrl: img("photo-1506905925346-21bda4d32df4", 2200),
  coverTitle: "Dolpo Region",
  coverSubtitle:
    "Wild highlands and timeless Tibetan culture — Upper Dolpo, Lower Dolpo, Shey Gompa, and turquoise Phoksundo Lake.",
  eyebrow: "Destinations",
  heading: "Dolpo Region Treks",
  intro:
    "Choose from four carefully curated Dolpo adventures — the classic Upper Dolpo circuit, Lower Dolpo, sacred Shey Gompa, and the shorter Phoksundo Lake trek. Each package is led by licensed guides with transparent pricing and flexible private departures.",
  packagesHeading: "Featured Dolpo Packages",
  packages: [
    {
      id: "dlr-1",
      title: "Upper Dolpo Trek – 24 Days",
      durationDays: 24,
      rating: 5,
      reviewCount: 12,
      startLocation: "Kathmandu",
      price: 2890,
      compareAtPrice: 3290,
      href: "/treks/upper-dolpo",
      imageUrl: img("photo-1506905925346-21bda4d32df4"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "dlr-2",
      title: "Lower Dolpo Trek – 18 Days",
      durationDays: 18,
      rating: 5,
      reviewCount: 9,
      startLocation: "Kathmandu",
      price: 2200,
      compareAtPrice: 2490,
      href: "/treks/lower-dolpo",
      imageUrl: img("photo-1486870591958-9b9d0d1dda99"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "dlr-3",
      title: "Shey Gompa Trek – 21 Days",
      durationDays: 21,
      rating: 5,
      reviewCount: 7,
      startLocation: "Kathmandu",
      price: 2490,
      compareAtPrice: 2890,
      href: "/treks/shey-gompa",
      imageUrl: img("photo-1544735716-392fe2489ffa"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "dlr-4",
      title: "Phoksundo Lake Trek – 12 Days",
      durationDays: 12,
      rating: 5,
      reviewCount: 8,
      startLocation: "Kathmandu",
      price: 1390,
      compareAtPrice: 1690,
      href: "/treks/phoksundo",
      imageUrl: img("photo-1464822759023-fed622ff2c3b"),
      ctaLabel: "Trip Details",
      visible: true,
    },
  ],
  metaTitle: "Dolpo Region Treks | Summit Seek",
  metaDescription:
    "Explore Upper Dolpo, Lower Dolpo, Shey Gompa, and Phoksundo Lake treks with Summit Seek — expert guides, clear pricing, and Himalayan hospitality.",
};
