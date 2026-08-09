export type PaymentMethod = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  visible: boolean;
};

export type PaymentBankField = {
  id: string;
  label: string;
  value: string;
};

export type PaymentContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  noteText: string;
  methodsHeading: string;
  methodsIntro: string;
  methods: PaymentMethod[];
  chargesHeading: string;
  chargesBody: string;
  securityHeading: string;
  securityBody: string;
  privacyHeading: string;
  privacyBody: string;
  notesHeading: string;
  notes: string[];
  bankHeading: string;
  bankIntro: string;
  bankFields: PaymentBankField[];
  importantHeading: string;
  importantNotes: string[];
  ctaHeading: string;
  ctaBody: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  metaTitle: string;
  metaDescription: string;
};
