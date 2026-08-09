export type PermitFeeRow = {
  id: string;
  region: string;
  fee: string;
  visible: boolean;
};

export type ParkEntryRow = {
  id: string;
  name: string;
  nepali: string;
  saarc: string;
  foreigner: string;
  childNote: string;
  whereToPay: string;
  visible: boolean;
};

export type PermitsTimsContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  timsHeading: string;
  timsBody: string;
  restrictedHeading: string;
  restrictedIntro: string;
  restrictedPermits: PermitFeeRow[];
  parksHeading: string;
  parksIntro: string;
  parkEntries: ParkEntryRow[];
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
