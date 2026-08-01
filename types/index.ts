export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Strenuous";

export type TrekRegion =
  | "Everest Region"
  | "Annapurna"
  | "Langtang"
  | "Manaslu"
  | "Mustang"
  | "Kanchenjunga"
  | "Dolpo"
  | "Makalu"
  | "Dhaulagiri"
  | "Hidden Himalayas"
  | "Peak Climbing"
  | "Expeditions"
  | "Luxury Trek"
  | "Helicopter Tour"
  | "Day Tours";

export interface Package {
  id: string;
  slug: string;
  title: string;
  region: TrekRegion;
  duration: string;
  difficulty: Difficulty;
  altitude: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  image: string;
  featured?: boolean;
  luxury?: boolean;
  category: "trek" | "peak" | "expedition" | "luxury" | "heli" | "day";
  shortDescription: string;
}

export interface NavItem {
  label: string;
  href: string;
  mega?: boolean;
  dropdown?: boolean;
}

export interface MegaCategory {
  id: string;
  label: string;
  href: string;
  icon: string;
  description: string;
  packages: { title: string; href: string; duration: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  rating: number;
  text: string;
  trek: string;
  date: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  treks: number;
  image: string;
  href: string;
}
