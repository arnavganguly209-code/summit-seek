import type {
  TrekAddon,
  TrekDay,
  TrekEquipGroup,
  TrekFact,
  TrekFaq,
  TrekGalleryImage,
  TrekGroupDiscount,
  TrekInfoBlock,
  TrekPageContent,
} from "@/types/trek-page-cms";
import { SITE } from "@/lib/constants";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type SafariDayConfig = {
  dayLabel: string;
  title: string;
  maxAltitude: string;
  meals: string;
  accommodation: string;
  description: string;
};

export type SafariAddonConfig = {
  title: string;
  description: string;
  priceLabel?: string;
};

export type SafariGalleryConfig = {
  imageId: string;
  caption: string;
};

export type SafariEssentialBlockConfig = {
  title: string;
  body: string;
};

export type SafariEquipmentGroupConfig = {
  title: string;
  items: string[];
};

export type SafariFaqConfig = {
  question: string;
  answer: string;
};

export type SafariGroupDiscountConfig = {
  paxLabel: string;
  price: number;
};

export type SafariPageConfig = {
  title: string;
  breadcrumbLabel: string;
  regionLabel: string;
  coverSubtitle: string;
  coverImageId: string;
  heroMainImageId: string;
  heroSideImage1Id: string;
  heroSideImage2Id: string;
  overviewImageId: string;
  gallery: SafariGalleryConfig[];
  price: number;
  compareAtPrice: number;
  discountBadge: string;
  groupDiscounts: SafariGroupDiscountConfig[];
  durationLabel: string;
  difficultyLabel: string;
  shortTripBadge: string;
  maxAltitude: string;
  startEnd: string;
  bestSeason: string;
  activities: string;
  bookingNote: string;
  overviewBody: string;
  highlights: string[];
  advantages?: string[];
  whyPoints: string[];
  beginnersBody: string;
  prepPoints: string[];
  itineraryHeading: string;
  itineraryIntro: string;
  days: SafariDayConfig[];
  availabilityBody: string;
  availabilityNotes: string[];
  addons: SafariAddonConfig[];
  includes: string[];
  excludes: string[];
  essentialBlocks: SafariEssentialBlockConfig[];
  equipmentGroups: SafariEquipmentGroupConfig[];
  companyProvides?: string[];
  faqs: SafariFaqConfig[];
  ctaHeading: string;
  metaTitle: string;
  metaDescription: string;
  rating?: number;
  reviewCount?: number;
};

const DEFAULT_ADVANTAGES = [
  "Licensed naturalist guide and private safari vehicle",
  "Park entry permits and conservation fees as listed",
  "Jungle lodge or resort accommodation as per itinerary",
  "All meals on safari days as listed",
  "Kathmandu transfers and domestic transport as listed",
  "Clear private and group pricing — no hidden park fees",
  "Family-friendly pacing with flexible wildlife viewing",
  "Applicable government taxes as listed",
];

const DEFAULT_COMPANY_PROVIDES = [
  "Licensed naturalist guide and safari logistics",
  "Park permit coordination and lodge reservations",
  "Kathmandu hotel pickup for road transfers",
  "Custom extensions (Chitwan, Bardiya, birding add-ons)",
];

function buildFacts(config: SafariPageConfig): TrekFact[] {
  return [
    { id: "f1", label: "Duration", value: config.durationLabel, visible: true },
    { id: "f2", label: "Difficulty", value: config.difficultyLabel, visible: true },
    { id: "f3", label: "Max Altitude", value: config.maxAltitude, visible: true },
    { id: "f4", label: "Starts / Ends", value: config.startEnd, visible: true },
    { id: "f5", label: "Region", value: config.regionLabel, visible: true },
    { id: "f6", label: "Group Size", value: "Private group", visible: true },
    { id: "f7", label: "Activities", value: config.activities, visible: true },
    { id: "f8", label: "Best Season", value: config.bestSeason, visible: true },
  ];
}

function buildGroupDiscounts(
  discounts: SafariGroupDiscountConfig[]
): TrekGroupDiscount[] {
  return discounts.map((d, i) => ({
    id: `gd${i + 1}`,
    paxLabel: d.paxLabel,
    price: d.price,
    visible: true,
  }));
}

function buildDays(days: SafariDayConfig[]): TrekDay[] {
  return days.map((d, i) => ({
    id: `d${i + 1}`,
    dayLabel: d.dayLabel,
    title: d.title,
    maxAltitude: d.maxAltitude,
    meals: d.meals,
    accommodation: d.accommodation,
    description: d.description,
    imageUrl: "",
    visible: true,
  }));
}

function buildAddons(addons: SafariAddonConfig[]): TrekAddon[] {
  return addons.map((a, i) => ({
    id: `a${i + 1}`,
    title: a.title,
    description: a.description,
    priceLabel: a.priceLabel ?? "On request",
    visible: true,
  }));
}

function buildGallery(gallery: SafariGalleryConfig[]): TrekGalleryImage[] {
  return gallery.map((g, i) => ({
    id: `g${i + 1}`,
    url: img(g.imageId),
    caption: g.caption,
    visible: true,
  }));
}

function buildEssentialBlocks(
  blocks: SafariEssentialBlockConfig[]
): TrekInfoBlock[] {
  return blocks.map((b, i) => ({
    id: `e${i + 1}`,
    title: b.title,
    body: b.body,
    imageUrl: "",
    visible: true,
  }));
}

function buildEquipmentGroups(
  groups: SafariEquipmentGroupConfig[]
): TrekEquipGroup[] {
  return groups.map((g, i) => ({
    id: `eq${i + 1}`,
    title: g.title,
    items: g.items,
    visible: true,
  }));
}

function buildFaqs(faqs: SafariFaqConfig[]): TrekFaq[] {
  return faqs.map((f, i) => ({
    id: `q${i + 1}`,
    question: f.question,
    answer: f.answer,
    visible: true,
  }));
}

export function buildSafariPage(config: SafariPageConfig): TrekPageContent {
  const advantages = config.advantages ?? DEFAULT_ADVANTAGES;
  const companyProvides = config.companyProvides ?? DEFAULT_COMPANY_PROVIDES;

  return {
    coverImageUrl: img(config.coverImageId, 2000),
    coverTitle: config.title,
    coverSubtitle: config.coverSubtitle,
    heroMainImageUrl: img(config.heroMainImageId, 2000),
    heroSideImage1Url: img(config.heroSideImage1Id, 900),
    heroSideImage2Url: img(config.heroSideImage2Id, 900),
    breadcrumbLabel: config.breadcrumbLabel,
    title: config.title,
    regionLabel: config.regionLabel,
    rating: config.rating ?? 5,
    reviewCount: config.reviewCount ?? 12,
    tripAdvisorRating: "5.0",
    googleRating: "5.0",
    trustpilotRating: "5.0",
    price: config.price,
    compareAtPrice: config.compareAtPrice,
    currencyPrefix: "US$",
    perPersonLabel: "Price Per Person",
    discountBadge: config.discountBadge,
    shortTripBadge: config.shortTripBadge,
    durationLabel: config.durationLabel,
    difficultyLabel: config.difficultyLabel,
    groupSizeLabel: "1+",
    bookingNote: config.bookingNote,
    groupDiscountHeading: "Group Discount Price",
    groupDiscounts: buildGroupDiscounts(config.groupDiscounts),
    bookLabel: "Book This Trip",
    bookHref: "/contact",
    customizeLabel: "Customize Trip",
    customizeHref: "/contact",
    enquireLabel: "Inquire Now",
    enquireHref: "/contact",
    whatsappLabel: "WhatsApp Summit Seek",
    whatsappHref: `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`,
    facts: buildFacts(config),
    overviewHeading: "Trip introduction",
    overviewBody: config.overviewBody,
    overviewImageUrl: img(config.overviewImageId),
    highlightsHeading: "Highlights",
    highlights: config.highlights,
    advantagesHeading: "Why book with Summit Seek",
    advantages,
    whyHeading: "Why choose this safari?",
    whyPoints: config.whyPoints,
    beginnersHeading: "Is this safari good for beginners?",
    beginnersBody: config.beginnersBody,
    prepHeading: "How to prepare",
    prepPoints: config.prepPoints,
    itineraryHeading: config.itineraryHeading,
    itineraryIntro: config.itineraryIntro,
    days: buildDays(config.days),
    availabilityHeading: "Dates & availability",
    availabilityBody: config.availabilityBody,
    availabilityNotes: config.availabilityNotes,
    addonsHeading: "Optional add-ons",
    addons: buildAddons(config.addons),
    includesHeading: "Trip includes",
    includes: config.includes,
    excludesHeading: "Trip excludes",
    excludes: config.excludes,
    galleryHeading: "Trip gallery",
    gallery: buildGallery(config.gallery),
    essentialHeading: "Essential information",
    essentialBlocks: buildEssentialBlocks(config.essentialBlocks),
    equipmentHeading: "What to bring",
    equipmentIntro:
      "Pack light for jungle humidity and early-morning wildlife drives. Neutral colours help on jeep and walking safaris.",
    equipmentGroups: buildEquipmentGroups(config.equipmentGroups),
    companyProvidesHeading: "What Summit Seek can provide",
    companyProvides,
    faqsHeading: "Frequently asked questions",
    faqs: buildFaqs(config.faqs),
    ctaHeading: config.ctaHeading,
    ctaBody: `Tell us your travel dates and group size — we will confirm lodge availability and a clear quote. WhatsApp ${SITE.whatsappDisplay} or email ${SITE.email}.`,
    ctaPrimaryLabel: "Enquire now",
    ctaPrimaryHref: "/contact",
    ctaSecondaryLabel: "Packing checklist",
    ctaSecondaryHref: "/travel-guide/packing-checklist",
    metaTitle: config.metaTitle,
    metaDescription: config.metaDescription,
  };
}
