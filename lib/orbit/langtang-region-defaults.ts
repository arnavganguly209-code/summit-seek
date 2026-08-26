import type { DestinationRegionContent } from "@/types/destination-region-cms";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEFAULT_LANGTANG_REGION: DestinationRegionContent = {
  coverImageUrl: img("photo-1464822759023-fed622ff2c3b", 2200),
  coverTitle: "Langtang Region",
  coverSubtitle:
    "Alpine valleys close to Kathmandu — Langtang Valley, sacred Gosainkunda, Helambu forests, and Tamang Heritage trails.",
  eyebrow: "Destinations",
  heading: "Langtang Region",
  intro:
    "Just north of Kathmandu, Langtang offers glacier views, sacred lakes, and Tamang culture without the Everest crowds. Summit Seek guides every journey with clear pricing and flexible private departures.",
  packagesHeading: "Featured Langtang Packages",
  packages: [
    {
      id: "ltr-1",
      title: "Langtang Valley",
      durationDays: 10,
      rating: 5,
      reviewCount: 14,
      startLocation: "Kathmandu",
      price: 580,
      compareAtPrice: 595,
      href: "/treks/langtang-valley",
      imageUrl: img("photo-1464822759023-fed622ff2c3b"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "ltr-2",
      title: "Gosainkunda",
      durationDays: 8,
      rating: 5,
      reviewCount: 9,
      startLocation: "Kathmandu",
      price: 425,
      compareAtPrice: 490,
      href: "/treks/gosainkunda",
      imageUrl: img("photo-1506905925346-21bda4d32df4"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "ltr-3",
      title: "Helambu",
      durationDays: 7,
      rating: 5,
      reviewCount: 7,
      startLocation: "Kathmandu",
      price: 555,
      compareAtPrice: 600,
      href: "/treks/helambu",
      imageUrl: img("photo-1483728642387-6c3bdd6c93e5"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "ltr-4",
      title: "Tamang Heritage",
      durationDays: 11,
      rating: 5,
      reviewCount: 6,
      startLocation: "Kathmandu",
      price: 820,
      compareAtPrice: 920,
      href: "/treks/tamang-heritage",
      imageUrl: img("photo-1544735716-392fe2489ffa"),
      ctaLabel: "Trip Details",
      visible: true,
    },
  ],
  metaTitle: "Langtang Region Treks | Summit Seek",
  metaDescription:
    "Explore Langtang Valley, Gosainkunda, Helambu, and Tamang Heritage treks with Summit Seek — expert guides and transparent pricing.",
};
