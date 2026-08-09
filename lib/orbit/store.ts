import { promises as fs } from "fs";
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
const MEDIA_FILE = path.join(DATA_DIR, "media-library.json");

/** Durable upload root — survives `git reset --hard` (unlike public/). */
export const STORAGE_MEDIA_DIR = path.join(process.cwd(), "storage", "media");
export const MEDIA_LIBRARY_DIR = path.join(STORAGE_MEDIA_DIR, "library");
export const MEDIA_UPLOADS_DIR = path.join(STORAGE_MEDIA_DIR, ".uploads");
/** Default hero starter video stays in public (tracked in git). */
export const MEDIA_HERO_DIR = path.join(process.cwd(), "public", "media", "hero");
const LEGACY_PUBLIC_LIBRARY = path.join(process.cwd(), "public", "media", "library");

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
    const raw = await fs.readFile(HERO_FILE, "utf8");
    return { ...DEFAULT_HERO, ...JSON.parse(raw) } as HeroContent;
  } catch {
    return DEFAULT_HERO;
  }
}

export async function saveHeroContent(content: HeroContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(HERO_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(FEATURED_PACKAGES_FILE, "utf8");
    return mergeFeaturedPackages(JSON.parse(raw) as FeaturedPackagesContent);
  } catch {
    return DEFAULT_FEATURED_PACKAGES;
  }
}

export async function saveFeaturedPackages(
  content: FeaturedPackagesContent,
): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(
    FEATURED_PACKAGES_FILE,
    JSON.stringify(content, null, 2),
    "utf8",
  );
}

export async function getAboutIntro(): Promise<AboutIntroContent> {
  try {
    const raw = await fs.readFile(ABOUT_INTRO_FILE, "utf8");
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
  await fs.writeFile(ABOUT_INTRO_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(BEST_SELLING_FILE, "utf8");
    return mergeBestSelling(JSON.parse(raw) as Partial<BestSellingPackagesContent>);
  } catch {
    return DEFAULT_BEST_SELLING;
  }
}

export async function saveBestSellingPackages(
  content: BestSellingPackagesContent,
): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(BEST_SELLING_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(WHAT_WE_OFFER_FILE, "utf8");
    return mergeWhatWeOffer(JSON.parse(raw) as Partial<WhatWeOfferContent>);
  } catch {
    return DEFAULT_WHAT_WE_OFFER;
  }
}

export async function saveWhatWeOffer(content: WhatWeOfferContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(WHAT_WE_OFFER_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(UPCOMING_TRIPS_FILE, "utf8");
    return mergeUpcomingTrips(JSON.parse(raw) as Partial<UpcomingTripsContent>);
  } catch {
    return DEFAULT_UPCOMING_TRIPS;
  }
}

export async function saveUpcomingTrips(content: UpcomingTripsContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(UPCOMING_TRIPS_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(TRAVELER_REVIEWS_FILE, "utf8");
    return mergeTravelerReviews(JSON.parse(raw) as Partial<TravelerReviewsContent>);
  } catch {
    return DEFAULT_TRAVELER_REVIEWS;
  }
}

export async function saveTravelerReviews(
  content: TravelerReviewsContent,
): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(TRAVELER_REVIEWS_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(TRAVEL_ARTICLES_FILE, "utf8");
    return mergeTravelArticles(JSON.parse(raw) as Partial<TravelArticlesContent>);
  } catch {
    return DEFAULT_TRAVEL_ARTICLES;
  }
}

export async function saveTravelArticles(content: TravelArticlesContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(TRAVEL_ARTICLES_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(FOOTER_FILE, "utf8");
    return mergeFooter(JSON.parse(raw) as Partial<FooterContent>);
  } catch {
    return DEFAULT_FOOTER;
  }
}

export async function saveFooterContent(content: FooterContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(FOOTER_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(CONTACT_FILE, "utf8");
    return mergeContact(JSON.parse(raw) as Partial<ContactPageContent>);
  } catch {
    return DEFAULT_CONTACT;
  }
}

export async function saveContactContent(content: ContactPageContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(CONTACT_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(BLOG_FILE, "utf8");
    return mergeBlog(JSON.parse(raw) as Partial<BlogPageContent>);
  } catch {
    return DEFAULT_BLOG;
  }
}

export async function saveBlogContent(content: BlogPageContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(BLOG_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(ABOUT_PAGE_FILE, "utf8");
    return mergeAboutPage(JSON.parse(raw) as Partial<AboutPageContent>);
  } catch {
    return DEFAULT_ABOUT_PAGE;
  }
}

export async function saveAboutPageContent(content: AboutPageContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(ABOUT_PAGE_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(LEGAL_FILE, "utf8");
    return mergeLegalPage(JSON.parse(raw) as Partial<LegalPageContent>);
  } catch {
    return DEFAULT_LEGAL_PAGE;
  }
}

export async function saveLegalContent(content: LegalPageContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(LEGAL_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(WHY_SUMMIT_SEEK_FILE, "utf8");
    return mergeWhySummitSeek(JSON.parse(raw) as Partial<WhySummitSeekContent>);
  } catch {
    return DEFAULT_WHY_SUMMIT_SEEK;
  }
}

export async function saveWhySummitSeekContent(
  content: WhySummitSeekContent,
): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(WHY_SUMMIT_SEEK_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(RESPONSIBLE_TRAVEL_FILE, "utf8");
    return mergeResponsibleTravel(JSON.parse(raw) as Partial<ResponsibleTravelContent>);
  } catch {
    return DEFAULT_RESPONSIBLE_TRAVEL;
  }
}

export async function saveResponsibleTravelContent(
  content: ResponsibleTravelContent,
): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(RESPONSIBLE_TRAVEL_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(AFFILIATE_FILE, "utf8");
    return mergeAffiliate(JSON.parse(raw) as Partial<AffiliateContent>);
  } catch {
    return DEFAULT_AFFILIATE;
  }
}

export async function saveAffiliateContent(content: AffiliateContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(AFFILIATE_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(TERMS_FILE, "utf8");
    return mergeTerms(JSON.parse(raw) as Partial<TermsContent>);
  } catch {
    return DEFAULT_TERMS;
  }
}

export async function saveTermsContent(content: TermsContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(TERMS_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(PAYMENT_FILE, "utf8");
    return mergePayment(JSON.parse(raw) as Partial<PaymentContent>);
  } catch {
    return DEFAULT_PAYMENT;
  }
}

export async function savePaymentContent(content: PaymentContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(PAYMENT_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(PRIVACY_FILE, "utf8");
    return mergePrivacy(JSON.parse(raw) as Partial<PrivacyContent>);
  } catch {
    return DEFAULT_PRIVACY;
  }
}

export async function savePrivacyContent(content: PrivacyContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(PRIVACY_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(NEPAL_VISA_FILE, "utf8");
    return mergeNepalVisa(JSON.parse(raw) as Partial<NepalVisaContent>);
  } catch {
    return DEFAULT_NEPAL_VISA;
  }
}

export async function saveNepalVisaContent(content: NepalVisaContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(NEPAL_VISA_FILE, JSON.stringify(content, null, 2), "utf8");
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
    const raw = await fs.readFile(PERMITS_TIMS_FILE, "utf8");
    return mergePermitsTims(JSON.parse(raw) as Partial<PermitsTimsContent>);
  } catch {
    return DEFAULT_PERMITS_TIMS;
  }
}

export async function savePermitsTimsContent(content: PermitsTimsContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(PERMITS_TIMS_FILE, JSON.stringify(content, null, 2), "utf8");
}

export async function getMediaLibrary(): Promise<MediaItem[]> {
  try {
    const raw = await fs.readFile(MEDIA_FILE, "utf8");
    return JSON.parse(raw) as MediaItem[];
  } catch {
    return [];
  }
}

export async function saveMediaLibrary(items: MediaItem[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(MEDIA_FILE, JSON.stringify(items, null, 2), "utf8");
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
