export type InsuranceCheckItem = {
  id: string;
  title: string;
  description: string;
  visible: boolean;
};

export type InsuranceProviderGroup = {
  id: string;
  region: string;
  providers: string;
  visible: boolean;
};

export type TravelInsuranceContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  alertText: string;
  mustHaveHeading: string;
  mustHaveIntro: string;
  mustHaveItems: InsuranceCheckItem[];
  altitudeHeading: string;
  altitudeBody: string;
  providersHeading: string;
  providersIntro: string;
  providerGroups: InsuranceProviderGroup[];
  disclaimerHeading: string;
  disclaimerBody: string;
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
