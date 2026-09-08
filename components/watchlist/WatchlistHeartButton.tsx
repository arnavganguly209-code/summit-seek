"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWatchlist } from "@/components/watchlist/WatchlistProvider";

type Props = {
  href: string;
  title: string;
  imageUrl?: string;
  price?: number;
  compareAtPrice?: number | null;
  durationLabel?: string;
  className?: string;
  iconClassName?: string;
  variant?: "light" | "dark";
};

export function WatchlistHeartButton({
  href,
  title,
  imageUrl,
  price,
  compareAtPrice,
  durationLabel,
  className,
  iconClassName,
  variant = "light",
}: Props) {
  const { has, toggle, ready } = useWatchlist();
  const saved = ready && has(href);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle({
          href,
          title,
          imageUrl,
          price,
          compareAtPrice,
          durationLabel,
        });
      }}
      className={cn(
        "inline-flex items-center justify-center transition",
        variant === "light"
          ? "text-[#5a6577] hover:text-[#e11d48]"
          : "text-white hover:text-[#fecaca]",
        saved && "text-[#e11d48] hover:text-[#be123c]",
        className,
      )}
    >
      <Heart
        className={cn("size-4", saved && "fill-current", iconClassName)}
        strokeWidth={1.85}
      />
    </button>
  );
}
