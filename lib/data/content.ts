import type { BlogPost, Destination, Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Elena Moreau",
    country: "France",
    countryCode: "FR",
    rating: 5,
    text: "From the first briefing in Kathmandu to sunrise at Base Camp, every detail felt considered. Summit Seek elevates Himalayan travel into something quietly extraordinary.",
    trek: "Everest Luxury Lodge Trek",
    date: "March 2026",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t2",
    name: "James Whitfield",
    country: "United Kingdom",
    countryCode: "GB",
    rating: 5,
    text: "Our Manaslu circuit was seamless — expert guides, thoughtful pacing, and a level of care I have only experienced at the finest hotels.",
    trek: "Manaslu Circuit Trek",
    date: "October 2025",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t3",
    name: "Sakura Tanaka",
    country: "Japan",
    countryCode: "JP",
    rating: 5,
    text: "Island Peak with Summit Seek was the adventure of a lifetime. Safety briefings were meticulous, and the team made every challenge feel achievable.",
    trek: "Island Peak Climbing",
    date: "May 2025",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t4",
    name: "Marcus Keller",
    country: "Germany",
    countryCode: "DE",
    rating: 5,
    text: "Upper Mustang felt like stepping into another century. The logistics were invisible — exactly what you want on a journey of this calibre.",
    trek: "Upper Mustang Trek",
    date: "September 2025",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t5",
    name: "Sophia Chen",
    country: "Singapore",
    countryCode: "SG",
    rating: 5,
    text: "The helicopter return from EBC was pure magic. Summit Seek understands luxury without ever making it feel ostentatious.",
    trek: "EBC with Helicopter Return",
    date: "April 2026",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Art of Acclimatization on High Himalayan Trails",
    slug: "art-of-acclimatization",
    excerpt:
      "How measured pacing, hydration, and altitude science shape safer, more rewarding journeys above 4,000 metres.",
    category: "Travel Guide",
    date: "July 12, 2026",
    readingTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b2",
    title: "Why Luxury Lodges Are Transforming Everest Travel",
    slug: "luxury-lodges-everest",
    excerpt:
      "Boutique mountain stays that honour place, craft, and comfort — without compromising the spirit of the trail.",
    category: "Luxury",
    date: "June 28, 2026",
    readingTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b3",
    title: "Hidden Valleys: Nar Phu Beyond the Circuit",
    slug: "nar-phu-hidden-valleys",
    excerpt:
      "A photographic journey into one of Nepal's most evocative restricted regions.",
    category: "Destinations",
    date: "June 4, 2026",
    readingTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b4",
    title: "Packing for Peak Season: A Discerning Checklist",
    slug: "packing-peak-season",
    excerpt:
      "Essentials refined by fifteen years of guiding — what to carry, and what to leave behind.",
    category: "Preparation",
    date: "May 19, 2026",
    readingTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=80",
  },
];

export const destinations: Destination[] = [
  {
    id: "d1",
    name: "Everest Region",
    region: "Khumbu",
    treks: 12,
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80",
    href: "/destinations/everest",
  },
  {
    id: "d2",
    name: "Annapurna",
    region: "Central Nepal",
    treks: 15,
    image:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=1000&q=80",
    href: "/destinations/annapurna",
  },
  {
    id: "d3",
    name: "Manaslu",
    region: "Restricted Area",
    treks: 6,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
    href: "/destinations/manaslu",
  },
  {
    id: "d4",
    name: "Mustang",
    region: "Trans-Himalaya",
    treks: 5,
    image:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80",
    href: "/destinations/mustang",
  },
  {
    id: "d5",
    name: "Langtang",
    region: "Near Kathmandu",
    treks: 7,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
    href: "/destinations/langtang",
  },
  {
    id: "d6",
    name: "Kanchenjunga",
    region: "Far East",
    treks: 4,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80",
    href: "/destinations/kanchenjunga",
  },
];

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    alt: "Trekker on Everest trail at golden hour",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    alt: "Snow peaks under clear alpine sky",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    alt: "Mountain ridge above the clouds",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=900&q=80",
    alt: "Mustang cliff landscapes",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80",
    alt: "Alpine climbing on snow ridge",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80",
    alt: "Hikers approaching high pass",
    span: "wide",
  },
];

export const awards = [
  { title: "Best Luxury Trek Operator", year: "2025", org: "Himalayan Travel Awards" },
  { title: "Excellence in Safety", year: "2024", org: "Nepal Tourism Board" },
  { title: "Sustainable Tourism", year: "2025", org: "Eco Himalaya Alliance" },
  { title: "Travellers' Choice", year: "2026", org: "TripAdvisor" },
];

export const partners = [
  "Nepal Tourism Board",
  "TAAN",
  "NMA",
  "KEEP",
  "Adventure Travel Trade",
  "Himalayan Rescue",
];

export const instagramPosts = [
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80",
];
