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
import { DEFAULT_HERO } from "@/lib/orbit/defaults";
import { DEFAULT_FEATURED_PACKAGES } from "@/lib/orbit/featured-packages-defaults";
import { DEFAULT_ABOUT_INTRO } from "@/lib/orbit/about-intro-defaults";
import { DEFAULT_BEST_SELLING } from "@/lib/orbit/best-selling-defaults";
import { DEFAULT_WHAT_WE_OFFER } from "@/lib/orbit/what-we-offer-defaults";
import { DEFAULT_UPCOMING_TRIPS } from "@/lib/orbit/upcoming-trips-defaults";
import { DEFAULT_TRAVELER_REVIEWS } from "@/lib/orbit/traveler-reviews-defaults";
import { DEFAULT_TRAVEL_ARTICLES } from "@/lib/orbit/travel-articles-defaults";
import { DEFAULT_FOOTER } from "@/lib/orbit/footer-defaults";

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
        return saved ? { ...defPkg, ...saved, id: saved.id || defPkg.id } : defPkg;
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
    return items.map((l, i) => ({
      label: l.label?.trim() || fallback[i]?.label || "Link",
      href: l.href?.trim() || fallback[i]?.href || "/",
    }));
  };

  return {
    topLogoUrl: stored.topLogoUrl?.trim() || DEFAULT_FOOTER.topLogoUrl,
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
