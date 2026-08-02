export type TravelInfoGuide = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon:
    | "visa"
    | "season"
    | "permits"
    | "insurance"
    | "money"
    | "health"
    | "culture"
    | "transport"
    | "packing"
    | "emergency";
};

/** Top 10 Travel Info guides for the header mega menu */
export const travelInfoGuides: TravelInfoGuide[] = [
  {
    id: "visa",
    title: "Nepal Visa Guide",
    description: "Visa rules and arrival information.",
    href: "/travel-guide/nepal-visa",
    icon: "visa",
  },
  {
    id: "season",
    title: "Best Time to Visit Nepal",
    description: "Season and weather guide.",
    href: "/travel-guide/best-time-to-visit",
    icon: "season",
  },
  {
    id: "permits",
    title: "Permits & TIMS Card",
    description: "Required trekking permits.",
    href: "/travel-guide/permits-tims",
    icon: "permits",
  },
  {
    id: "insurance",
    title: "Travel Insurance",
    description: "Insurance requirements for trekking.",
    href: "/travel-guide/travel-insurance",
    icon: "insurance",
  },
  {
    id: "money",
    title: "Money & Currency",
    description: "Cash, ATM and exchange information.",
    href: "/travel-guide/money-currency",
    icon: "money",
  },
  {
    id: "health",
    title: "Health & Safety",
    description: "Medical tips and emergency contacts.",
    href: "/travel-guide/health-safety",
    icon: "health",
  },
  {
    id: "culture",
    title: "Culture & Local Etiquette",
    description: "Respect local traditions and customs.",
    href: "/travel-guide/culture-etiquette",
    icon: "culture",
  },
  {
    id: "transport",
    title: "Transportation",
    description: "Domestic flights, buses and transfers.",
    href: "/travel-guide/transportation",
    icon: "transport",
  },
  {
    id: "packing",
    title: "Packing Checklist",
    description: "Recommended trekking equipment.",
    href: "/travel-guide/packing-checklist",
    icon: "packing",
  },
  {
    id: "emergency",
    title: "Emergency Contacts",
    description: "Embassy, rescue and emergency information.",
    href: "/travel-guide/emergency-contacts",
    icon: "emergency",
  },
];
