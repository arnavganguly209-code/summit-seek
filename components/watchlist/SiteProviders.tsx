"use client";

import { WatchlistProvider } from "@/components/watchlist/WatchlistProvider";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return <WatchlistProvider>{children}</WatchlistProvider>;
}
