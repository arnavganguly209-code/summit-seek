import { promises as fs } from "fs";
import { prisma } from "@/lib/orbit/db";
import path from "path";
import type { HeroContent, MediaItem } from "@/types/hero";
import type { FeaturedPackagesContent } from "@/types/featured-packages";
import type { AboutIntroContent } from "@/types/about-intro";
import type { BestSellingPackagesContent } from "@/types/best-selling-packages";
import type { WhatWeOfferContent } from "@/types/what-we-offer";
import type { UpcomingTripsContent } from "@/types/upcoming-trips";
import type { TravelerReviewsContent } from "@/types/traveler-reviews";
import type { TravelArticlesContent } from "@/types/travel-articles";
import type { FooterContent } from "@/types/footer-cms";
import type { ContactPageContent } from "@/types/contact-cms";
import type { BlogPageContent, BlogPost } from "@/types/blog-cms";
import type { AboutPageContent } from "@/types/about-page-cms";
import type { LegalPageContent } from "@/types/legal-cms";
import type { WhySummitSeekContent } from "@/types/why-summit-seek-cms";
import type { ResponsibleTravelContent } from "@/types/responsible-travel-cms";
import type { AffiliateContent } from "@/types/affiliate-cms";
import type { TermsContent } from "@/types/terms-cms";
import type { PaymentContent } from "@/types/payment-cms";
import type { PrivacyContent } from "@/types/privacy-cms";
import type { NepalVisaContent } from "@/types/nepal-visa-cms";
import type { PermitsTimsContent } from "@/types/permits-tims-cms";
import type { BestTimeContent } from "@/types/best-time-cms";
import type { TravelInsuranceContent } from "@/types/travel-insurance-cms";
import type { HealthSafetyContent } from "@/types/health-safety-cms";
import type { MoneyCurrencyContent } from "@/types/money-currency-cms";
import type { PackingChecklistContent } from "@/types/packing-checklist-cms";
import type { TrekPageContent } from "@/types/trek-page-cms";
import type { DestinationRegionContent } from "@/types/destination-region-cms";
import { DEFAULT_HERO } from "@/lib/orbit/defaults";
import { DEFAULT_FEATURED_PACKAGES } from "@/lib/orbit/featured-packages-defaults";
import { DEFAULT_ABOUT_INTRO } from "@/lib/orbit/about-intro-defaults";
import { DEFAULT_BEST_SELLING } from "@/lib/orbit/best-selling-defaults";
import { DEFAULT_WHAT_WE_OFFER } from "@/lib/orbit/what-we-offer-defaults";
import { DEFAULT_UPCOMING_TRIPS } from "@/lib/orbit/upcoming-trips-defaults";
import { DEFAULT_TRAVELER_REVIEWS } from "@/lib/orbit/traveler-reviews-defaults";
import { DEFAULT_TRAVEL_ARTICLES } from "@/lib/orbit/travel-articles-defaults";
import { DEFAULT_FOOTER } from "@/lib/orbit/footer-defaults";
import { DEFAULT_CONTACT } from "@/lib/orbit/contact-defaults";
import { DEFAULT_BLOG } from "@/lib/orbit/blog-defaults";
import {
  DEFAULT_ABOUT_PAGE,
  LEGACY_DEFAULT_TEAM_IMAGE_URLS,
} from "@/lib/orbit/about-page-defaults";
import { DEFAULT_LEGAL_PAGE } from "@/lib/orbit/legal-defaults";
import { DEFAULT_WHY_SUMMIT_SEEK } from "@/lib/orbit/why-summit-seek-defaults";
import { DEFAULT_RESPONSIBLE_TRAVEL } from "@/lib/orbit/responsible-travel-defaults";
import { DEFAULT_AFFILIATE } from "@/lib/orbit/affiliate-defaults";
import { DEFAULT_TERMS } from "@/lib/orbit/terms-defaults";
import { DEFAULT_PAYMENT } from "@/lib/orbit/payment-defaults";
import { DEFAULT_PRIVACY } from "@/lib/orbit/privacy-defaults";
import { DEFAULT_NEPAL_VISA } from "@/lib/orbit/nepal-visa-defaults";
import { DEFAULT_PERMITS_TIMS } from "@/lib/orbit/permits-tims-defaults";
import { DEFAULT_BEST_TIME } from "@/lib/orbit/best-time-defaults";
import { DEFAULT_TRAVEL_INSURANCE } from "@/lib/orbit/travel-insurance-defaults";
import { DEFAULT_HEALTH_SAFETY } from "@/lib/orbit/health-safety-defaults";
import { DEFAULT_MONEY_CURRENCY } from "@/lib/orbit/money-currency-defaults";
import { DEFAULT_PACKING_CHECKLIST } from "@/lib/orbit/packing-checklist-defaults";
import { DEFAULT_POON_HILL } from "@/lib/orbit/poon-hill-defaults";
import { DEFAULT_EVEREST_REGION } from "@/lib/orbit/everest-region-defaults";
import { DEFAULT_ANNAPURNA_REGION } from "@/lib/orbit/annapurna-region-defaults";
import { DEFAULT_LANGTANG_REGION } from "@/lib/orbit/langtang-region-defaults";
import { DEFAULT_MANASLU_REGION } from "@/lib/orbit/manaslu-region-defaults";

const DATA_DIR = path.join(process.cwd(), "data");
const HERO_FILE = path.join(DATA_DIR, "hero.json");
const FEATURED_PACKAGES_FILE = path.join(DATA_DIR, "featured-packages.json");
const ABOUT_INTRO_FILE = path.join(DATA_DIR, "about-intro.json");
const BEST_SELLING_FILE = path.join(DATA_DIR, "best-selling-packages.json");
const WHAT_WE_OFFER_FILE = path.join(DATA_DIR, "what-we-offer.json");
const UPCOMING_TRIPS_FILE = path.join(DATA_DIR, "upcoming-trips.json");
const TRAVELER_REVIEWS_FILE = path.join(DATA_DIR, "traveler-reviews.json");
const TRAVEL_ARTICLES_FILE = path.join(DATA_DIR, "travel-articles.json");
const FOOTER_FILE = path.join(DATA_DIR, "footer.json");
const CONTACT_FILE = path.join(DATA_DIR, "contact.json");
const BLOG_FILE = path.join(DATA_DIR, "blog.json");
const ABOUT_PAGE_FILE = path.join(DATA_DIR, "about-page.json");
const LEGAL_FILE = path.join(DATA_DIR, "legal.json");
const WHY_SUMMIT_SEEK_FILE = path.join(DATA_DIR, "why-summit-seek.json");
const RESPONSIBLE_TRAVEL_FILE = path.join(DATA_DIR, "responsible-travel.json");
const AFFILIATE_FILE = path.join(DATA_DIR, "affiliate.json");
const TERMS_FILE = path.join(DATA_DIR, "terms.json");
const PAYMENT_FILE = path.join(DATA_DIR, "payment.json");
const PRIVACY_FILE = path.join(DATA_DIR, "privacy.json");
const NEPAL_VISA_FILE = path.join(DATA_DIR, "nepal-visa.json");
const PERMITS_TIMS_FILE = path.join(DATA_DIR, "permits-tims.json");
const BEST_TIME_FILE = path.join(DATA_DIR, "best-time.json");
const TRAVEL_INSURANCE_FILE = path.join(DATA_DIR, "travel-insurance.json");
const HEALTH_SAFETY_FILE = path.join(DATA_DIR, "health-safety.json");
const MONEY_CURRENCY_FILE = path.join(DATA_DIR, "money-currency.json");
const PACKING_CHECKLIST_FILE = path.join(DATA_DIR, "packing-checklist.json");
const POON_HILL_FILE = path.join(DATA_DIR, "poon-hill.json");
const EVEREST_REGION_FILE = path.join(DATA_DIR, "everest-region.json");
const ANNAPURNA_REGION_FILE = path.join(DATA_DIR, "annapurna-region.json");
const LANGTANG_REGION_FILE = path.join(DATA_DIR, "langtang-region.json");
const MANASLU_REGION_FILE = path.join(DATA_DIR, "manaslu-region.json");
const MEDIA_FILE = path.join(DATA_DIR, "media-library.json");

/** Durable upload root — survives `git reset --hard` (unlike public/). */
export const STORAGE_MEDIA_DIR = path.join(process.cwd(), "storage", "media");
export const MEDIA_LIBRARY_DIR = path.join(STORAGE_MEDIA_DIR, "library");
export const MEDIA_UPLOADS_DIR = path.join(STORAGE_MEDIA_DIR, ".uploads");
/** Default hero starter video stays in public (tracked in git). */
export const MEDIA_HERO_DIR = path.join(process.cwd(), "public", "media", "hero");
const LEGACY_PUBLIC_LIBRARY = path.join(process.cwd(), "public", "media", "library");

async function dbReadFile(file: string): Promise<string> {
  const key = path.basename(file, ".json");
  const row = await prisma.siteContent.findUnique({ where: { key } });
  if (!row) throw new Error(`Content not found: ${key}`);
  return JSON.stringify(row.content);
}

async function dbWriteFile(file: string, content: string): Promise<void> {
  const key = path.basename(file, ".json");
  await prisma.siteContent.upsert({
    where: { key },
    update: { content: JSON.parse(content) },
    create: { key, content: JSON.parse(content) },
  });
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function ensureMediaDirs() {
  await fs.mkdir(MEDIA_LIBRARY_DIR, { recursive: true });
  await fs.mkdir(MEDIA_UPLOADS_DIR, { recursive: true });
  await fs.mkdir(MEDIA_HERO_DIR, { recursive: true });

  // One-time migrate any leftover public/media/library uploads into durable storage
  try {
    const legacy = await fs.readdir(LEGACY_PUBLIC_LIBRARY);
    for (const name of legacy) {
      if (name === ".gitkeep") continue;
      const from = path.join(LEGACY_PUBLIC_LIBRARY, name);
      const to = path.join(MEDIA_LIBRARY_DIR, name);
      try {
        await fs.access(to);
      } catch {
        await fs.copyFile(from, to).catch(() => undefined);
      }
    }
  } catch {
    // legacy dir missing — fine
  }
}

export async function getHeroContent(): Promise<HeroContent> {
  try {
    const raw = await dbReadFile(HERO_FILE);
    return { ...DEFAULT_HERO, ...JSON.parse(raw) } as HeroContent;
  } catch {
    return DEFAULT_HERO;
  }
}

export async function saveHeroContent(content: HeroContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(HERO_FILE, JSON.stringify(content, null, 2));
}

function mergeFeaturedPackages(
  stored: FeaturedPackagesContent | null,
): FeaturedPackagesContent {
  if (!stored?.categories?.length) return DEFAULT_FEATURED_PACKAGES;

  return {
    categories: DEFAULT_FEATURED_PACKAGES.categories.map((defCat) => {
      const match = stored.categories.find((c) => c.id === defCat.id);
      if (!match) return defCat;
      const packages = defCat.packages.map((defPkg, index) => {
        const saved = match.packages?.[index];
        if (!saved) return defPkg;
        return {
          ...defPkg,
          ...saved,
          id: saved.id || defPkg.id,
          // Keep intentional clears — do not resurrect default stock photos
          imageUrl:
            typeof saved.imageUrl === "string" ? saved.imageUrl.trim() : defPkg.imageUrl,
        };
      });
      while (packages.length < 4) {
        const i = packages.length;
        packages.push({
          ...defCat.packages[i],
          id: `${defCat.id}-${i + 1}`,
        });
      }
      return {
        ...defCat,
        ...match,
        id: defCat.id,
        label: match.label?.trim() || defCat.label,
        icon: match.icon || defCat.icon,
        packages: packages.slice(0, 4),
      };
    }),
  };
}

export async function getFeaturedPackages(): Promise<FeaturedPackagesContent> {
  try {
    const raw = await dbReadFile(FEATURED_PACKAGES_FILE);
    return mergeFeaturedPackages(JSON.parse(raw) as FeaturedPackagesContent);
  } catch {
    return DEFAULT_FEATURED_PACKAGES;
  }
}

export async function saveFeaturedPackages(
  content: FeaturedPackagesContent,
): Promise<void> {
  await dbWriteFile(FEATURED_PACKAGES_FILE, JSON.stringify(content, null, 2));
}

export async function getAboutIntro(): Promise<AboutIntroContent> {
  try {
    const raw = await dbReadFile(ABOUT_INTRO_FILE);
    const stored = JSON.parse(raw) as Partial<AboutIntroContent>;
    const highlights = Array.isArray(stored.highlights)
      ? ([
          stored.highlights[0] || DEFAULT_ABOUT_INTRO.highlights[0],
          stored.highlights[1] || DEFAULT_ABOUT_INTRO.highlights[1],
          stored.highlights[2] || DEFAULT_ABOUT_INTRO.highlights[2],
        ] as AboutIntroContent["highlights"])
      : DEFAULT_ABOUT_INTRO.highlights;
    return {
      ...DEFAULT_ABOUT_INTRO,
      ...stored,
      highlights,
      heading:
        !stored.heading ||
        /tibet|bhutan|tailored tours/i.test(stored.heading)
          ? DEFAULT_ABOUT_INTRO.heading
          : stored.heading,
      description:
        !stored.description ||
        /tibet|bhutan/i.test(stored.description)
          ? DEFAULT_ABOUT_INTRO.description
          : stored.description,
    };
  } catch {
    return DEFAULT_ABOUT_INTRO;
  }
}

export async function saveAboutIntro(content: AboutIntroContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(ABOUT_INTRO_FILE, JSON.stringify(content, null, 2));
}

function mergeBestSelling(
  stored: Partial<BestSellingPackagesContent> | null,
): BestSellingPackagesContent {
  if (!stored) return DEFAULT_BEST_SELLING;
  const packages =
    Array.isArray(stored.packages) && stored.packages.length > 0
      ? stored.packages.map((pkg, i) => {
          const fallback = DEFAULT_BEST_SELLING.packages[i] || DEFAULT_BEST_SELLING.packages[0];
          return {
            ...fallback,
            ...pkg,
            id: pkg.id || `bs-${i + 1}`,
            price: Number(pkg.price) || 0,
            compareAtPrice:
              pkg.compareAtPrice === null || pkg.compareAtPrice === undefined
                ? null
                : Number(pkg.compareAtPrice) || 0,
            reviewCount: Number(pkg.reviewCount) || 0,
            rating: Number(pkg.rating) || 5,
            durationDays: Number(pkg.durationDays) || 1,
            showOnHome: pkg.showOnHome !== false,
            visible: pkg.visible !== false,
          };
        })
      : DEFAULT_BEST_SELLING.packages;

  return {
    heading: stored.heading?.trim() || DEFAULT_BEST_SELLING.heading,
    viewAllLabel: stored.viewAllLabel?.trim() || DEFAULT_BEST_SELLING.viewAllLabel,
    viewAllHref: stored.viewAllHref?.trim() || DEFAULT_BEST_SELLING.viewAllHref,
    visible: stored.visible !== false,
    packages,
  };
}

export async function getBestSellingPackages(): Promise<BestSellingPackagesContent> {
  try {
    const raw = await dbReadFile(BEST_SELLING_FILE);
    return mergeBestSelling(JSON.parse(raw) as Partial<BestSellingPackagesContent>);
  } catch {
    return DEFAULT_BEST_SELLING;
  }
}

export async function saveBestSellingPackages(
  content: BestSellingPackagesContent,
): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(BEST_SELLING_FILE, JSON.stringify(content, null, 2));
}

function mergeWhatWeOffer(
  stored: Partial<WhatWeOfferContent> | null,
): WhatWeOfferContent {
  if (!stored) return DEFAULT_WHAT_WE_OFFER;
  const cards =
    Array.isArray(stored.cards) && stored.cards.length > 0
      ? stored.cards.map((card, i) => {
          const fallback = DEFAULT_WHAT_WE_OFFER.cards[i] || DEFAULT_WHAT_WE_OFFER.cards[0];
          return {
            ...fallback,
            ...card,
            id: card.id || `svc-${i + 1}`,
            visible: card.visible !== false,
          };
        })
      : DEFAULT_WHAT_WE_OFFER.cards;

  return {
    eyebrow: stored.eyebrow?.trim() || DEFAULT_WHAT_WE_OFFER.eyebrow,
    heading: stored.heading?.trim() || DEFAULT_WHAT_WE_OFFER.heading,
    description: stored.description?.trim() || DEFAULT_WHAT_WE_OFFER.description,
    visible: stored.visible !== false,
    cards,
  };
}

export async function getWhatWeOffer(): Promise<WhatWeOfferContent> {
  try {
    const raw = await dbReadFile(WHAT_WE_OFFER_FILE);
    return mergeWhatWeOffer(JSON.parse(raw) as Partial<WhatWeOfferContent>);
  } catch {
    return DEFAULT_WHAT_WE_OFFER;
  }
}

export async function saveWhatWeOffer(content: WhatWeOfferContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(WHAT_WE_OFFER_FILE, JSON.stringify(content, null, 2));
}

function mergeUpcomingTrips(
  stored: Partial<UpcomingTripsContent> | null,
): UpcomingTripsContent {
  if (!stored) return DEFAULT_UPCOMING_TRIPS;
  const months =
    Array.isArray(stored.months) && stored.months.length > 0
      ? stored.months.map((month, mi) => {
          const fallbackMonth =
            DEFAULT_UPCOMING_TRIPS.months[mi] || DEFAULT_UPCOMING_TRIPS.months[0];
          const trips =
            Array.isArray(month.trips) && month.trips.length > 0
              ? month.trips.map((trip, ti) => {
                  const fallbackTrip =
                    fallbackMonth.trips[ti] || fallbackMonth.trips[0];
                  return {
                    ...fallbackTrip,
                    ...trip,
                    id: trip.id || `trip-${mi}-${ti}`,
                    price: Number(trip.price) || 0,
                    compareAtPrice:
                      trip.compareAtPrice === null || trip.compareAtPrice === undefined
                        ? null
                        : Number(trip.compareAtPrice) || 0,
                    durationDays: Number(trip.durationDays) || 1,
                    visible: trip.visible !== false,
                  };
                })
              : fallbackMonth.trips;
          return {
            ...fallbackMonth,
            ...month,
            id: month.id || fallbackMonth.id,
            label: month.label?.trim() || fallbackMonth.label,
            trips,
          };
        })
      : DEFAULT_UPCOMING_TRIPS.months;

  return {
    eyebrow: stored.eyebrow?.trim() || DEFAULT_UPCOMING_TRIPS.eyebrow,
    heading: stored.heading?.trim() || DEFAULT_UPCOMING_TRIPS.heading,
    noteTitle: stored.noteTitle?.trim() || DEFAULT_UPCOMING_TRIPS.noteTitle,
    noteBody: stored.noteBody?.trim() || DEFAULT_UPCOMING_TRIPS.noteBody,
    viewAllLabel: stored.viewAllLabel?.trim() || DEFAULT_UPCOMING_TRIPS.viewAllLabel,
    viewAllHref: stored.viewAllHref?.trim() || DEFAULT_UPCOMING_TRIPS.viewAllHref,
    bookLabel: stored.bookLabel?.trim() || DEFAULT_UPCOMING_TRIPS.bookLabel,
    visible: stored.visible !== false,
    months,
  };
}

export async function getUpcomingTrips(): Promise<UpcomingTripsContent> {
  try {
    const raw = await dbReadFile(UPCOMING_TRIPS_FILE);
    return mergeUpcomingTrips(JSON.parse(raw) as Partial<UpcomingTripsContent>);
  } catch {
    return DEFAULT_UPCOMING_TRIPS;
  }
}

export async function saveUpcomingTrips(content: UpcomingTripsContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(UPCOMING_TRIPS_FILE, JSON.stringify(content, null, 2));
}

function mergeTravelerReviews(
  stored: Partial<TravelerReviewsContent> | null,
): TravelerReviewsContent {
  if (!stored) return DEFAULT_TRAVELER_REVIEWS;
  const reviews =
    Array.isArray(stored.reviews) && stored.reviews.length > 0
      ? stored.reviews.map((r, i) => {
          const fallback =
            DEFAULT_TRAVELER_REVIEWS.reviews[i] || DEFAULT_TRAVELER_REVIEWS.reviews[0];
          return {
            ...fallback,
            ...r,
            id: r.id || `tr-${i + 1}`,
            rating: Number(r.rating) || 5,
            initial: (r.initial || r.author || "S").trim().charAt(0).toUpperCase(),
            visible: r.visible !== false,
          };
        })
      : DEFAULT_TRAVELER_REVIEWS.reviews;

  const platforms =
    Array.isArray(stored.platforms) && stored.platforms.length > 0
      ? stored.platforms.map((p, i) => ({
          ...DEFAULT_TRAVELER_REVIEWS.platforms[i],
          ...p,
          id: p.id || `platform-${i + 1}`,
          name: p.name?.trim() || `Platform ${i + 1}`,
          href: p.href?.trim() || "#",
        }))
      : DEFAULT_TRAVELER_REVIEWS.platforms;

  return {
    ...DEFAULT_TRAVELER_REVIEWS,
    ...stored,
    platforms,
    reviews,
    visible: stored.visible !== false,
    promoVisible: stored.promoVisible !== false,
  };
}

export async function getTravelerReviews(): Promise<TravelerReviewsContent> {
  try {
    const raw = await dbReadFile(TRAVELER_REVIEWS_FILE);
    return mergeTravelerReviews(JSON.parse(raw) as Partial<TravelerReviewsContent>);
  } catch {
    return DEFAULT_TRAVELER_REVIEWS;
  }
}

export async function saveTravelerReviews(
  content: TravelerReviewsContent,
): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(TRAVELER_REVIEWS_FILE, JSON.stringify(content, null, 2));
}

function mergeTravelArticles(
  stored: Partial<TravelArticlesContent> | null,
): TravelArticlesContent {
  if (!stored) return DEFAULT_TRAVEL_ARTICLES;
  const articles =
    Array.isArray(stored.articles) && stored.articles.length > 0
      ? stored.articles.map((a, i) => {
          const fallback =
            DEFAULT_TRAVEL_ARTICLES.articles[i] || DEFAULT_TRAVEL_ARTICLES.articles[0];
          return {
            ...fallback,
            ...a,
            id: a.id || `ta-${i + 1}`,
            visible: a.visible !== false,
          };
        })
      : DEFAULT_TRAVEL_ARTICLES.articles;

  return {
    eyebrow: stored.eyebrow?.trim() || DEFAULT_TRAVEL_ARTICLES.eyebrow,
    heading: stored.heading?.trim() || DEFAULT_TRAVEL_ARTICLES.heading,
    viewMoreLabel: stored.viewMoreLabel?.trim() || DEFAULT_TRAVEL_ARTICLES.viewMoreLabel,
    viewMoreHref: stored.viewMoreHref?.trim() || DEFAULT_TRAVEL_ARTICLES.viewMoreHref,
    visible: stored.visible !== false,
    articles,
  };
}

export async function getTravelArticles(): Promise<TravelArticlesContent> {
  try {
    const raw = await dbReadFile(TRAVEL_ARTICLES_FILE);
    return mergeTravelArticles(JSON.parse(raw) as Partial<TravelArticlesContent>);
  } catch {
    return DEFAULT_TRAVEL_ARTICLES;
  }
}

export async function saveTravelArticles(content: TravelArticlesContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(TRAVEL_ARTICLES_FILE, JSON.stringify(content, null, 2));
}

function mergeFooter(stored: Partial<FooterContent> | null): FooterContent {
  if (!stored) return DEFAULT_FOOTER;

  const mergeList = <T extends { id?: string }>(
    items: T[] | undefined,
    fallback: T[],
    mapItem: (item: T, fb: T, i: number) => T,
  ): T[] => {
    if (!Array.isArray(items) || items.length === 0) return fallback;
    return items.map((item, i) => mapItem(item, fallback[i] || fallback[0], i));
  };

  const partners = mergeList(stored.partners, DEFAULT_FOOTER.partners, (p, fb, i) => ({
    ...fb,
    ...p,
    id: p.id || fb.id || `partner-${i + 1}`,
    visible: p.visible !== false,
  }));

  const payments = mergeList(stored.payments, DEFAULT_FOOTER.payments, (p, fb, i) => ({
    ...fb,
    ...p,
    id: p.id || fb.id || `pay-${i + 1}`,
    visible: p.visible !== false,
  }));

  const mergeLinks = (
    items: FooterContent["destinations"] | undefined,
    fallback: FooterContent["destinations"],
  ) => {
    if (!Array.isArray(items) || items.length === 0) return fallback;
    return items.map((l, i) => {
      let href = l.href?.trim() || fallback[i]?.href || "/";
      if (href === "/about#team") href = "/about/team";
      if (href === "/about#vision") href = "/about/vision";
      return {
        label: l.label?.trim() || fallback[i]?.label || "Link",
        href,
      };
    });
  };

  return {
    topLogoUrl:
      !stored.topLogoUrl?.trim() ||
      stored.topLogoUrl.includes("logo-summit-seek-transparent")
        ? DEFAULT_FOOTER.topLogoUrl
        : stored.topLogoUrl.trim(),
    brandLogoUrl: stored.brandLogoUrl?.trim() || DEFAULT_FOOTER.brandLogoUrl,
    brandTagline: stored.brandTagline?.trim() || DEFAULT_FOOTER.brandTagline,
    newsletterHeading: stored.newsletterHeading?.trim() || DEFAULT_FOOTER.newsletterHeading,
    newsletterDescription:
      stored.newsletterDescription?.trim() || DEFAULT_FOOTER.newsletterDescription,
    weAcceptLabel: stored.weAcceptLabel?.trim() || DEFAULT_FOOTER.weAcceptLabel,
    travelersChoiceBadgeUrl:
      stored.travelersChoiceBadgeUrl?.trim() || DEFAULT_FOOTER.travelersChoiceBadgeUrl,
    travelersChoiceHref:
      stored.travelersChoiceHref?.trim() || DEFAULT_FOOTER.travelersChoiceHref,
    copyrightText: stored.copyrightText?.trim() || DEFAULT_FOOTER.copyrightText,
    developedByLabel: stored.developedByLabel?.trim() || DEFAULT_FOOTER.developedByLabel,
    developedByName: stored.developedByName?.trim() || DEFAULT_FOOTER.developedByName,
    developedByHref: stored.developedByHref?.trim() || DEFAULT_FOOTER.developedByHref,
    partners,
    payments,
    destinations: mergeLinks(stored.destinations, DEFAULT_FOOTER.destinations),
    trekking: mergeLinks(stored.trekking, DEFAULT_FOOTER.trekking),
    company: mergeLinks(stored.company, DEFAULT_FOOTER.company),
    useful: mergeLinks(stored.useful, DEFAULT_FOOTER.useful),
  };
}

export async function getFooterContent(): Promise<FooterContent> {
  try {
    const raw = await dbReadFile(FOOTER_FILE);
    return mergeFooter(JSON.parse(raw) as Partial<FooterContent>);
  } catch {
    return DEFAULT_FOOTER;
  }
}

export async function saveFooterContent(content: FooterContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(FOOTER_FILE, JSON.stringify(content, null, 2));
}

function mergeContact(stored: Partial<ContactPageContent> | null): ContactPageContent {
  if (!stored) return DEFAULT_CONTACT;
  const socials =
    Array.isArray(stored.socials) && stored.socials.length > 0
      ? stored.socials.map((s, i) => ({
          ...DEFAULT_CONTACT.socials[i % DEFAULT_CONTACT.socials.length],
          ...s,
          id: s.id || `social-${i + 1}`,
          visible: s.visible !== false,
        }))
      : DEFAULT_CONTACT.socials;

  return {
    ...DEFAULT_CONTACT,
    ...stored,
    socials,
    coverImageUrl: stored.coverImageUrl?.trim() || DEFAULT_CONTACT.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_CONTACT.coverTitle,
    phone: stored.phone?.trim() || DEFAULT_CONTACT.phone,
    phoneDisplay: stored.phoneDisplay?.trim() || DEFAULT_CONTACT.phoneDisplay,
    email: stored.email?.trim() || DEFAULT_CONTACT.email,
    mapEmbedUrl: stored.mapEmbedUrl?.trim() || DEFAULT_CONTACT.mapEmbedUrl,
  };
}

export async function getContactContent(): Promise<ContactPageContent> {
  try {
    const raw = await dbReadFile(CONTACT_FILE);
    return mergeContact(JSON.parse(raw) as Partial<ContactPageContent>);
  } catch {
    return DEFAULT_CONTACT;
  }
}

export async function saveContactContent(content: ContactPageContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(CONTACT_FILE, JSON.stringify(content, null, 2));
}

function mergeBlogPost(stored: Partial<BlogPost>, fallback: BlogPost, index: number): BlogPost {
  const tags = Array.isArray(stored.tags)
    ? stored.tags.map((t) => String(t).trim()).filter(Boolean)
    : fallback.tags;
  const slug =
    stored.slug?.trim() ||
    fallback.slug ||
    `post-${index + 1}`;
  return {
    ...fallback,
    ...stored,
    id: stored.id || fallback.id || `blog-${index + 1}`,
    slug,
    title: stored.title?.trim() || fallback.title,
    excerpt: stored.excerpt?.trim() || fallback.excerpt,
    content: stored.content?.trim() || fallback.content,
    coverImageUrl: stored.coverImageUrl?.trim() || fallback.coverImageUrl,
    author: stored.author?.trim() || fallback.author,
    category: stored.category?.trim() || fallback.category,
    tags,
    keywords: stored.keywords?.trim() || fallback.keywords,
    metaTitle: stored.metaTitle?.trim() || stored.title?.trim() || fallback.metaTitle,
    metaDescription:
      stored.metaDescription?.trim() || stored.excerpt?.trim() || fallback.metaDescription,
    dateLabel: stored.dateLabel?.trim() || fallback.dateLabel,
    publishedAt: stored.publishedAt?.trim() || fallback.publishedAt,
    visible: stored.visible !== false,
  };
}

function mergeBlog(stored: Partial<BlogPageContent> | null): BlogPageContent {
  if (!stored) return DEFAULT_BLOG;

  const categories =
    Array.isArray(stored.categories) && stored.categories.length > 0
      ? stored.categories.map((c) => String(c).trim()).filter(Boolean)
      : DEFAULT_BLOG.categories;

  const posts =
    Array.isArray(stored.posts) && stored.posts.length > 0
      ? stored.posts.map((p, i) =>
          mergeBlogPost(p, DEFAULT_BLOG.posts[i] || DEFAULT_BLOG.posts[0], i),
        )
      : DEFAULT_BLOG.posts;

  return {
    ...DEFAULT_BLOG,
    ...stored,
    categories,
    posts,
    coverImageUrl: stored.coverImageUrl?.trim() || DEFAULT_BLOG.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_BLOG.coverTitle,
    intro: stored.intro?.trim() || DEFAULT_BLOG.intro,
    latestHeading: stored.latestHeading?.trim() || DEFAULT_BLOG.latestHeading,
    metaTitle: stored.metaTitle?.trim() || DEFAULT_BLOG.metaTitle,
    metaDescription: stored.metaDescription?.trim() || DEFAULT_BLOG.metaDescription,
  };
}

export async function getBlogContent(): Promise<BlogPageContent> {
  try {
    const raw = await dbReadFile(BLOG_FILE);
    return mergeBlog(JSON.parse(raw) as Partial<BlogPageContent>);
  } catch {
    return DEFAULT_BLOG;
  }
}

export async function saveBlogContent(content: BlogPageContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(BLOG_FILE, JSON.stringify(content, null, 2));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const content = await getBlogContent();
  return content.posts.find((p) => p.slug === slug && p.visible !== false) || null;
}

function mergeAboutPage(stored: Partial<AboutPageContent> | null): AboutPageContent {
  if (!stored) return DEFAULT_ABOUT_PAGE;

  const values =
    Array.isArray(stored.values) && stored.values.length > 0
      ? stored.values.map((v, i) => ({
          ...DEFAULT_ABOUT_PAGE.values[i % DEFAULT_ABOUT_PAGE.values.length],
          ...v,
          id: v.id || `v-${i + 1}`,
        }))
      : DEFAULT_ABOUT_PAGE.values;

  const rawTeam = Array.isArray(stored.team) ? stored.team : null;
  let team =
    rawTeam && rawTeam.length > 0
      ? rawTeam.map((m, i) => {
          const imageUrl = typeof m.imageUrl === "string" ? m.imageUrl.trim() : "";
          const cleaned =
            !imageUrl || LEGACY_DEFAULT_TEAM_IMAGE_URLS.has(imageUrl.split("?")[0])
              ? ""
              : imageUrl;
          return {
            id: m.id || `t-${i + 1}`,
            name: (m.name || "").trim() || `Team Member ${i + 1}`,
            role: (m.role || "").trim() || "Designation",
            bio: typeof m.bio === "string" ? m.bio : "",
            imageUrl: cleaned,
            visible: m.visible !== false,
          };
        })
      : DEFAULT_ABOUT_PAGE.team.map((m) => ({ ...m }));

  // Ensure 8 editable slots for the public team grid (keep extras if CMS added more)
  if (team.length < 8) {
    const extras = DEFAULT_ABOUT_PAGE.team
      .slice(team.length)
      .map((m, i) => ({ ...m, id: m.id || `t-${team.length + i + 1}` }));
    team = [...team, ...extras];
  }

  const coverImageUrl =
    typeof stored.coverImageUrl === "string"
      ? stored.coverImageUrl.trim()
      : DEFAULT_ABOUT_PAGE.coverImageUrl;
  const storyImageUrl =
    typeof stored.storyImageUrl === "string"
      ? stored.storyImageUrl.trim()
      : DEFAULT_ABOUT_PAGE.storyImageUrl;
  const teamCoverImageUrl =
    typeof stored.teamCoverImageUrl === "string"
      ? stored.teamCoverImageUrl.trim()
      : DEFAULT_ABOUT_PAGE.teamCoverImageUrl;
  const visionCoverImageUrl =
    typeof stored.visionCoverImageUrl === "string"
      ? stored.visionCoverImageUrl.trim()
      : DEFAULT_ABOUT_PAGE.visionCoverImageUrl;

  const visionPillars =
    Array.isArray(stored.visionPillars) && stored.visionPillars.length > 0
      ? stored.visionPillars.map((v, i) => ({
          ...DEFAULT_ABOUT_PAGE.visionPillars[i % DEFAULT_ABOUT_PAGE.visionPillars.length],
          ...v,
          id: v.id || `vp-${i + 1}`,
        }))
      : DEFAULT_ABOUT_PAGE.visionPillars;

  return {
    ...DEFAULT_ABOUT_PAGE,
    ...stored,
    values,
    team,
    visionPillars,
    // Respect intentional clears — never resurrect removed images from defaults
    coverImageUrl,
    storyImageUrl,
    teamCoverImageUrl,
    visionCoverImageUrl,
    companyName: stored.companyName?.trim() || DEFAULT_ABOUT_PAGE.companyName,
    storyBody: stored.storyBody?.trim() || DEFAULT_ABOUT_PAGE.storyBody,
    visionPageIntro:
      stored.visionPageIntro?.trim() || DEFAULT_ABOUT_PAGE.visionPageIntro,
    visionPillarsHeading:
      stored.visionPillarsHeading?.trim() || DEFAULT_ABOUT_PAGE.visionPillarsHeading,
  };
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  try {
    const raw = await dbReadFile(ABOUT_PAGE_FILE);
    return mergeAboutPage(JSON.parse(raw) as Partial<AboutPageContent>);
  } catch {
    return DEFAULT_ABOUT_PAGE;
  }
}

export async function saveAboutPageContent(content: AboutPageContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(ABOUT_PAGE_FILE, JSON.stringify(content, null, 2));
}

function mergeLegalPage(stored: Partial<LegalPageContent> | null): LegalPageContent {
  if (!stored) return DEFAULT_LEGAL_PAGE;

  const documents =
    Array.isArray(stored.documents) && stored.documents.length > 0
      ? stored.documents.map((d, i) => ({
          id: d.id || `doc-${i + 1}`,
          title: (d.title || "").trim() || `Document ${i + 1}`,
          description: typeof d.description === "string" ? d.description : "",
          imageUrl: typeof d.imageUrl === "string" ? d.imageUrl.trim() : "",
          visible: d.visible !== false,
        }))
      : DEFAULT_LEGAL_PAGE.documents.map((d) => ({ ...d }));

  return {
    ...DEFAULT_LEGAL_PAGE,
    ...stored,
    documents,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_LEGAL_PAGE.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_LEGAL_PAGE.coverTitle,
    intro: stored.intro?.trim() || DEFAULT_LEGAL_PAGE.intro,
  };
}

export async function getLegalContent(): Promise<LegalPageContent> {
  try {
    const raw = await dbReadFile(LEGAL_FILE);
    return mergeLegalPage(JSON.parse(raw) as Partial<LegalPageContent>);
  } catch {
    return DEFAULT_LEGAL_PAGE;
  }
}

export async function saveLegalContent(content: LegalPageContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(LEGAL_FILE, JSON.stringify(content, null, 2));
}

function mergeWhySummitSeek(
  stored: Partial<WhySummitSeekContent> | null,
): WhySummitSeekContent {
  if (!stored) return DEFAULT_WHY_SUMMIT_SEEK;

  const reasons =
    Array.isArray(stored.reasons) && stored.reasons.length > 0
      ? stored.reasons.map((r, i) => ({
          id: r.id || `r-${i + 1}`,
          title: (r.title || "").trim() || `Reason ${i + 1}`,
          description: typeof r.description === "string" ? r.description : "",
          imageUrl: typeof r.imageUrl === "string" ? r.imageUrl.trim() : "",
          visible: r.visible !== false,
        }))
      : DEFAULT_WHY_SUMMIT_SEEK.reasons.map((r) => ({ ...r }));

  const questions = Array.isArray(stored.questions)
    ? stored.questions.map((q) => String(q || "").trim()).filter(Boolean)
    : DEFAULT_WHY_SUMMIT_SEEK.questions;

  return {
    ...DEFAULT_WHY_SUMMIT_SEEK,
    ...stored,
    reasons,
    questions: questions.length > 0 ? questions : DEFAULT_WHY_SUMMIT_SEEK.questions,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_WHY_SUMMIT_SEEK.coverImageUrl,
    highlightImageUrl:
      typeof stored.highlightImageUrl === "string"
        ? stored.highlightImageUrl.trim()
        : DEFAULT_WHY_SUMMIT_SEEK.highlightImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_WHY_SUMMIT_SEEK.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_WHY_SUMMIT_SEEK.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_WHY_SUMMIT_SEEK.introBody,
  };
}

export async function getWhySummitSeekContent(): Promise<WhySummitSeekContent> {
  try {
    const raw = await dbReadFile(WHY_SUMMIT_SEEK_FILE);
    return mergeWhySummitSeek(JSON.parse(raw) as Partial<WhySummitSeekContent>);
  } catch {
    return DEFAULT_WHY_SUMMIT_SEEK;
  }
}

export async function saveWhySummitSeekContent(
  content: WhySummitSeekContent,
): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(WHY_SUMMIT_SEEK_FILE, JSON.stringify(content, null, 2));
}

function mergePracticeList(
  stored: ResponsibleTravelContent["travelerPractices"] | undefined,
  fallback: ResponsibleTravelContent["travelerPractices"],
) {
  if (!Array.isArray(stored) || stored.length === 0) {
    return fallback.map((item) => ({ ...item }));
  }
  return stored.map((item, i) => ({
    id: item.id || `p-${i + 1}`,
    title: (item.title || "").trim() || `Item ${i + 1}`,
    description: typeof item.description === "string" ? item.description : "",
    imageUrl: typeof item.imageUrl === "string" ? item.imageUrl.trim() : "",
    visible: item.visible !== false,
  }));
}

function mergeResponsibleTravel(
  stored: Partial<ResponsibleTravelContent> | null,
): ResponsibleTravelContent {
  if (!stored) return DEFAULT_RESPONSIBLE_TRAVEL;

  return {
    ...DEFAULT_RESPONSIBLE_TRAVEL,
    ...stored,
    travelerPractices: mergePracticeList(
      stored.travelerPractices,
      DEFAULT_RESPONSIBLE_TRAVEL.travelerPractices,
    ),
    companyCommitments: mergePracticeList(
      stored.companyCommitments,
      DEFAULT_RESPONSIBLE_TRAVEL.companyCommitments,
    ),
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_RESPONSIBLE_TRAVEL.coverImageUrl,
    highlightImageUrl:
      typeof stored.highlightImageUrl === "string"
        ? stored.highlightImageUrl.trim()
        : DEFAULT_RESPONSIBLE_TRAVEL.highlightImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_RESPONSIBLE_TRAVEL.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_RESPONSIBLE_TRAVEL.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_RESPONSIBLE_TRAVEL.introBody,
  };
}

export async function getResponsibleTravelContent(): Promise<ResponsibleTravelContent> {
  try {
    const raw = await dbReadFile(RESPONSIBLE_TRAVEL_FILE);
    return mergeResponsibleTravel(JSON.parse(raw) as Partial<ResponsibleTravelContent>);
  } catch {
    return DEFAULT_RESPONSIBLE_TRAVEL;
  }
}

export async function saveResponsibleTravelContent(
  content: ResponsibleTravelContent,
): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(RESPONSIBLE_TRAVEL_FILE, JSON.stringify(content, null, 2));
}

function mergeAffiliateCards(
  stored: AffiliateContent["promoteMethods"] | undefined,
  fallback: AffiliateContent["promoteMethods"],
) {
  if (!Array.isArray(stored) || stored.length === 0) {
    return fallback.map((item) => ({ ...item }));
  }
  return stored.map((item, i) => ({
    id: item.id || `a-${i + 1}`,
    title: (item.title || "").trim() || `Item ${i + 1}`,
    description: typeof item.description === "string" ? item.description : "",
    imageUrl: typeof item.imageUrl === "string" ? item.imageUrl.trim() : "",
    visible: item.visible !== false,
  }));
}

function mergeAffiliate(stored: Partial<AffiliateContent> | null): AffiliateContent {
  if (!stored) return DEFAULT_AFFILIATE;

  const termsPoints = Array.isArray(stored.termsPoints)
    ? stored.termsPoints.map((p) => (typeof p === "string" ? p : "")).filter(Boolean)
    : DEFAULT_AFFILIATE.termsPoints;

  return {
    ...DEFAULT_AFFILIATE,
    ...stored,
    promoteMethods: mergeAffiliateCards(
      stored.promoteMethods,
      DEFAULT_AFFILIATE.promoteMethods,
    ),
    steps: mergeAffiliateCards(stored.steps, DEFAULT_AFFILIATE.steps),
    termsPoints: termsPoints.length > 0 ? termsPoints : DEFAULT_AFFILIATE.termsPoints,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_AFFILIATE.coverImageUrl,
    highlightImageUrl:
      typeof stored.highlightImageUrl === "string"
        ? stored.highlightImageUrl.trim()
        : DEFAULT_AFFILIATE.highlightImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_AFFILIATE.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_AFFILIATE.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_AFFILIATE.introBody,
  };
}

export async function getAffiliateContent(): Promise<AffiliateContent> {
  try {
    const raw = await dbReadFile(AFFILIATE_FILE);
    return mergeAffiliate(JSON.parse(raw) as Partial<AffiliateContent>);
  } catch {
    return DEFAULT_AFFILIATE;
  }
}

export async function saveAffiliateContent(content: AffiliateContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(AFFILIATE_FILE, JSON.stringify(content, null, 2));
}

function mergeTerms(stored: Partial<TermsContent> | null): TermsContent {
  if (!stored) return DEFAULT_TERMS;

  const sections =
    Array.isArray(stored.sections) && stored.sections.length > 0
      ? stored.sections.map((item, i) => ({
          id: item.id || `term-${i + 1}`,
          title: (item.title || "").trim() || `Section ${i + 1}`,
          body: typeof item.body === "string" ? item.body : "",
          visible: item.visible !== false,
        }))
      : DEFAULT_TERMS.sections.map((s) => ({ ...s }));

  return {
    ...DEFAULT_TERMS,
    ...stored,
    sections,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_TERMS.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_TERMS.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_TERMS.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_TERMS.introBody,
  };
}

export async function getTermsContent(): Promise<TermsContent> {
  try {
    const raw = await dbReadFile(TERMS_FILE);
    return mergeTerms(JSON.parse(raw) as Partial<TermsContent>);
  } catch {
    return DEFAULT_TERMS;
  }
}

export async function saveTermsContent(content: TermsContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(TERMS_FILE, JSON.stringify(content, null, 2));
}

function mergePaymentMethods(
  stored: PaymentContent["methods"] | undefined,
  fallback: PaymentContent["methods"],
) {
  if (!Array.isArray(stored) || stored.length === 0) {
    return fallback.map((item) => ({ ...item }));
  }
  return stored.map((item, i) => ({
    id: item.id || `pm-${i + 1}`,
    title: (item.title || "").trim() || `Method ${i + 1}`,
    description: typeof item.description === "string" ? item.description : "",
    imageUrl: typeof item.imageUrl === "string" ? item.imageUrl.trim() : "",
    visible: item.visible !== false,
  }));
}

function mergePayment(stored: Partial<PaymentContent> | null): PaymentContent {
  if (!stored) return DEFAULT_PAYMENT;

  const notes = Array.isArray(stored.notes)
    ? stored.notes.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_PAYMENT.notes;
  const importantNotes = Array.isArray(stored.importantNotes)
    ? stored.importantNotes.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_PAYMENT.importantNotes;
  const bankFields =
    Array.isArray(stored.bankFields) && stored.bankFields.length > 0
      ? stored.bankFields.map((f, i) => ({
          id: f.id || `bf-${i + 1}`,
          label: (f.label || "").trim() || `Field ${i + 1}`,
          value: typeof f.value === "string" ? f.value : "",
        }))
      : DEFAULT_PAYMENT.bankFields.map((f) => ({ ...f }));

  return {
    ...DEFAULT_PAYMENT,
    ...stored,
    methods: mergePaymentMethods(stored.methods, DEFAULT_PAYMENT.methods),
    notes: notes.length > 0 ? notes : DEFAULT_PAYMENT.notes,
    importantNotes:
      importantNotes.length > 0 ? importantNotes : DEFAULT_PAYMENT.importantNotes,
    bankFields,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_PAYMENT.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_PAYMENT.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_PAYMENT.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_PAYMENT.introBody,
  };
}

export async function getPaymentContent(): Promise<PaymentContent> {
  try {
    const raw = await dbReadFile(PAYMENT_FILE);
    return mergePayment(JSON.parse(raw) as Partial<PaymentContent>);
  } catch {
    return DEFAULT_PAYMENT;
  }
}

export async function savePaymentContent(content: PaymentContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(PAYMENT_FILE, JSON.stringify(content, null, 2));
}

function mergePrivacy(stored: Partial<PrivacyContent> | null): PrivacyContent {
  if (!stored) return DEFAULT_PRIVACY;

  const sections =
    Array.isArray(stored.sections) && stored.sections.length > 0
      ? stored.sections.map((item, i) => ({
          id: item.id || `priv-${i + 1}`,
          title: (item.title || "").trim() || `Section ${i + 1}`,
          body: typeof item.body === "string" ? item.body : "",
          visible: item.visible !== false,
        }))
      : DEFAULT_PRIVACY.sections.map((s) => ({ ...s }));

  return {
    ...DEFAULT_PRIVACY,
    ...stored,
    sections,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_PRIVACY.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_PRIVACY.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_PRIVACY.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_PRIVACY.introBody,
  };
}

export async function getPrivacyContent(): Promise<PrivacyContent> {
  try {
    const raw = await dbReadFile(PRIVACY_FILE);
    return mergePrivacy(JSON.parse(raw) as Partial<PrivacyContent>);
  } catch {
    return DEFAULT_PRIVACY;
  }
}

export async function savePrivacyContent(content: PrivacyContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(PRIVACY_FILE, JSON.stringify(content, null, 2));
}

function mergeNepalVisa(stored: Partial<NepalVisaContent> | null): NepalVisaContent {
  if (!stored) return DEFAULT_NEPAL_VISA;

  const requirements =
    Array.isArray(stored.requirements) && stored.requirements.length > 0
      ? stored.requirements.map((item, i) => ({
          id: item.id || `req-${i + 1}`,
          title: (item.title || "").trim() || `Item ${i + 1}`,
          description: typeof item.description === "string" ? item.description : "",
          visible: item.visible !== false,
        }))
      : DEFAULT_NEPAL_VISA.requirements.map((r) => ({ ...r }));

  const fees =
    Array.isArray(stored.fees) && stored.fees.length > 0
      ? stored.fees.map((item, i) => ({
          id: item.id || `fee-${i + 1}`,
          label: (item.label || "").trim() || `Fee ${i + 1}`,
          price: typeof item.price === "string" ? item.price : "",
          note: typeof item.note === "string" ? item.note : "",
          visible: item.visible !== false,
        }))
      : DEFAULT_NEPAL_VISA.fees.map((f) => ({ ...f }));

  const entryPoints = Array.isArray(stored.entryPoints)
    ? stored.entryPoints.map((p) => (typeof p === "string" ? p : "")).filter(Boolean)
    : DEFAULT_NEPAL_VISA.entryPoints;
  const notes = Array.isArray(stored.notes)
    ? stored.notes.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_NEPAL_VISA.notes;

  return {
    ...DEFAULT_NEPAL_VISA,
    ...stored,
    requirements,
    fees,
    entryPoints: entryPoints.length > 0 ? entryPoints : DEFAULT_NEPAL_VISA.entryPoints,
    notes: notes.length > 0 ? notes : DEFAULT_NEPAL_VISA.notes,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_NEPAL_VISA.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_NEPAL_VISA.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_NEPAL_VISA.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_NEPAL_VISA.introBody,
  };
}

export async function getNepalVisaContent(): Promise<NepalVisaContent> {
  try {
    const raw = await dbReadFile(NEPAL_VISA_FILE);
    return mergeNepalVisa(JSON.parse(raw) as Partial<NepalVisaContent>);
  } catch {
    return DEFAULT_NEPAL_VISA;
  }
}

export async function saveNepalVisaContent(content: NepalVisaContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(NEPAL_VISA_FILE, JSON.stringify(content, null, 2));
}

function mergePermitsTims(stored: Partial<PermitsTimsContent> | null): PermitsTimsContent {
  if (!stored) return DEFAULT_PERMITS_TIMS;

  const restrictedPermits =
    Array.isArray(stored.restrictedPermits) && stored.restrictedPermits.length > 0
      ? stored.restrictedPermits.map((item, i) => ({
          id: item.id || `rp-${i + 1}`,
          region: (item.region || "").trim() || `Region ${i + 1}`,
          fee: typeof item.fee === "string" ? item.fee : "",
          visible: item.visible !== false,
        }))
      : DEFAULT_PERMITS_TIMS.restrictedPermits.map((r) => ({ ...r }));

  const parkEntries =
    Array.isArray(stored.parkEntries) && stored.parkEntries.length > 0
      ? stored.parkEntries.map((item, i) => ({
          id: item.id || `pk-${i + 1}`,
          name: (item.name || "").trim() || `Park ${i + 1}`,
          nepali: typeof item.nepali === "string" ? item.nepali : "",
          saarc: typeof item.saarc === "string" ? item.saarc : "",
          foreigner: typeof item.foreigner === "string" ? item.foreigner : "",
          childNote: typeof item.childNote === "string" ? item.childNote : "",
          whereToPay: typeof item.whereToPay === "string" ? item.whereToPay : "",
          visible: item.visible !== false,
        }))
      : DEFAULT_PERMITS_TIMS.parkEntries.map((p) => ({ ...p }));

  const notes = Array.isArray(stored.notes)
    ? stored.notes.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_PERMITS_TIMS.notes;

  return {
    ...DEFAULT_PERMITS_TIMS,
    ...stored,
    restrictedPermits,
    parkEntries,
    notes: notes.length > 0 ? notes : DEFAULT_PERMITS_TIMS.notes,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_PERMITS_TIMS.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_PERMITS_TIMS.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_PERMITS_TIMS.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_PERMITS_TIMS.introBody,
  };
}

export async function getPermitsTimsContent(): Promise<PermitsTimsContent> {
  try {
    const raw = await dbReadFile(PERMITS_TIMS_FILE);
    return mergePermitsTims(JSON.parse(raw) as Partial<PermitsTimsContent>);
  } catch {
    return DEFAULT_PERMITS_TIMS;
  }
}

export async function savePermitsTimsContent(content: PermitsTimsContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(PERMITS_TIMS_FILE, JSON.stringify(content, null, 2));
}

function mergeBestTime(stored: Partial<BestTimeContent> | null): BestTimeContent {
  if (!stored) return DEFAULT_BEST_TIME;

  const seasons =
    Array.isArray(stored.seasons) && stored.seasons.length > 0
      ? stored.seasons.map((item, i) => ({
          id: item.id || `season-${i + 1}`,
          name: (item.name || "").trim() || `Season ${i + 1}`,
          months: typeof item.months === "string" ? item.months : "",
          tagline: typeof item.tagline === "string" ? item.tagline : "",
          description: typeof item.description === "string" ? item.description : "",
          highlights: Array.isArray(item.highlights)
            ? item.highlights.map((h) => (typeof h === "string" ? h : "")).filter(Boolean)
            : [],
          condition: typeof item.condition === "string" ? item.condition : "",
          imageUrl: typeof item.imageUrl === "string" ? item.imageUrl.trim() : "",
          visible: item.visible !== false,
        }))
      : DEFAULT_BEST_TIME.seasons.map((s) => ({ ...s, highlights: [...s.highlights] }));

  const notes = Array.isArray(stored.notes)
    ? stored.notes.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_BEST_TIME.notes;

  return {
    ...DEFAULT_BEST_TIME,
    ...stored,
    seasons,
    notes: notes.length > 0 ? notes : DEFAULT_BEST_TIME.notes,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_BEST_TIME.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_BEST_TIME.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_BEST_TIME.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_BEST_TIME.introBody,
  };
}

export async function getBestTimeContent(): Promise<BestTimeContent> {
  try {
    const raw = await dbReadFile(BEST_TIME_FILE);
    return mergeBestTime(JSON.parse(raw) as Partial<BestTimeContent>);
  } catch {
    return DEFAULT_BEST_TIME;
  }
}

export async function saveBestTimeContent(content: BestTimeContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(BEST_TIME_FILE, JSON.stringify(content, null, 2));
}

function mergeTravelInsurance(
  stored: Partial<TravelInsuranceContent> | null,
): TravelInsuranceContent {
  if (!stored) return DEFAULT_TRAVEL_INSURANCE;

  const mustHaveItems =
    Array.isArray(stored.mustHaveItems) && stored.mustHaveItems.length > 0
      ? stored.mustHaveItems.map((item, i) => ({
          id: item.id || `mi-${i + 1}`,
          title: (item.title || "").trim() || `Item ${i + 1}`,
          description: typeof item.description === "string" ? item.description : "",
          visible: item.visible !== false,
        }))
      : DEFAULT_TRAVEL_INSURANCE.mustHaveItems.map((m) => ({ ...m }));

  const providerGroups =
    Array.isArray(stored.providerGroups) && stored.providerGroups.length > 0
      ? stored.providerGroups.map((item, i) => ({
          id: item.id || `pg-${i + 1}`,
          region: (item.region || "").trim() || `Region ${i + 1}`,
          providers: typeof item.providers === "string" ? item.providers : "",
          visible: item.visible !== false,
        }))
      : DEFAULT_TRAVEL_INSURANCE.providerGroups.map((p) => ({ ...p }));

  const notes = Array.isArray(stored.notes)
    ? stored.notes.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_TRAVEL_INSURANCE.notes;

  return {
    ...DEFAULT_TRAVEL_INSURANCE,
    ...stored,
    mustHaveItems,
    providerGroups,
    notes: notes.length > 0 ? notes : DEFAULT_TRAVEL_INSURANCE.notes,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_TRAVEL_INSURANCE.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_TRAVEL_INSURANCE.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_TRAVEL_INSURANCE.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_TRAVEL_INSURANCE.introBody,
  };
}

export async function getTravelInsuranceContent(): Promise<TravelInsuranceContent> {
  try {
    const raw = await dbReadFile(TRAVEL_INSURANCE_FILE);
    return mergeTravelInsurance(JSON.parse(raw) as Partial<TravelInsuranceContent>);
  } catch {
    return DEFAULT_TRAVEL_INSURANCE;
  }
}

export async function saveTravelInsuranceContent(
  content: TravelInsuranceContent,
): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(TRAVEL_INSURANCE_FILE, JSON.stringify(content, null, 2));
}

function mergeHealthSafety(stored: Partial<HealthSafetyContent> | null): HealthSafetyContent {
  if (!stored) return DEFAULT_HEALTH_SAFETY;

  const topics =
    Array.isArray(stored.topics) && stored.topics.length > 0
      ? stored.topics.map((item, i) => ({
          id: item.id || `hs-${i + 1}`,
          title: (item.title || "").trim() || `Topic ${i + 1}`,
          description: typeof item.description === "string" ? item.description : "",
          points: Array.isArray(item.points)
            ? item.points.map((p) => (typeof p === "string" ? p : "")).filter(Boolean)
            : [],
          visible: item.visible !== false,
        }))
      : DEFAULT_HEALTH_SAFETY.topics.map((t) => ({ ...t, points: [...t.points] }));

  const tips = Array.isArray(stored.tips)
    ? stored.tips.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_HEALTH_SAFETY.tips;
  const notes = Array.isArray(stored.notes)
    ? stored.notes.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_HEALTH_SAFETY.notes;

  return {
    ...DEFAULT_HEALTH_SAFETY,
    ...stored,
    topics,
    tips: tips.length > 0 ? tips : DEFAULT_HEALTH_SAFETY.tips,
    notes: notes.length > 0 ? notes : DEFAULT_HEALTH_SAFETY.notes,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_HEALTH_SAFETY.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_HEALTH_SAFETY.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_HEALTH_SAFETY.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_HEALTH_SAFETY.introBody,
  };
}

export async function getHealthSafetyContent(): Promise<HealthSafetyContent> {
  try {
    const raw = await dbReadFile(HEALTH_SAFETY_FILE);
    return mergeHealthSafety(JSON.parse(raw) as Partial<HealthSafetyContent>);
  } catch {
    return DEFAULT_HEALTH_SAFETY;
  }
}

export async function saveHealthSafetyContent(content: HealthSafetyContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(HEALTH_SAFETY_FILE, JSON.stringify(content, null, 2));
}

function mergeMoneyCurrency(
  stored: Partial<MoneyCurrencyContent> | null,
): MoneyCurrencyContent {
  if (!stored) return DEFAULT_MONEY_CURRENCY;

  const cards =
    Array.isArray(stored.cards) && stored.cards.length > 0
      ? stored.cards.map((item, i) => ({
          id: item.id || `mc-${i + 1}`,
          title: (item.title || "").trim() || `Card ${i + 1}`,
          description: typeof item.description === "string" ? item.description : "",
          visible: item.visible !== false,
        }))
      : DEFAULT_MONEY_CURRENCY.cards.map((c) => ({ ...c }));

  const tips = Array.isArray(stored.tips)
    ? stored.tips.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_MONEY_CURRENCY.tips;
  const notes = Array.isArray(stored.notes)
    ? stored.notes.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_MONEY_CURRENCY.notes;

  return {
    ...DEFAULT_MONEY_CURRENCY,
    ...stored,
    cards,
    tips: tips.length > 0 ? tips : DEFAULT_MONEY_CURRENCY.tips,
    notes: notes.length > 0 ? notes : DEFAULT_MONEY_CURRENCY.notes,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_MONEY_CURRENCY.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_MONEY_CURRENCY.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_MONEY_CURRENCY.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_MONEY_CURRENCY.introBody,
  };
}

export async function getMoneyCurrencyContent(): Promise<MoneyCurrencyContent> {
  try {
    const raw = await dbReadFile(MONEY_CURRENCY_FILE);
    return mergeMoneyCurrency(JSON.parse(raw) as Partial<MoneyCurrencyContent>);
  } catch {
    return DEFAULT_MONEY_CURRENCY;
  }
}

export async function saveMoneyCurrencyContent(content: MoneyCurrencyContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(MONEY_CURRENCY_FILE, JSON.stringify(content, null, 2));
}

function mergePackingChecklist(
  stored: Partial<PackingChecklistContent> | null,
): PackingChecklistContent {
  if (!stored) return DEFAULT_PACKING_CHECKLIST;

  const categories =
    Array.isArray(stored.categories) && stored.categories.length > 0
      ? stored.categories.map((item, i) => ({
          id: item.id || `pk-${i + 1}`,
          title: (item.title || "").trim() || `Category ${i + 1}`,
          description: typeof item.description === "string" ? item.description : "",
          items: Array.isArray(item.items)
            ? item.items.map((x) => (typeof x === "string" ? x : "")).filter(Boolean)
            : [],
          visible: item.visible !== false,
        }))
      : DEFAULT_PACKING_CHECKLIST.categories.map((c) => ({ ...c, items: [...c.items] }));

  const tips = Array.isArray(stored.tips)
    ? stored.tips.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_PACKING_CHECKLIST.tips;
  const notes = Array.isArray(stored.notes)
    ? stored.notes.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
    : DEFAULT_PACKING_CHECKLIST.notes;

  return {
    ...DEFAULT_PACKING_CHECKLIST,
    ...stored,
    categories,
    tips: tips.length > 0 ? tips : DEFAULT_PACKING_CHECKLIST.tips,
    notes: notes.length > 0 ? notes : DEFAULT_PACKING_CHECKLIST.notes,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : DEFAULT_PACKING_CHECKLIST.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || DEFAULT_PACKING_CHECKLIST.coverTitle,
    introHeading: stored.introHeading?.trim() || DEFAULT_PACKING_CHECKLIST.introHeading,
    introBody: stored.introBody?.trim() || DEFAULT_PACKING_CHECKLIST.introBody,
  };
}

export async function getPackingChecklistContent(): Promise<PackingChecklistContent> {
  try {
    const raw = await dbReadFile(PACKING_CHECKLIST_FILE);
    return mergePackingChecklist(JSON.parse(raw) as Partial<PackingChecklistContent>);
  } catch {
    return DEFAULT_PACKING_CHECKLIST;
  }
}

export async function savePackingChecklistContent(
  content: PackingChecklistContent,
): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(PACKING_CHECKLIST_FILE, JSON.stringify(content, null, 2));
}

function mergeTrekPage(
  stored: Partial<TrekPageContent> | null,
  fallback: TrekPageContent,
): TrekPageContent {
  if (!stored) return fallback;

  const strList = (value: unknown, def: string[]) =>
    Array.isArray(value)
      ? value.map((n) => (typeof n === "string" ? n : "")).filter(Boolean)
      : def;

  const facts =
    Array.isArray(stored.facts) && stored.facts.length > 0
      ? stored.facts.map((item, i) => ({
          id: item.id || `f-${i + 1}`,
          label: (item.label || "").trim() || `Fact ${i + 1}`,
          value: typeof item.value === "string" ? item.value : "",
          visible: item.visible !== false,
        }))
      : fallback.facts.map((f) => ({ ...f }));

  const days =
    Array.isArray(stored.days) && stored.days.length > 0
      ? stored.days.map((item, i) => ({
          id: item.id || `d-${i + 1}`,
          dayLabel: typeof item.dayLabel === "string" ? item.dayLabel : `Day ${i + 1}`,
          title: (item.title || "").trim() || `Day ${i + 1}`,
          maxAltitude: typeof item.maxAltitude === "string" ? item.maxAltitude : "",
          meals: typeof item.meals === "string" ? item.meals : "",
          accommodation: typeof item.accommodation === "string" ? item.accommodation : "",
          description: typeof item.description === "string" ? item.description : "",
          imageUrl: typeof item.imageUrl === "string" ? item.imageUrl.trim() : "",
          visible: item.visible !== false,
        }))
      : fallback.days.map((d) => ({ ...d }));

  const addons =
    Array.isArray(stored.addons) && stored.addons.length > 0
      ? stored.addons.map((item, i) => ({
          id: item.id || `a-${i + 1}`,
          title: (item.title || "").trim() || `Add-on ${i + 1}`,
          description: typeof item.description === "string" ? item.description : "",
          priceLabel: typeof item.priceLabel === "string" ? item.priceLabel : "",
          visible: item.visible !== false,
        }))
      : fallback.addons.map((a) => ({ ...a }));

  const gallery =
    Array.isArray(stored.gallery) && stored.gallery.length > 0
      ? stored.gallery.map((item, i) => ({
          id: item.id || `g-${i + 1}`,
          url: typeof item.url === "string" ? item.url.trim() : "",
          caption: typeof item.caption === "string" ? item.caption : "",
          visible: item.visible !== false,
        }))
      : fallback.gallery.map((g) => ({ ...g }));

  const essentialBlocks =
    Array.isArray(stored.essentialBlocks) && stored.essentialBlocks.length > 0
      ? stored.essentialBlocks.map((item, i) => ({
          id: item.id || `e-${i + 1}`,
          title: (item.title || "").trim() || `Block ${i + 1}`,
          body: typeof item.body === "string" ? item.body : "",
          imageUrl: typeof item.imageUrl === "string" ? item.imageUrl.trim() : "",
          visible: item.visible !== false,
        }))
      : fallback.essentialBlocks.map((e) => ({ ...e }));

  const equipmentGroups =
    Array.isArray(stored.equipmentGroups) && stored.equipmentGroups.length > 0
      ? stored.equipmentGroups.map((item, i) => ({
          id: item.id || `eq-${i + 1}`,
          title: (item.title || "").trim() || `Group ${i + 1}`,
          items: Array.isArray(item.items)
            ? item.items.map((x) => (typeof x === "string" ? x : "")).filter(Boolean)
            : [],
          visible: item.visible !== false,
        }))
      : fallback.equipmentGroups.map((g) => ({ ...g, items: [...g.items] }));

  const faqs =
    Array.isArray(stored.faqs) && stored.faqs.length > 0
      ? stored.faqs.map((item, i) => ({
          id: item.id || `q-${i + 1}`,
          question: (item.question || "").trim() || `Question ${i + 1}`,
          answer: typeof item.answer === "string" ? item.answer : "",
          visible: item.visible !== false,
        }))
      : fallback.faqs.map((f) => ({ ...f }));

  const groupDiscounts =
    Array.isArray(stored.groupDiscounts) && stored.groupDiscounts.length > 0
      ? stored.groupDiscounts.map((item, i) => ({
          id: item.id || `gd-${i + 1}`,
          paxLabel: (item.paxLabel || "").trim() || `${i + 1} pax`,
          price: typeof item.price === "number" ? item.price : 0,
          visible: item.visible !== false,
        }))
      : fallback.groupDiscounts.map((g) => ({ ...g }));

  const imgOr = (value: unknown, def: string) =>
    typeof value === "string" ? value.trim() : def;

  return {
    ...fallback,
    ...stored,
    facts,
    days,
    addons,
    gallery,
    essentialBlocks,
    equipmentGroups,
    faqs,
    groupDiscounts,
    highlights: strList(stored.highlights, fallback.highlights),
    advantages: strList(stored.advantages, fallback.advantages),
    whyPoints: strList(stored.whyPoints, fallback.whyPoints),
    prepPoints: strList(stored.prepPoints, fallback.prepPoints),
    availabilityNotes: strList(stored.availabilityNotes, fallback.availabilityNotes),
    includes: strList(stored.includes, fallback.includes),
    excludes: strList(stored.excludes, fallback.excludes),
    companyProvides: strList(stored.companyProvides, fallback.companyProvides),
    coverImageUrl: imgOr(stored.coverImageUrl, fallback.coverImageUrl),
    heroMainImageUrl: imgOr(stored.heroMainImageUrl, fallback.heroMainImageUrl),
    heroSideImage1Url: imgOr(stored.heroSideImage1Url, fallback.heroSideImage1Url),
    heroSideImage2Url: imgOr(stored.heroSideImage2Url, fallback.heroSideImage2Url),
    overviewImageUrl: imgOr(stored.overviewImageUrl, fallback.overviewImageUrl),
    title: stored.title?.trim() || fallback.title,
    coverTitle: stored.coverTitle?.trim() || fallback.coverTitle,
    breadcrumbLabel: stored.breadcrumbLabel?.trim() || fallback.breadcrumbLabel,
    shortTripBadge: stored.shortTripBadge?.trim() || fallback.shortTripBadge,
    groupDiscountHeading:
      stored.groupDiscountHeading?.trim() || fallback.groupDiscountHeading,
    customizeLabel: stored.customizeLabel?.trim() || fallback.customizeLabel,
    customizeHref: stored.customizeHref?.trim() || fallback.customizeHref,
    tripAdvisorRating: stored.tripAdvisorRating?.trim() || fallback.tripAdvisorRating,
    googleRating: stored.googleRating?.trim() || fallback.googleRating,
    trustpilotRating: stored.trustpilotRating?.trim() || fallback.trustpilotRating,
    price: typeof stored.price === "number" ? stored.price : fallback.price,
    compareAtPrice:
      stored.compareAtPrice === null
        ? null
        : typeof stored.compareAtPrice === "number"
          ? stored.compareAtPrice
          : fallback.compareAtPrice,
    rating: typeof stored.rating === "number" ? stored.rating : fallback.rating,
    reviewCount:
      typeof stored.reviewCount === "number" ? stored.reviewCount : fallback.reviewCount,
  };
}

export async function getPoonHillContent(): Promise<TrekPageContent> {
  try {
    const raw = await dbReadFile(POON_HILL_FILE);
    return mergeTrekPage(JSON.parse(raw) as Partial<TrekPageContent>, DEFAULT_POON_HILL);
  } catch {
    return DEFAULT_POON_HILL;
  }
}

export async function savePoonHillContent(content: TrekPageContent): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(POON_HILL_FILE, JSON.stringify(content, null, 2));
}

function mergeDestinationRegion(
  stored: Partial<DestinationRegionContent> | null,
  fallback: DestinationRegionContent,
): DestinationRegionContent {
  if (!stored) return fallback;

  const packages =
    Array.isArray(stored.packages) && stored.packages.length > 0
      ? stored.packages.map((item, i) => ({
          id: item.id || `evr-${i + 1}`,
          title: (item.title || "").trim() || `Package ${i + 1}`,
          durationDays:
            typeof item.durationDays === "number" ? item.durationDays : 0,
          rating: typeof item.rating === "number" ? item.rating : 5,
          reviewCount: typeof item.reviewCount === "number" ? item.reviewCount : 0,
          startLocation:
            typeof item.startLocation === "string" ? item.startLocation : "Kathmandu",
          price: typeof item.price === "number" ? item.price : 0,
          compareAtPrice:
            item.compareAtPrice === null
              ? null
              : typeof item.compareAtPrice === "number"
                ? item.compareAtPrice
                : null,
          href: typeof item.href === "string" ? item.href : "/contact",
          imageUrl: typeof item.imageUrl === "string" ? item.imageUrl.trim() : "",
          ctaLabel:
            typeof item.ctaLabel === "string" && item.ctaLabel.trim()
              ? item.ctaLabel
              : "Trip Details",
          visible: item.visible !== false,
        }))
      : fallback.packages.map((p) => ({ ...p }));

  return {
    ...fallback,
    ...stored,
    packages,
    coverImageUrl:
      typeof stored.coverImageUrl === "string"
        ? stored.coverImageUrl.trim()
        : fallback.coverImageUrl,
    coverTitle: stored.coverTitle?.trim() || fallback.coverTitle,
    coverSubtitle:
      typeof stored.coverSubtitle === "string"
        ? stored.coverSubtitle
        : fallback.coverSubtitle,
    eyebrow: stored.eyebrow?.trim() || fallback.eyebrow,
    heading: stored.heading?.trim() || fallback.heading,
    intro: typeof stored.intro === "string" ? stored.intro : fallback.intro,
    packagesHeading: stored.packagesHeading?.trim() || fallback.packagesHeading,
    metaTitle: stored.metaTitle?.trim() || fallback.metaTitle,
    metaDescription:
      typeof stored.metaDescription === "string"
        ? stored.metaDescription
        : fallback.metaDescription,
  };
}

export async function getEverestRegionContent(): Promise<DestinationRegionContent> {
  try {
    const raw = await dbReadFile(EVEREST_REGION_FILE);
    return mergeDestinationRegion(
      JSON.parse(raw) as Partial<DestinationRegionContent>,
      DEFAULT_EVEREST_REGION,
    );
  } catch {
    return DEFAULT_EVEREST_REGION;
  }
}

export async function saveEverestRegionContent(
  content: DestinationRegionContent,
): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(EVEREST_REGION_FILE, JSON.stringify(content, null, 2));
}

export async function getAnnapurnaRegionContent(): Promise<DestinationRegionContent> {
  try {
    const raw = await dbReadFile(ANNAPURNA_REGION_FILE);
    return mergeDestinationRegion(
      JSON.parse(raw) as Partial<DestinationRegionContent>,
      DEFAULT_ANNAPURNA_REGION,
    );
  } catch {
    return DEFAULT_ANNAPURNA_REGION;
  }
}

export async function saveAnnapurnaRegionContent(
  content: DestinationRegionContent,
): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(ANNAPURNA_REGION_FILE, JSON.stringify(content, null, 2));
}

export async function getLangtangRegionContent(): Promise<DestinationRegionContent> {
  try {
    const raw = await dbReadFile(LANGTANG_REGION_FILE);
    return mergeDestinationRegion(
      JSON.parse(raw) as Partial<DestinationRegionContent>,
      DEFAULT_LANGTANG_REGION,
    );
  } catch {
    return DEFAULT_LANGTANG_REGION;
  }
}

export async function saveLangtangRegionContent(
  content: DestinationRegionContent,
): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(LANGTANG_REGION_FILE, JSON.stringify(content, null, 2));
}

export async function getManasluRegionContent(): Promise<DestinationRegionContent> {
  try {
    const raw = await dbReadFile(MANASLU_REGION_FILE);
    return mergeDestinationRegion(
      JSON.parse(raw) as Partial<DestinationRegionContent>,
      DEFAULT_MANASLU_REGION,
    );
  } catch {
    return DEFAULT_MANASLU_REGION;
  }
}

export async function saveManasluRegionContent(
  content: DestinationRegionContent,
): Promise<void> {
  await ensureDataDir();
  await dbWriteFile(MANASLU_REGION_FILE, JSON.stringify(content, null, 2));
}

const LIBRARY_EXT_MIME: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

/**
 * Re-index any files on disk that are missing from media-library.json.
 * Upload files live in storage/media/library (survives deploy); the JSON
 * index can drift if an upload was interrupted or an older build wiped data/.
 */
async function reconcileMediaLibraryFromDisk(items: MediaItem[]): Promise<MediaItem[]> {
  await ensureMediaDirs();
  let names: string[] = [];
  try {
    names = await fs.readdir(MEDIA_LIBRARY_DIR);
  } catch {
    return items;
  }

  const known = new Set(items.map((i) => i.filename));
  const additions: MediaItem[] = [];

  for (const name of names) {
    if (!name || name.startsWith(".") || name === ".gitkeep") continue;
    if (known.has(name)) continue;
    const abs = path.join(MEDIA_LIBRARY_DIR, name);
    if (!abs.startsWith(MEDIA_LIBRARY_DIR)) continue;
    const st = await fs.stat(abs).catch(() => null);
    if (!st?.isFile()) continue;
    const ext = path.extname(name).toLowerCase();
    const mime = LIBRARY_EXT_MIME[ext];
    if (!mime) continue;
    const base = path.basename(name, ext) || name;
    additions.push({
      id: base,
      name: base,
      filename: name,
      url: `/media/library/${name}`,
      mimeType: mime,
      size: st.size,
      uploadedAt: st.mtime.toISOString(),
      status: "ready",
    });
    known.add(name);
  }

  if (!additions.length) return items;

  // Newest disk discoveries first, then existing index
  const next = [...additions, ...items];
  await saveMediaLibrary(next);
  return next;
}

export async function getMediaLibrary(): Promise<MediaItem[]> {
  await ensureMediaDirs();
  let items: MediaItem[] = [];
  try {
    const raw = await dbReadFile(MEDIA_FILE);
    items = JSON.parse(raw) as MediaItem[];
    if (!Array.isArray(items)) items = [];
  } catch {
    items = [];
  }
  return reconcileMediaLibraryFromDisk(items);
}

export async function saveMediaLibrary(items: MediaItem[]): Promise<void> {
  await dbWriteFile(MEDIA_FILE, JSON.stringify(items, null, 2));

  // Keep Media table metadata aligned with the CMS library index.
  const filenames = new Set(
    items.map((item) => item.filename).filter((name): name is string => Boolean(name)),
  );
  const existing = await prisma.media.findMany({ select: { filename: true } });
  const stale = existing
    .map((row) => row.filename)
    .filter((filename) => !filenames.has(filename));
  if (stale.length) {
    await prisma.media.deleteMany({ where: { filename: { in: stale } } });
  }
  for (const item of items) {
    if (!item.filename) continue;
    const mediaPath = path.posix.join("storage/media/library", item.filename);
    await prisma.media.upsert({
      where: { filename: item.filename },
      update: {
        originalName: item.name || item.filename,
        mimeType: item.mimeType || null,
        size: typeof item.size === "number" ? item.size : null,
        path: mediaPath,
      },
      create: {
        ...(item.id ? { id: item.id } : {}),
        filename: item.filename,
        originalName: item.name || item.filename,
        mimeType: item.mimeType || null,
        size: typeof item.size === "number" ? item.size : null,
        path: mediaPath,
      },
    });
  }
}

export function cleanMediaUrl(url: string): string {
  return url.split("?")[0].trim();
}

export function isProtectedDefaultVideo(url: string): boolean {
  return cleanMediaUrl(url) === "/media/hero/hero.mp4";
}

function absolutePathFromPublicUrl(url: string): string | null {
  const clean = cleanMediaUrl(url);
  if (!clean.startsWith("/media/")) return null;

  // Uploaded library assets live in durable storage/
  if (clean.startsWith("/media/library/")) {
    const filename = path.basename(clean);
    if (!filename || filename === "." || filename === "..") return null;
    return path.join(MEDIA_LIBRARY_DIR, filename);
  }

  const rel = clean.replace(/^\//, "");
  const abs = path.join(process.cwd(), "public", rel);
  const publicRoot = path.join(process.cwd(), "public");
  if (!abs.startsWith(publicRoot)) return null;
  return abs;
}

export async function permanentlyDeleteMedia(opts: {
  id?: string;
  url?: string;
}): Promise<{ removed: boolean; clearedHero: boolean }> {
  await ensureMediaDirs();
  let library = await getMediaLibrary();
  let target = opts.id ? library.find((i) => i.id === opts.id) : undefined;

  if (!target && opts.url) {
    const clean = cleanMediaUrl(opts.url);
    target = library.find((i) => cleanMediaUrl(i.url) === clean);
  }

  const urlsToWipe = new Set<string>();
  if (target) urlsToWipe.add(cleanMediaUrl(target.url));
  if (opts.url) urlsToWipe.add(cleanMediaUrl(opts.url));

  let removed = false;

  for (const url of urlsToWipe) {
    if (!url || isProtectedDefaultVideo(url)) continue;
    const abs = absolutePathFromPublicUrl(url);
    if (abs) {
      try {
        await fs.unlink(abs);
        removed = true;
      } catch {
        // already gone
      }
    }
  }

  if (target) {
    library = library.filter((i) => i.id !== target!.id);
    removed = true;
  } else if (opts.url) {
    const clean = cleanMediaUrl(opts.url);
    const before = library.length;
    library = library.filter((i) => cleanMediaUrl(i.url) !== clean);
    if (library.length !== before) removed = true;
  }

  await saveMediaLibrary(library);

  let clearedHero = false;
  const hero = await getHeroContent();
  const heroUrl = cleanMediaUrl(hero.videoUrl);
  for (const url of urlsToWipe) {
    if (url && heroUrl === url && !isProtectedDefaultVideo(url)) {
      await saveHeroContent({ ...hero, videoUrl: DEFAULT_HERO.videoUrl });
      clearedHero = true;
      break;
    }
  }

  return { removed, clearedHero };
}
