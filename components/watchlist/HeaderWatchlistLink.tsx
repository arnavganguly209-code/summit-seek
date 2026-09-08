"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWatchlist } from "@/components/watchlist/WatchlistProvider";

type Props = {
  solid?: boolean;
  className?: string;
  onNavigate?: () => void;
};

export function HeaderWatchlistLink({ solid = true, className, onNavigate }: Props) {
  const { count } = useWatchlist();

  return (
    <Link
      href="/watchlist"
      onClick={onNavigate}
      className={cn(
        "relative inline-flex size-9 shrink-0 items-center justify-center transition",
        solid ? "text-[#0b1524] hover:text-[#e11d48]" : "text-white hover:text-[#fecaca]",
        className,
      )}
      aria-label={count > 0 ? `Watchlist, ${count} saved` : "Watchlist"}
    >
      <Heart className="size-[18px] stroke-[1.75]" />
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#e11d48] px-1 text-[10px] font-bold leading-none text-white">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
