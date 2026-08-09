export type SeasonHighlight = string;

export type TrekSeason = {
  id: string;
  name: string;
  months: string;
  tagline: string;
  description: string;
  highlights: string[];
  condition: string;
  imageUrl: string;
  visible: boolean;
};

export type BestTimeContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  seasonsHeading: string;
  seasonsIntro: string;
  seasons: TrekSeason[];
  summaryHeading: string;
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
