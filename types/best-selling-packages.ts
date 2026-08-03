export type BestSellingPackage = {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number | null;
  reviewCount: number;
  rating: number;
  durationDays: number;
  href: string;
  imageUrl: string;
  /** Show on homepage 3×2 grid (max 6 used). */
  showOnHome: boolean;
  visible: boolean;
};

export type BestSellingPackagesContent = {
  heading: string;
  viewAllLabel: string;
  viewAllHref: string;
  packages: BestSellingPackage[];
  visible: boolean;
};
