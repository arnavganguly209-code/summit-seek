export type TravelInfoGuide = {
  id: string;
  title: string;
  href: string;
};

/** Compact Travel Info dropdown — 7 essential pages only */
export const travelInfoGuides: TravelInfoGuide[] = [
  {
    id: "visa",
    title: "Nepal Visa Guide",
    href: "/travel-guide/nepal-visa",
  },
  {
    id: "permits",
    title: "Trekking Permits (TIMS & National Park)",
    href: "/travel-guide/permits-tims",
  },
  {
    id: "season",
    title: "Best Time to Visit Nepal",
    href: "/travel-guide/best-time-to-visit",
  },
  {
    id: "insurance",
    title: "Travel Insurance",
    href: "/travel-guide/travel-insurance",
  },
  {
    id: "health",
    title: "Health & Safety",
    href: "/travel-guide/health-safety",
  },
  {
    id: "money",
    title: "Money & Currency",
    href: "/travel-guide/money-currency",
  },
  {
    id: "packing",
    title: "Packing Checklist",
    href: "/travel-guide/packing-checklist",
  },
];
