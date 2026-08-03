import type { TravelerReviewsContent } from "@/types/traveler-reviews";

export const DEFAULT_TRAVELER_REVIEWS: TravelerReviewsContent = {
  promoEyebrow: "Visit the land of Himalayas.",
  promoHeading: "Nepal Trekking Routes | Local Tour Organizer in Nepal.",
  promoDescription:
    "Summit Seek is a Kathmandu-based trekking house crafting Himalayan journeys with local guides, careful pacing, and premium on-trail care — from classic Everest trails to remote circuits across Nepal.",
  promoCtaLabel: "Know More",
  promoCtaHref: "/about",
  promoImageUrl:
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
  promoVideoLabel: "Watch Video",
  promoVideoHref: "/#hero",
  promoVisible: true,

  eyebrow: "Travel Experiences",
  heading: "What Our Travelers are Saying?",
  platforms: [
    { id: "tripadvisor", name: "Tripadvisor", href: "https://www.tripadvisor.com" },
    { id: "google", name: "Google", href: "https://www.google.com/maps" },
    { id: "trustpilot", name: "Trustpilot", href: "https://www.trustpilot.com" },
  ],
  reviews: [
    {
      id: "tr-1",
      title: "Manaslu and Tsum Valley Trek",
      body: "An outstanding remote journey. Guides were calm and professional, logistics flawless, and the Tsum culture was unforgettable. We felt looked after every day.",
      rating: 5,
      author: "Juliane and John",
      country: "Germany",
      date: "20 Dec. 2024",
      initial: "J",
      visible: true,
    },
    {
      id: "tr-2",
      title: "Everest Base Camp Trek",
      body: "Beautifully paced trek with excellent lodges and clear altitude guidance. Summit Seek made a busy season feel smooth and personal from Kathmandu to Gorak Shep.",
      rating: 5,
      author: "Laura Bennett",
      country: "United Kingdom",
      date: "12 Nov. 2025",
      initial: "L",
      visible: true,
    },
    {
      id: "tr-3",
      title: "Annapurna Base Camp Trek",
      body: "Sunrise at the sanctuary was magical. Food, guides, and daily briefing quality exceeded expectations — a premium Himalayan experience we would book again.",
      rating: 5,
      author: "Marcus Lee",
      country: "Australia",
      date: "03 Oct. 2025",
      initial: "M",
      visible: true,
    },
  ],
  viewAllLabel: "View All Reviews",
  viewAllHref: "/reviews",
  visible: true,
};
