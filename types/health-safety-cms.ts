export type HealthTopic = {
  id: string;
  title: string;
  description: string;
  points: string[];
  visible: boolean;
};

export type HealthSafetyContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  alertText: string;
  topicsHeading: string;
  topicsIntro: string;
  topics: HealthTopic[];
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
