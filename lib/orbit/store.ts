import { promises as fs } from "fs";
import path from "path";
import type { HeroContent, MediaItem } from "@/types/hero";
import { DEFAULT_HERO } from "@/lib/orbit/defaults";

const DATA_DIR = path.join(process.cwd(), "data");
const HERO_FILE = path.join(DATA_DIR, "hero.json");
const MEDIA_FILE = path.join(DATA_DIR, "media-library.json");
export const MEDIA_LIBRARY_DIR = path.join(process.cwd(), "public", "media", "library");
export const MEDIA_HERO_DIR = path.join(process.cwd(), "public", "media", "hero");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function ensureMediaDirs() {
  await fs.mkdir(MEDIA_LIBRARY_DIR, { recursive: true });
  await fs.mkdir(MEDIA_HERO_DIR, { recursive: true });
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

/** Strip cache-buster query from media URLs */
export function cleanMediaUrl(url: string): string {
  return url.split("?")[0].trim();
}

export function isProtectedDefaultVideo(url: string): boolean {
  return cleanMediaUrl(url) === "/media/hero/hero.mp4";
}

function absolutePathFromPublicUrl(url: string): string | null {
  const clean = cleanMediaUrl(url);
  if (!clean.startsWith("/media/")) return null;
  const rel = clean.replace(/^\//, "");
  const abs = path.join(process.cwd(), "public", rel);
  const publicRoot = path.join(process.cwd(), "public");
  if (!abs.startsWith(publicRoot)) return null;
  return abs;
}

/** Permanently delete a media file + library record. Returns whether anything was removed. */
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

  // If hero currently points at deleted media, clear to default immediately
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
