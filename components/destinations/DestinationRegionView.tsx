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

/** Plus Jakarta Sans — all destination + package surfaces */
const face = "font-[family-name:var(--font-jakarta)]";

function formatUsd(price: number) {
  return `US$${price.toLocaleString("en-US")}`;
}

function durationLabel(days: number) {
  return days === 1 ? "1 Day" : `${days} Days`;
}

function DestinationPackageCard({ pkg }: { pkg: DestinationPackage }) {
  const rating = Number.isFinite(pkg.rating) ? pkg.rating.toFixed(1) : "5.0";

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#e2e8f0] bg-white",
        "shadow-[0_18px_48px_rgba(11,21,36,0.09)] transition duration-500 ease-out",
        "hover:-translate-y-2 hover:shadow-[0_28px_64px_rgba(11,21,36,0.16)]",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1524]/5 sm:aspect-[16/9.5]">
        {pkg.imageUrl ? (
          <Image
            src={pkg.imageUrl}
            alt={pkg.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#0b1524] to-[#1e293b] text-white/40">
            <MapPin className="size-10" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1524]/35 via-transparent to-transparent opacity-80" />
        <button
          type="button"
          aria-label="Save to wishlist"
          className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/95 text-[#5a6577] shadow-[0_10px_24px_rgba(8,18,30,0.18)] transition hover:scale-105 hover:text-[#e11d48]"
        >
          <Heart className="size-4" strokeWidth={2} />
        </button>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-lg bg-[#0b1524]/82 px-3 py-1.5 text-[12px] font-bold tracking-wide text-white backdrop-blur-sm">
          <CalendarDays className="size-3.5 text-[#F5B400]" strokeWidth={2.25} />
          {durationLabel(pkg.durationDays)}
        </span>
      </div>

      <div className={cn(face, "flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6")}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-[#8a93a3] sm:text-[14px]">
          <span className="inline-flex items-center gap-1.5">
            <Star className="size-3.5 fill-[#F5B400] text-[#F5B400]" />
            <span className="font-extrabold text-[#0b1524]">{rating}</span>
            <span>({pkg.reviewCount})</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-[#F58220]" strokeWidth={2.25} />
            {pkg.startLocation}
          </span>
        </div>

        <Link href={pkg.href || "#"} className="mt-3.5 block">
          <h3 className="text-[1.35rem] font-extrabold leading-snug tracking-[-0.025em] text-[#0b1524] transition duration-300 group-hover:text-[#F58220] sm:text-[1.5rem]">
            {pkg.title}
          </h3>
        </Link>

        <p className="mt-2 text-[14px] font-medium text-[#8a93a3]">
          Duration: {durationLabel(pkg.durationDays)}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a93a3]">
              Per Person
            </p>
            <p className="mt-1 text-[1.55rem] font-extrabold tracking-[-0.03em] text-[#0b1524] sm:text-[1.7rem]">
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
            className="inline-flex h-12 shrink-0 items-center gap-1.5 rounded-xl bg-[#0b1524] px-5 text-[12px] font-extrabold uppercase tracking-[0.07em] text-white shadow-[0_12px_28px_rgba(11,21,36,0.22)] transition duration-300 hover:bg-[#F58220] hover:shadow-[0_14px_32px_rgba(245,130,32,0.35)] sm:px-6"
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
    <div className={cn(face, "bg-[#f3f5f9]")}>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
        typography="jakarta"
      />

      <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F58220]">
          {content.eyebrow}
        </p>

        {/* Gold region title — matches destination menu reference */}
        <h2 className="mt-3 text-[1.85rem] font-extrabold tracking-[-0.03em] text-[#F5B400] sm:text-[2.35rem]">
          {content.heading}
        </h2>
        <div className="mt-2.5 h-[3px] w-16 rounded-full bg-[#F5B400] sm:w-20" />

        {content.intro ? (
          <p className="mt-5 max-w-3xl text-[15px] font-medium leading-[1.85] text-[#5a6577] sm:text-[16px]">
            {content.intro}
          </p>
        ) : null}

        <div className="mt-12 flex items-end justify-between gap-4 sm:mt-14">
          <h3 className="text-[1.2rem] font-extrabold tracking-[-0.02em] text-[#0b1524] sm:text-[1.35rem]">
            {content.packagesHeading}
          </h3>
          <div className="hidden h-[3px] flex-1 rounded-full bg-[#F5B400]/30 sm:block" />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-7 sm:mt-9 sm:grid-cols-2 sm:gap-8 lg:gap-9">
          {packages.map((pkg) => (
            <DestinationPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>
    </div>
  );
}
