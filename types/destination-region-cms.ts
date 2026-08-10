export type DestinationPackage = {
  id: string;
  title: string;
  durationDays: number;
  rating: number;
  reviewCount: number;
  startLocation: string;
  price: number;
  compareAtPrice: number | null;
  href: string;
  imageUrl: string;
  ctaLabel: string;
  visible: boolean;
};

export type DestinationRegionContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  eyebrow: string;
  heading: string;
  intro: string;
  packagesHeading: string;
  packages: DestinationPackage[];
  metaTitle: string;
  metaDescription: string;
};
