export type MoneyCard = {
  id: string;
  title: string;
  description: string;
  visible: boolean;
};

export type MoneyCurrencyContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  alertText: string;
  currencyHeading: string;
  currencyBody: string;
  cardsHeading: string;
  cardsIntro: string;
  cards: MoneyCard[];
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
