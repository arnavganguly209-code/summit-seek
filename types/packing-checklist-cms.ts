export type PackingCategory = {
  id: string;
  title: string;
  description: string;
  items: string[];
  visible: boolean;
};

export type PackingChecklistContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  alertText: string;
  categoriesHeading: string;
  categoriesIntro: string;
  categories: PackingCategory[];
  tipsHeading: string;
  tips: string[];
  notesHeading: string;
  notes: string[];
  ctaHeading: string;
  ctaBody: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  metaTitle: string;
  metaDescription: string;
};
