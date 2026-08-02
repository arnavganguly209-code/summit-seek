export type FeaturedTabIcon = "medal" | "mountain" | "stupa" | "diamond";

export type FeaturedPackage = {
  id: string;
  title: string;
  durationDays: number;
  rating: number;
  reviewCount: number;
  startLocation: string;
  endLocation: string;
  price: number;
  compareAtPrice: number | null;
  href: string;
  imageUrl: string;
  visible: boolean;
};

export type FeaturedCategory = {
  id: string;
  label: string;
  icon: FeaturedTabIcon;
  packages: FeaturedPackage[];
};

export type FeaturedPackagesContent = {
  categories: FeaturedCategory[];
};
