"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, Heart, MapPin, Star } from "lucide-react";
import type {
  DestinationPackage,
  DestinationRegionContent,
} from "@/types/destination-region-cms";
import { PageCover } from "@/components/site/PageCover";
import { cn } from "@/lib/utils";

const ui = "font-[family-name:var(--font-ui)]";

function formatUsd(price: number) {
  return `US$${price.toLocaleString("en-US")}`;
}

function durationLabel(days: number) {
  return days === 1 ? "Duration: 1 Day" : `Duration: ${days} Days`;
}

function DestinationPackageCard({ pkg }: { pkg: DestinationPackage }) {
  const rating = Number.isFinite(pkg.rating) ? pkg.rating.toFixed(1) : "5.0";

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-[#e6ecf4] bg-white",
        "shadow-[0_14px_40px_rgba(11,21,36,0.08)] transition duration-500",
        "hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(11,21,36,0.14)]",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1524]/5">
        {pkg.imageUrl ? (
          <Image
            src={pkg.imageUrl}
            alt={pkg.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : null}
        <button
          type="button"
          aria-label="Save to wishlist"
          className="absolute right-3.5 top-3.5 flex size-10 items-center justify-center rounded-full bg-white/95 text-[#5a6577] shadow-[0_8px_20px_rgba(8,18,30,0.15)] transition hover:text-[#e11d48]"
        >
          <Heart className="size-4" strokeWidth={2} />
        </button>
      </div>

      <div className={cn(ui, "flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5")}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#6b7585] sm:text-[14px]">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <CalendarDays className="size-3.5 text-[#1d4ed8]" strokeWidth={2.25} />
            {durationLabel(pkg.durationDays)}
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Star className="size-3.5 fill-[#F5B400] text-[#F5B400]" />
            <span className="font-bold text-[#0b1524]">{rating}</span>
            <span>({pkg.reviewCount})</span>
          </span>
        </div>

        <Link href={pkg.href || "#"} className="mt-3 block">
          <h3 className="text-[1.2rem] font-extrabold leading-snug tracking-[-0.02em] text-[#1d4ed8] transition group-hover:text-[#1e40af] sm:text-[1.35rem]">
            {pkg.title}
          </h3>
        </Link>

        <p className="mt-2.5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#6b7585]">
          <MapPin className="size-3.5 text-[#1d4ed8]" strokeWidth={2.25} />
          {pkg.startLocation}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a93a3]">
              Per Person
            </p>
            <p className="mt-1 text-[1.45rem] font-extrabold tracking-[-0.03em] text-[#0b1524] sm:text-[1.6rem]">
              {formatUsd(pkg.price)}
            </p>
            {pkg.compareAtPrice && pkg.compareAtPrice > pkg.price ? (
              <p className="mt-0.5 text-[13px] font-semibold text-[#9aa3b2] line-through">
                {formatUsd(pkg.compareAtPrice)}
              </p>
            ) : null}
          </div>

          <Link
            href={pkg.href || "#"}
            className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-lg bg-[#0b1524] px-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-[#1d4ed8] sm:px-5"
          >
            {pkg.ctaLabel || "Trip Details"}
            <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function DestinationRegionView({ content }: { content: DestinationRegionContent }) {
  const packages = (content.packages || []).filter((p) => p.visible !== false && p.title.trim());

  return (
    <div className="bg-[#f5f7fb]">
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />

      <section className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <p
          className={cn(
            ui,
            "text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]",
          )}
        >
          {content.eyebrow}
        </p>
        <h2
          className={cn(
            ui,
            "mt-2 text-[1.75rem] font-extrabold tracking-[-0.03em] text-[#0b1524] sm:text-[2.15rem]",
          )}
        >
          {content.heading}
        </h2>
        {content.intro ? (
          <p
            className={cn(
              ui,
              "mt-4 max-w-3xl text-[15px] leading-[1.8] text-[#5a6577] sm:text-[16px]",
            )}
          >
            {content.intro}
          </p>
        ) : null}

        <div className="mt-10 flex items-end justify-between gap-4 sm:mt-12">
          <h3
            className={cn(
              ui,
              "text-[1.25rem] font-extrabold tracking-[-0.02em] text-[#0b1524] sm:text-[1.4rem]",
            )}
          >
            {content.packagesHeading}
          </h3>
          <div className="hidden h-[3px] flex-1 rounded-full bg-[#F58220]/35 sm:block" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-7 lg:gap-8">
          {packages.map((pkg) => (
            <DestinationPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>
    </div>
  );
}
