import type { DayToursListingContent } from "@/types/day-tours-listing";

export const DEFAULT_DAY_TOURS: DayToursListingContent = {
  eyebrow: "Summit Seek",
  heading: "Adventure Activities & Day Tours",
  description:
    "Short Kathmandu valley adventures and cultural day trips — UNESCO city circuits, Newari heritage walks, Shivapuri nature with yoga, and Janakpur pilgrimage touring with private guides and clear group pricing.",
  metaTitle: "Day Tours & Adventure Activities Nepal | Summit Seek",
  metaDescription:
    "Book Kathmandu, Bhaktapur, Shivapuri yoga hike, and Janakpur day tours with Summit Seek — private guides, entrance fees, and transparent pricing.",
  packages: [
    {
      id: "dt-1",
      href: "/tours/kathmandu-city",
      startLocation: "Kathmandu",
      reviewCount: 2,
      visible: true,
    },
    {
      id: "dt-2",
      href: "/tours/bhaktapur-city",
      startLocation: "Kathmandu",
      reviewCount: 8,
      visible: true,
    },
    {
      id: "dt-3",
      href: "/tours/shivapuri-yoga-hike",
      startLocation: "Kathmandu",
      reviewCount: 12,
      visible: true,
    },
    {
      id: "dt-4",
      href: "/tours/janakpur-city",
      startLocation: "Janakpur",
      reviewCount: 6,
      visible: true,
    },
  ],
};
