import type { WhatWeOfferContent } from "@/types/what-we-offer";

export const DEFAULT_WHAT_WE_OFFER: WhatWeOfferContent = {
  eyebrow: "What We Offer",
  heading: "Explore Our Services & Experiences",
  description:
    "Beyond trekking, discover unforgettable Himalayan adventures, cultural experiences, wildlife tours and premium travel services.",
  visible: true,
  cards: [
    {
      id: "svc-1",
      title: "Peak Climbing",
      subtitle: "12 Experiences",
      href: "/peak-climbing",
      imageUrl:
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=900&q=85",
      ctaLabel: "Explore More",
      visible: true,
    },
    {
      id: "svc-2",
      title: "Mountain Flights",
      subtitle: "8 Experiences",
      href: "/helicopter-tours",
      imageUrl:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
      ctaLabel: "Explore More",
      visible: true,
    },
    {
      id: "svc-3",
      title: "Adventure Activities",
      subtitle: "15 Experiences",
      href: "/day-tours",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=85",
      ctaLabel: "Explore More",
      visible: true,
    },
    {
      id: "svc-4",
      title: "Wildlife & Jungle Safari",
      subtitle: "6 Experiences",
      href: "/destinations/hidden-himalayas",
      imageUrl:
        "https://images.unsplash.com/photo-1564760055775-d63b17a69df2?auto=format&fit=crop&w=900&q=85",
      ctaLabel: "Explore More",
      visible: true,
    },
  ],
};
