import { promises as fs } from "fs";
import path from "path";
import type { HeroContent, MediaItem } from "@/types/hero";
import { DEFAULT_HERO } from "@/lib/orbit/defaults";

const DATA_DIR = path.join(process.cwd(), "data");
const HERO_FILE = path.join(DATA_DIR, "hero.json");
const MEDIA_FILE = path.join(DATA_DIR, "media-library.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
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
