"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Gem,
  Heart,
  MapPin,
  Medal,
  Mountain,
  Star,
  Landmark,
} from "lucide-react";
import type {
  FeaturedCategory,
  FeaturedPackage,
  FeaturedPackagesContent,
  FeaturedTabIcon,
} from "@/types/featured-packages";
import { cn } from "@/lib/utils";

const iconMap: Record<FeaturedTabIcon, typeof Medal> = {
  medal: Medal,
  mountain: Mountain,
  stupa: Landmark,
  diamond: Gem,
};

function formatUsd(price: number) {
  return `US$${price.toLocaleString("en-US")}`;
}

function PackageCard({ pkg }: { pkg: FeaturedPackage }) {
  const [saved, setSaved] = useState(false);
  const samePlace =
    pkg.startLocation.trim().toLowerCase() ===
    pkg.endLocation.trim().toLowerCase();
  const imageSrc = pkg.imageUrl.split("?")[0];
  const isLocal = imageSrc.startsWith("/");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-[#e6ebf2] bg-white shadow-[0_8px_28px_rgba(11,21,36,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,21,36,0.11)]">
      <div className="relative aspect-[16/11] overflow-hidden bg-[#0b1524]/5">
        {isLocal ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Image
            src={pkg.imageUrl}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1524]/30 via-transparent to-transparent" />
        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          onClick={() => setSaved((v) => !v)}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border border-white/50 bg-white/95 text-[#0b1524] shadow-[0_6px_16px_rgba(11,21,36,0.14)] backdrop-blur-sm transition hover:bg-white"
        >
          <Heart
            className={cn(
              "size-4",
              saved ? "fill-[#c23b3b] text-[#c23b3b]" : "text-[#0b1524]",
            )}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5 font-[family-name:var(--font-ui)]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium text-[#5a6577]">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-[#1d4ed8]" />
            Duration: {pkg.durationDays}{" "}
            {pkg.durationDays === 1 ? "Day" : "Days"}
          </span>
          {pkg.reviewCount > 0 ? (
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-[#D8A34A] text-[#D8A34A]" />
              <span className="font-bold text-[#0b1524]">
                {pkg.rating.toFixed(1)}
              </span>
              <span className="text-[#8a93a3]">
                ({pkg.reviewCount}{" "}
                {pkg.reviewCount === 1 ? "Review" : "Reviews"})
              </span>
            </span>
          ) : null}
        </div>

        <h3 className="mt-2.5 text-[15px] font-bold leading-snug tracking-[-0.015em] text-[#0b1524] sm:text-[16px]">
          <Link href={pkg.href} className="transition-colors hover:text-[#1d4ed8]">
            {pkg.title}
          </Link>
        </h3>

        <div className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-[#5a6577]">
          <span className="inline-flex min-w-0 items-center gap-1">
            <MapPin className="size-3.5 shrink-0 text-[#1d4ed8]" />
            <span className="truncate">{pkg.startLocation}</span>
          </span>
          {!samePlace ? (
            <>
              <span className="h-px min-w-[28px] flex-1 bg-[#d5dbe6]" aria-hidden />
              <span className="inline-flex min-w-0 items-center gap-1">
                <MapPin className="size-3.5 shrink-0 text-[#1d4ed8]" />
                <span className="truncate">{pkg.endLocation}</span>
              </span>
            </>
          ) : null}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a93a3]">
              Per Person
            </p>
            <p className="mt-0.5 flex flex-wrap items-baseline gap-2">
              <span className="text-[1.3rem] font-extrabold leading-none tracking-[-0.02em] text-[#0b1524]">
                {formatUsd(pkg.price)}
              </span>
              {pkg.compareAtPrice && pkg.compareAtPrice > pkg.price ? (
                <span className="text-[13px] font-semibold text-[#9aa3b2] line-through">
                  {formatUsd(pkg.compareAtPrice)}
                </span>
              ) : null}
            </p>
          </div>
          <Link
            href={pkg.href}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-[#0b1524] px-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_rgba(11,21,36,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_14px_28px_rgba(29,78,216,0.35)]"
          >
            Trip Details
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

type Props = {
  content: FeaturedPackagesContent;
};

export function FeaturedAdventureTabs({ content }: Props) {
  const categories = content.categories.filter((c) =>
    c.packages.some((p) => p.visible !== false),
  );
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const active: FeaturedCategory | undefined =
    categories.find((c) => c.id === activeId) ?? categories[0];

  const packages = (active?.packages ?? [])
    .filter((p) => p.visible !== false)
    .slice(0, 4);

  return (
    <section
      id="featured-adventures"
      className="relative overflow-hidden bg-[#f5f7fb] py-7 sm:py-8 lg:py-9"
      aria-labelledby="featured-adventures-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0b1524]/10 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-4 font-[family-name:var(--font-ui)] sm:px-6 lg:px-8">
        <div className="sr-only">
          <h2 id="featured-adventures-heading">Featured Adventures</h2>
        </div>

        <div
          role="tablist"
          aria-label="Adventure categories"
          className="flex gap-1 overflow-x-auto border-b border-[#dce2ec] pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Medal;
            const selected = cat.id === active?.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(cat.id)}
                className={cn(
                  "relative inline-flex shrink-0 items-center gap-2 px-3.5 py-3.5 text-[15px] font-extrabold tracking-[-0.015em] transition-colors sm:px-5 sm:text-[17px]",
                  selected
                    ? "text-[#0b1524]"
                    : "text-[#6b7587] hover:text-[#0b1524]",
                )}
              >
                <Icon
                  className={cn(
                    "size-[1.15rem] transition-colors sm:size-5",
                    selected ? "text-[#1d4ed8]" : "text-[#9aa3b2]",
                  )}
                  strokeWidth={2.4}
                />
                <span className="whitespace-nowrap">{cat.label}</span>
                {selected ? (
                  <motion.span
                    layoutId="featured-tab-underline"
                    className="absolute inset-x-2 -bottom-px h-[2.5px] rounded-full bg-[#0b1524]"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id ?? "empty"}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mt-8 grid grid-cols-1 gap-5 sm:mt-9 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4"
          >
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
