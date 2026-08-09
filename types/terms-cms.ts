export type TermsSection = {
  id: string;
  title: string;
  body: string;
  visible: boolean;
};

export type TermsContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  sections: TermsSection[];
  ctaHeading: string;
  ctaBody: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  metaTitle: string;
  metaDescription: string;
};
