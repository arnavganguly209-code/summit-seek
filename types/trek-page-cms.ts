export type TrekFact = {
  id: string;
  label: string;
  value: string;
  visible: boolean;
};

export type TrekDay = {
  id: string;
  dayLabel: string;
  title: string;
  maxAltitude: string;
  meals: string;
  accommodation: string;
  description: string;
  imageUrl: string;
  visible: boolean;
};

export type TrekAddon = {
  id: string;
  title: string;
  description: string;
  priceLabel: string;
  visible: boolean;
};

export type TrekInfoBlock = {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  visible: boolean;
};

export type TrekEquipGroup = {
  id: string;
  title: string;
  items: string[];
  visible: boolean;
};

export type TrekFaq = {
  id: string;
  question: string;
  answer: string;
  visible: boolean;
};

export type TrekGalleryImage = {
  id: string;
  url: string;
  caption: string;
  visible: boolean;
};

export type TrekPageContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  title: string;
  regionLabel: string;
  rating: number;
  reviewCount: number;
  price: number;
  compareAtPrice: number | null;
  currencyPrefix: string;
  perPersonLabel: string;
  discountBadge: string;
  durationLabel: string;
  difficultyLabel: string;
  groupSizeLabel: string;
  bookingNote: string;
  bookLabel: string;
  bookHref: string;
  enquireLabel: string;
  enquireHref: string;
  whatsappLabel: string;
  whatsappHref: string;
  facts: TrekFact[];
  overviewHeading: string;
  overviewBody: string;
  overviewImageUrl: string;
  highlightsHeading: string;
  highlights: string[];
  advantagesHeading: string;
  advantages: string[];
  whyHeading: string;
  whyPoints: string[];
  beginnersHeading: string;
  beginnersBody: string;
  prepHeading: string;
  prepPoints: string[];
  itineraryHeading: string;
  itineraryIntro: string;
  days: TrekDay[];
  availabilityHeading: string;
  availabilityBody: string;
  availabilityNotes: string[];
  addonsHeading: string;
  addons: TrekAddon[];
  includesHeading: string;
  includes: string[];
  excludesHeading: string;
  excludes: string[];
  galleryHeading: string;
  gallery: TrekGalleryImage[];
  essentialHeading: string;
  essentialBlocks: TrekInfoBlock[];
  equipmentHeading: string;
  equipmentIntro: string;
  equipmentGroups: TrekEquipGroup[];
  companyProvidesHeading: string;
  companyProvides: string[];
  faqsHeading: string;
  faqs: TrekFaq[];
  ctaHeading: string;
  ctaBody: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  metaTitle: string;
  metaDescription: string;
};
