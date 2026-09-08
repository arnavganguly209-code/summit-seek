import type { WatchlistItem, WatchlistsContent } from "@/types/watchlist";

export const WATCHLIST_STORAGE_KEY = "summit-seek-watchlist-v1";
export const WATCHLIST_EVENT = "summit-seek-watchlist-change";

export const DEFAULT_WATCHLISTS: WatchlistsContent = { byIp: {} };

export function normalizeHref(href: string): string {
  const raw = String(href || "").trim();
  if (!raw) return "";
  try {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return new URL(raw).pathname.replace(/\/+$/, "") || "/";
    }
  } catch {
    /* ignore */
  }
  const path = raw.split("?")[0].split("#")[0];
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return cleaned.replace(/\/+$/, "") || "/";
}

export function normalizeWatchlistItem(
  raw: Partial<WatchlistItem> | null | undefined,
): WatchlistItem | null {
  if (!raw) return null;
  const href = normalizeHref(String(raw.href || ""));
  const title = String(raw.title || "").trim();
  if (!href || !title) return null;
  return {
    href,
    title,
    imageUrl: String(raw.imageUrl || "").trim(),
    price: Number(raw.price) || 0,
    compareAtPrice:
      raw.compareAtPrice == null || Number.isNaN(Number(raw.compareAtPrice))
        ? null
        : Number(raw.compareAtPrice),
    durationLabel: String(raw.durationLabel || "").trim(),
    addedAt: String(raw.addedAt || new Date().toISOString()),
  };
}

export function mergeWatchlistItems(
  a: WatchlistItem[],
  b: WatchlistItem[],
): WatchlistItem[] {
  const map = new Map<string, WatchlistItem>();
  for (const item of [...a, ...b]) {
    const n = normalizeWatchlistItem(item);
    if (!n) continue;
    const prev = map.get(n.href);
    if (!prev || n.addedAt > prev.addedAt) map.set(n.href, n);
  }
  return [...map.values()].sort((x, y) => y.addedAt.localeCompare(x.addedAt));
}

export function mergeWatchlists(
  stored: Partial<WatchlistsContent> | null | undefined,
): WatchlistsContent {
  const byIp: Record<string, WatchlistItem[]> = {};
  const source = stored?.byIp && typeof stored.byIp === "object" ? stored.byIp : {};
  for (const [ip, items] of Object.entries(source)) {
    if (!Array.isArray(items)) continue;
    byIp[ip] = mergeWatchlistItems([], items);
  }
  return { byIp };
}

export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for") || "";
  const first = forwarded.split(",")[0]?.trim();
  if (first) return first.slice(0, 64);
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 64);
  return "unknown";
}

export function readLocalWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WatchlistItem[];
    return mergeWatchlistItems([], Array.isArray(parsed) ? parsed : []);
  } catch {
    return [];
  }
}

export function writeLocalWatchlist(items: WatchlistItem[]) {
  if (typeof window === "undefined") return;
  const next = mergeWatchlistItems([], items);
  window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(WATCHLIST_EVENT, { detail: next }));
}
