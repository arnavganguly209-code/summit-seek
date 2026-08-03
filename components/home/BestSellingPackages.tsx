"use client";

import Link from "next/link";
import { Clock3, Star } from "lucide-react";
import type {
  BestSellingPackage,
  BestSellingPackagesContent,
} from "@/types/best-selling-packages";
import { cn } from "@/lib/utils";

function formatUsd(price: number) {
  return `US$${price.toLocaleString("en-US")}`;
}

function discountPercent(pkg: BestSellingPackage): number | null {
  if (!pkg.compareAtPrice || pkg.compareAtPrice <= pkg.price) return null;
  return Math.max(1, Math.round((1 - pkg.price / pkg.compareAtPrice) * 100));
}

function durationLabel(days: number) {
  return days === 1 ? "1 Day" : `${days} Days`;
}

export function BestSellingPackageCard({
  pkg,
  className,
}: {
  pkg: BestSellingPackage;
  className?: string;
}) {
  const off = discountPercent(pkg);
  const stars = Math.min(5, Math.max(1, Math.round(pkg.rating || 5)));

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[14px] border border-[#e8edf3] bg-white shadow-[0_10px_30px_rgba(11,21,36,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,21,36,0.1)]",
        className,
      )}
    >
      <Link href={pkg.href} className="relative block aspect-[16/11] overflow-hidden bg-[#0b1524]/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pkg.imageUrl}
          alt={pkg.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        {off ? (
          <span className="absolute left-3 top-3 rounded-[4px] bg-[#F58220] px-2 py-1 font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.04em] text-white shadow-[0_6px_16px_rgba(245,130,32,0.35)]">
            {off}% OFF
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5 font-[family-name:var(--font-ui)]">
        <Link href={pkg.href}>
          <h3 className="text-[16px] font-bold leading-snug tracking-[-0.01em] text-[#0b1524] transition hover:text-[#1d4ed8] sm:text-[17px]">
            {pkg.title}
          </h3>
        </Link>

        <p className="mt-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[13px]">
          <span className="font-medium text-[#8a94a6]">From</span>
          <span className="text-[18px] font-extrabold tracking-[-0.02em] text-[#2f9e44]">
            {formatUsd(pkg.price)}
          </span>
          {pkg.compareAtPrice && pkg.compareAtPrice > pkg.price ? (
            <span className="text-[13px] font-medium text-[#9aa3b2] line-through">
              {formatUsd(pkg.compareAtPrice)}
            </span>
          ) : null}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3.5">
          <div className="flex min-w-0 items-center gap-1.5">
            <div className="flex shrink-0 gap-0.5" aria-hidden>
              {Array.from({ length: stars }).map((_, i) => (
                <Star
                  key={i}
                  className="size-3 fill-[#F58220] text-[#F58220] sm:size-3.5"
                />
              ))}
            </div>
            <span className="truncate text-[12px] font-medium text-[#8a94a6] sm:text-[13px]">
              {pkg.reviewCount} {pkg.reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-semibold text-[#5a6577] sm:text-[13px]">
            <Clock3 className="size-3.5 text-[#F58220]" strokeWidth={2.25} />
            {durationLabel(pkg.durationDays)}
          </span>
        </div>
      </div>
    </article>
  );
}

type SectionProps = {
  content: BestSellingPackagesContent;
  /** homepage = 3×2 home picks; all = every visible package */
  mode?: "home" | "all";
};

export function BestSellingPackagesSection({
  content,
  mode = "home",
}: SectionProps) {
  if (!content.visible) return null;

  const visible = content.packages.filter((p) => p.visible !== false);
  const list =
    mode === "home"
      ? (() => {
          const home = visible.filter((p) => p.showOnHome !== false).slice(0, 6);
          return home.length ? home : visible.slice(0, 6);
        })()
      : visible;

  if (!list.length) return null;

  return (
    <section
      id="best-selling-packages"
      className="relative overflow-hidden bg-[#f7f8fb] py-14 sm:py-16 lg:py-[88px]"
      aria-labelledby="best-selling-heading"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <h2
          id="best-selling-heading"
          className="font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#0b1524] sm:text-[2.15rem] lg:text-[2.45rem]"
        >
          {content.heading}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {list.map((pkg) => (
            <BestSellingPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {mode === "home" ? (
          <div className="mt-8 sm:mt-10">
            <Link
              href={content.viewAllHref || "/packages"}
              className="inline-flex items-center gap-1.5 font-[family-name:var(--font-ui)] text-[14px] font-semibold text-[#0b1524] transition hover:text-[#1d4ed8]"
            >
              {content.viewAllLabel || "View All Packages"}
              <span aria-hidden className="text-[16px] leading-none">
                →
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
