import type { Metadata } from "next";
import { WatchlistPageClient } from "@/components/watchlist/WatchlistPageClient";

export const metadata: Metadata = {
  title: "Watchlist | Summit Seek",
  description: "Saved packages and trips — book anytime without signing in.",
};

export default function WatchlistPage() {
  return <WatchlistPageClient />;
}
