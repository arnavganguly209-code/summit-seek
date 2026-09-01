export type DayToursPackageLink = {
  id: string;
  href: string;
  startLocation: string;
  reviewCount: number;
  visible: boolean;
};

export type DayToursListingContent = {
  eyebrow: string;
  heading: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  packages: DayToursPackageLink[];
};
