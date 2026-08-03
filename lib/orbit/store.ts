import { promises as fs } from "fs";
import path from "path";
import type { HeroContent, MediaItem } from "@/types/hero";
import type { FeaturedPackagesContent } from "@/types/featured-packages";
import type { AboutIntroContent } from "@/types/about-intro";
import type { BestSellingPackagesContent } from "@/types/best-selling-packages";
import { DEFAULT_HERO } from "@/lib/orbit/defaults";
import { DEFAULT_FEATURED_PACKAGES } from "@/lib/orbit/featured-packages-defaults";
import { DEFAULT_ABOUT_INTRO } from "@/lib/orbit/about-intro-defaults";
import { DEFAULT_BEST_SELLING } from "@/lib/orbit/best-selling-defaults";

const DATA_DIR = path.join(process.cwd(), "data");
const HERO_FILE = path.join(DATA_DIR, "hero.json");
const FEATURED_PACKAGES_FILE = path.join(DATA_DIR, "featured-packages.json");
const ABOUT_INTRO_FILE = path.join(DATA_DIR, "about-intro.json");
const BEST_SELLING_FILE = path.join(DATA_DIR, "best-selling-packages.json");
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
    return { ...DEFAULT_ABOUT_INTRO, ...stored, highlights };
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
