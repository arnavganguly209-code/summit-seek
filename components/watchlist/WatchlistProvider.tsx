"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { WatchlistItem } from "@/types/watchlist";
import {
  WATCHLIST_EVENT,
  WATCHLIST_STORAGE_KEY,
  mergeWatchlistItems,
  normalizeHref,
  normalizeWatchlistItem,
  readLocalWatchlist,
  writeLocalWatchlist,
} from "@/lib/watchlist/helpers";

type WatchlistInput = {
  href: string;
  title: string;
  imageUrl?: string;
  price?: number;
  compareAtPrice?: number | null;
  durationLabel?: string;
};

type WatchlistContextValue = {
  items: WatchlistItem[];
  count: number;
  ready: boolean;
  has: (href: string) => boolean;
  toggle: (input: WatchlistInput) => boolean;
  remove: (href: string) => void;
  clear: () => void;
};

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

async function syncToServer(items: WatchlistItem[]) {
  try {
    await fetch("/api/watchlist", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
  } catch {
    /* offline / ignore */
  }
}

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [ready, setReady] = useState(false);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const persist = useCallback((next: WatchlistItem[], sync = true) => {
    const merged = mergeWatchlistItems([], next);
    setItems(merged);
    writeLocalWatchlist(merged);
    if (!sync) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      void syncToServer(merged);
    }, 250);
  }, []);

  useEffect(() => {
    const local = readLocalWatchlist();
    setItems(local);
    setReady(true);

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/watchlist", { cache: "no-store" });
        const data = (await res.json()) as { ok?: boolean; items?: WatchlistItem[] };
        if (cancelled || !data.ok) return;
        const merged = mergeWatchlistItems(local, Array.isArray(data.items) ? data.items : []);
        setItems(merged);
        writeLocalWatchlist(merged);
        if (merged.length !== (data.items || []).length) {
          void syncToServer(merged);
        }
      } catch {
        /* keep local */
      }
    })();

    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key !== WATCHLIST_STORAGE_KEY) return;
      setItems(readLocalWatchlist());
    };
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<WatchlistItem[]>).detail;
      if (Array.isArray(detail)) setItems(mergeWatchlistItems([], detail));
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(WATCHLIST_EVENT, onCustom as EventListener);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(WATCHLIST_EVENT, onCustom as EventListener);
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, []);

  const has = useCallback(
    (href: string) => {
      const key = normalizeHref(href);
      return items.some((item) => item.href === key);
    },
    [items],
  );

  const toggle = useCallback(
    (input: WatchlistInput) => {
      const key = normalizeHref(input.href);
      const exists = itemsRef.current.some((item) => item.href === key);
      if (exists) {
        persist(itemsRef.current.filter((item) => item.href !== key));
        return false;
      }
      const item = normalizeWatchlistItem({
        href: key,
        title: input.title,
        imageUrl: input.imageUrl || "",
        price: input.price || 0,
        compareAtPrice: input.compareAtPrice ?? null,
        durationLabel: input.durationLabel || "",
        addedAt: new Date().toISOString(),
      });
      if (!item) return false;
      persist([item, ...itemsRef.current]);
      return true;
    },
    [persist],
  );

  const remove = useCallback(
    (href: string) => {
      const key = normalizeHref(href);
      persist(itemsRef.current.filter((item) => item.href !== key));
    },
    [persist],
  );

  const clear = useCallback(() => {
    persist([]);
  }, [persist]);

  const value = useMemo<WatchlistContextValue>(
    () => ({
      items,
      count: items.length,
      ready,
      has,
      toggle,
      remove,
      clear,
    }),
    [items, ready, has, toggle, remove, clear],
  );

  return (
    <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }
  return ctx;
}
