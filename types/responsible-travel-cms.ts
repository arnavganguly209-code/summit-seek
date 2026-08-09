export type ResponsiblePractice = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  visible: boolean;
};

export type ResponsibleTravelContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  travelerHeading: string;
  travelerIntro: string;
  travelerPractices: ResponsiblePractice[];
  companyHeading: string;
  companyIntro: string;
  companyCommitments: ResponsiblePractice[];
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
