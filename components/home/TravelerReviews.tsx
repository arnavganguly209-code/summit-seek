"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, Quote, Star } from "lucide-react";
import type { TravelerReviewsContent } from "@/types/traveler-reviews";

type Props = { content: TravelerReviewsContent };

export function TravelerReviews({ content }: Props) {
  if (!content.visible) return null;
  const reviews = content.reviews.filter((r) => r.visible !== false).slice(0, 3);

  return (
    <section
      id="traveler-reviews"
      className="relative overflow-hidden bg-[#f7f8fb] py-10 sm:py-[50px] lg:py-[60px]"
      aria-labelledby="traveler-reviews-heading"
    >
      <div className="relative mx-auto w-full max-w-[1200px] space-y-10 px-5 sm:px-8 lg:space-y-12 lg:px-10">
        {content.promoVisible ? (
          <div className="overflow-hidden rounded-[22px] border border-white/25 bg-[rgba(8,18,30,0.72)] shadow-[0_22px_55px_rgba(11,21,36,0.22)] backdrop-blur-[28px]">
            <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:p-10">
              <div className="font-[family-name:var(--font-ui)] text-white">
                <p className="text-[13px] font-semibold text-white/75">
                  {content.promoEyebrow}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.55rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[1.9rem] lg:text-[2.15rem]">
                  {content.promoHeading}
                </h3>
                <p className="mt-4 max-w-xl text-[14px] font-medium leading-relaxed text-white/75 sm:text-[15px]">
                  {content.promoDescription}
                </p>
                <Link
                  href={content.promoCtaHref || "/about"}
                  className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-white transition hover:text-[#93c5fd]"
                >
                  {content.promoCtaLabel || "Know More"}
                  <span className="inline-flex size-7 items-center justify-center rounded-full border border-white/40">
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              </div>

              <div className="relative">
                <div className="relative aspect-[16/11] overflow-hidden rounded-[18px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.promoImageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {content.promoVideoLabel ? (
                  <Link
                    href={content.promoVideoHref || "/#hero"}
                    className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12px] font-bold text-[#0b1524] shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition hover:bg-[#f5f7fb]"
                  >
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#2f9e44] text-white">
                      <Play className="size-3 fill-white" />
                    </span>
                    {content.promoVideoLabel}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-[family-name:var(--font-ui)] text-[13px] font-semibold text-[#5a6577]">
                {content.eyebrow}
              </p>
              <h2
                id="traveler-reviews-heading"
                className="mt-1.5 font-[family-name:var(--font-display)] text-[1.7rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.15rem] lg:text-[2.35rem]"
              >
                {content.heading}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {content.platforms.map((p) => (
                <a
                  key={p.id}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-[family-name:var(--font-ui)] text-[13px] font-bold tracking-wide text-[#0b1524]/55 transition hover:text-[#0b1524]"
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>

          {reviews.length ? (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="relative flex h-full flex-col rounded-[18px] border border-[#e8edf3] bg-white px-5 pb-10 pt-6 text-center shadow-[0_14px_40px_rgba(11,21,36,0.08)]"
                >
                  <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[rgba(11,21,36,0.9)] text-white">
                    <Quote className="size-4" />
                  </div>
                  <div className="mt-3 flex justify-center gap-0.5" aria-hidden>
                    {Array.from({ length: Math.min(5, Math.max(1, review.rating)) }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="size-3.5 fill-[#F58220] text-[#F58220]"
                        />
                      ),
                    )}
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-ui)] text-[16px] font-bold text-[#0b1524]">
                    {review.title}
                  </h3>
                  <p className="mt-2.5 flex-1 font-[family-name:var(--font-ui)] text-[13px] leading-relaxed text-[#5a6577]">
                    {review.body}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-ui)] text-[12px] font-semibold text-[#1d4ed8]">
                    read more +
                  </p>
                  <p className="mt-4 font-[family-name:var(--font-ui)] text-[13px] font-bold text-[#0b1524]">
                    {review.author}
                    {review.country ? `, - ${review.country}` : ""}
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-ui)] text-[12px] font-medium text-[#8a94a6]">
                    {review.date}
                  </p>
                  <div className="absolute -bottom-4 left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-[rgba(11,21,36,0.92)] text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(11,21,36,0.25)]">
                    {review.initial || review.author.charAt(0)}
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          <div className="mt-10">
            <Link
              href={content.viewAllHref || "/reviews"}
              className="inline-flex items-center gap-1.5 font-[family-name:var(--font-ui)] text-[14px] font-bold text-[#0b1524] transition hover:text-[#1d4ed8]"
            >
              {content.viewAllLabel || "View All Reviews"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
