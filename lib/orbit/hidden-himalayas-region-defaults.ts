import type { DestinationRegionContent } from "@/types/destination-region-cms";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEFAULT_HIDDEN_HIMALAYAS_REGION: DestinationRegionContent = {
  coverImageUrl: img("photo-1564760055775-d63b17a69df2", 2200),
  coverTitle: "Wildlife & Hidden Himalayas",
  coverSubtitle:
    "Nepal's most booked jungle safaris — Chitwan rhino country, Bardiya tiger trails, Koshi Tappu birding, and short Chitwan lodge escapes with licensed naturalist guides.",
  eyebrow: "Destinations",
  heading: "Wildlife & Jungle Safari",
  intro:
    "From UNESCO-listed Chitwan lowlands to remote Bardiya and Koshi Tappu wetlands, these four wildlife packages are our most popular safari departures by duration and booking volume. Each links to a full trip page with clear pricing, itinerary, and Orbit-managed photos — private jeep, canoe, and lodge stays included as listed.",
  packagesHeading: "Featured Wildlife Packages",
  packages: [
    {
      id: "hh-1",
      title: "Chitwan Jungle Safari - 3 Days",
      durationDays: 3,
      rating: 5,
      reviewCount: 42,
      startLocation: "Kathmandu",
      price: 325,
      compareAtPrice: 385,
      href: "/tours/chitwan-jungle-safari",
      imageUrl: img("photo-1564760055775-d63b17a69df2"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "hh-2",
      title: "Bardiya National Park Safari - 4 Days",
      durationDays: 4,
      rating: 5,
      reviewCount: 28,
      startLocation: "Kathmandu",
      price: 495,
      compareAtPrice: 575,
      href: "/tours/bardiya-jungle-safari",
      imageUrl: img("photo-1549366021-9f849d740274"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "hh-3",
      title: "Koshi Tappu Bird Watching Safari - 3 Days",
      durationDays: 3,
      rating: 5,
      reviewCount: 19,
      startLocation: "Kathmandu",
      price: 310,
      compareAtPrice: 365,
      href: "/tours/koshi-tappu-safari",
      imageUrl: img("photo-1516426122078-c23e703198bf"),
      ctaLabel: "Trip Details",
      visible: true,
    },
    {
      id: "hh-4",
      title: "Chitwan Wildlife Lodge Safari - 2 Days",
      durationDays: 2,
      rating: 5,
      reviewCount: 36,
      startLocation: "Kathmandu",
      price: 245,
      compareAtPrice: 290,
      href: "/tours/chitwan-wildlife-lodge-safari",
      imageUrl: img("photo-1559827260-dc66d52bef19"),
      ctaLabel: "Trip Details",
      visible: true,
    },
  ],
  metaTitle: "Wildlife & Jungle Safari Nepal | Summit Seek",
  metaDescription:
    "Book Chitwan, Bardiya, and Koshi Tappu wildlife safaris with Summit Seek — rhino, tiger, and birding packages with jeep, canoe, lodge stays, and clear group pricing.",
};
