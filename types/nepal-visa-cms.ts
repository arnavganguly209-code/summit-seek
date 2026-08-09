export type VisaFee = {
  id: string;
  label: string;
  price: string;
  note: string;
  visible: boolean;
};

export type VisaInfoItem = {
  id: string;
  title: string;
  description: string;
  visible: boolean;
};

export type NepalVisaContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  alertText: string;
  requirementsHeading: string;
  requirementsIntro: string;
  requirements: VisaInfoItem[];
  entryPointsHeading: string;
  entryPoints: string[];
  feesHeading: string;
  feesIntro: string;
  fees: VisaFee[];
  extensionHeading: string;
  extensionBody: string;
  transitHeading: string;
  transitBody: string;
  addressHeading: string;
  addressBody: string;
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
