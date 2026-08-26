import type { DestinationRegionContent } from "@/types/destination-region-cms";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEFAULT_ANNAPURNA_REGION: DestinationRegionContent = {
  coverImageUrl: img("photo-1585409677983-0f6c41ca9c3b", 2200),
  coverTitle: "Annapurna Region",
  coverSubtitle:
    "Classic trails beneath Annapurna and Machhapuchhre — Base Camp, Circuit, Mardi Himal, and the iconic Poon Hill sunrise.",
  eyebrow: "Destinations",
  heading: "Annapurna Region Treks",
  intro:
    "From short scenic walks to the classic Circuit, Annapurna offers Nepal’s most loved trekking landscape — rhododendron forests, Gurung villages, and amphitheatre mountain views. Summit Seek guides every journey with clear pricing and flexible private departures.",
  packagesHeading: "Featured Annapurna Packages",
  packages: [
    {
      id: "anr-1",
      title: "Annapurna Base Camp – 11 Days",
      durationDays: 11,
      rating: 5,
      reviewCount: 12,
      startLocation: "Pokhara",
      price: 890,
      compareAtPrice: 990,
      href: "/treks/annapurna-base-camp",
      imageUrl: img("photo-1585409677983-0f6c41ca9c3b"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "anr-2",
      title: "Annapurna Circuit – 16 Days",
      durationDays: 16,
      rating: 5,
      reviewCount: 18,
      startLocation: "Kathmandu",
      price: 1000,
      compareAtPrice: 1100,
      href: "/treks/annapurna-circuit",
      imageUrl: img("photo-1464822759023-fed622ff2c3b"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "anr-3",
      title: "Mardi Himal – 5 Days",
      durationDays: 5,
      rating: 5,
      reviewCount: 6,
      startLocation: "Pokhara",
      price: 520,
      compareAtPrice: 590,
      href: "/treks/mardi-himal",
      imageUrl: img("photo-1506905925346-21bda4d32df4"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "anr-4",
      title: "Poon Hill Trek – 5 Days",
      durationDays: 5,
      rating: 5,
      reviewCount: 1,
      startLocation: "Pokhara",
      price: 399,
      compareAtPrice: 499,
      href: "/treks/poon-hill",
      imageUrl: img("photo-1483728642387-6c3bdd6c93e5"),
      ctaLabel: "Trip Details",
      visible: true,
    },
  ],
  metaTitle: "Annapurna Region Treks | Summit Seek",
  metaDescription:
    "Explore Annapurna Base Camp, Annapurna Circuit, Mardi Himal, and Poon Hill treks with Summit Seek — expert guides and transparent pricing.",
};
