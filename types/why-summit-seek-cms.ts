export type WhyReason = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  visible: boolean;
};

export type WhySummitSeekContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  questionsHeading: string;
  questions: string[];
  trustHeading: string;
  trustBody: string;
  reasonsHeading: string;
  reasonsIntro: string;
  reasons: WhyReason[];
  highlightHeading: string;
  highlightBody: string;
  highlightImageUrl: string;
  ctaHeading: string;
  ctaBody: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  metaTitle: string;
  metaDescription: string;
};
