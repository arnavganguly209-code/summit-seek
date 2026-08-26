import type { DestinationRegionContent } from "@/types/destination-region-cms";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEFAULT_MUSTANG_REGION: DestinationRegionContent = {
  coverImageUrl: img("photo-1483728642387-6c3bdd6c93e5", 2200),
  coverTitle: "Mustang Region",
  coverSubtitle:
    "Ancient kingdoms beyond the Annapurna range — Upper Mustang, Lo Manthang, and jeep journeys through wind-sculpted cliffs.",
  eyebrow: "Destinations",
  heading: "Mustang Region Treks",
  intro:
    "Choose from four carefully curated Mustang adventures — the classic Upper Mustang trek, a shorter Lower Mustang trail, the Lo Manthang journey, and a scenic jeep tour. Each package is led by licensed guides with transparent pricing and flexible private departures.",
  packagesHeading: "Featured Mustang Packages",
  packages: [
    {
      id: "msr-1",
      title: "Upper Mustang Trek – 14 Days",
      durationDays: 14,
      rating: 5,
      reviewCount: 18,
      startLocation: "Pokhara",
      price: 1795,
      compareAtPrice: 2150,
      href: "/treks/upper-mustang",
      imageUrl: img("photo-1483728642387-6c3bdd6c93e5"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "msr-2",
      title: "Lower Mustang Trek – 8 Days",
      durationDays: 8,
      rating: 5,
      reviewCount: 11,
      startLocation: "Pokhara",
      price: 645,
      compareAtPrice: 799,
      href: "/treks/lower-mustang",
      imageUrl: img("photo-1585409677983-0f6c41ca9c3b"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "msr-3",
      title: "Lo Manthang Trek – 12 Days",
      durationDays: 12,
      rating: 5,
      reviewCount: 8,
      startLocation: "Pokhara",
      price: 1490,
      compareAtPrice: 1790,
      href: "/treks/lo-manthang",
      imageUrl: img("photo-1464822759023-fed622ff2c3b"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "msr-4",
      title: "Mustang Jeep Tour – 7 Days",
      durationDays: 7,
      rating: 5,
      reviewCount: 6,
      startLocation: "Pokhara",
      price: 990,
      compareAtPrice: 1290,
      href: "/tours/mustang-jeep",
      imageUrl: img("photo-1506905925346-21bda4d32df4"),
      ctaLabel: "Trip Details",
      visible: true,
    },
  ],
  metaTitle: "Mustang Region Treks | Summit Seek",
  metaDescription:
    "Explore Upper Mustang, Lower Mustang, Lo Manthang, and Mustang Jeep Tour packages with Summit Seek — expert guides, clear pricing, and Himalayan hospitality.",
};
