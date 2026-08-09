"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  MapPin,
  MessageCircle,
  Mountain,
  Star,
  Users,
} from "lucide-react";
import type { TrekPageContent } from "@/types/trek-page-cms";
import { cn } from "@/lib/utils";

function Paras({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className={className}>
            {p}
          </p>
        ))}
    </>
  );
}

function formatMoney(prefix: string, amount: number) {
  return `${prefix}${amount.toLocaleString("en-US")}`;
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "availability", label: "Availability" },
  { id: "cost", label: "Cost Details" },
  { id: "gallery", label: "Gallery" },
  { id: "essential", label: "Essential Info" },
  { id: "equipment", label: "Equipment" },
  { id: "faqs", label: "FAQs" },
] as const;

export function TrekPageView({ content }: { content: TrekPageContent }) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [openDay, setOpenDay] = useState<string | null>(content.days[0]?.id ?? null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const facts = content.facts.filter((f) => f.visible !== false);
  const days = content.days.filter((d) => d.visible !== false);
  const addons = content.addons.filter((a) => a.visible !== false);
  const gallery = content.gallery.filter((g) => g.visible !== false && g.url.trim());
  const essentials = content.essentialBlocks.filter((e) => e.visible !== false);
  const equip = content.equipmentGroups.filter((e) => e.visible !== false);
  const faqs = content.faqs.filter((f) => f.visible !== false);

  const discountPct = useMemo(() => {
    if (!content.compareAtPrice || content.compareAtPrice <= content.price) return null;
    return Math.max(1, Math.round((1 - content.price / content.compareAtPrice) * 100));
  }, [content.compareAtPrice, content.price]);

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveTab(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const BookingCard = (
    <aside className="rounded-[1.35rem] border border-[#e4eaf3] bg-white p-5 shadow-[0_16px_40px_rgba(8,18,30,0.08)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--font-ui)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a93a3]">
            {content.perPersonLabel}
          </p>
          <p className="mt-1 flex flex-wrap items-baseline gap-2">
            <span className="font-[family-name:var(--font-ui)] text-[1.85rem] font-extrabold tracking-[-0.03em] text-[#0b1524]">
              {formatMoney(content.currencyPrefix, content.price)}
            </span>
            {content.compareAtPrice && content.compareAtPrice > content.price ? (
              <span className="font-[family-name:var(--font-ui)] text-[14px] font-semibold text-[#9aa3b2] line-through">
                {formatMoney(content.currencyPrefix, content.compareAtPrice)}
              </span>
            ) : null}
          </p>
        </div>
        {discountPct || content.discountBadge ? (
          <span className="rounded-md bg-[#F58220] px-2.5 py-1 font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-wide text-white">
            {content.discountBadge || `${discountPct}% OFF`}
          </span>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {[
          { icon: CalendarDays, label: "Duration", value: content.durationLabel },
          { icon: Mountain, label: "Difficulty", value: content.difficultyLabel },
          { icon: Users, label: "Group", value: content.groupSizeLabel },
          { icon: MapPin, label: "Region", value: content.regionLabel },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[#eef2f8] bg-[#f8fafc] px-3 py-2.5"
          >
            <p className="inline-flex items-center gap-1 font-[family-name:var(--font-ui)] text-[10px] font-bold uppercase tracking-wide text-[#8a93a3]">
              <item.icon className="size-3 text-[#1d4ed8]" />
              {item.label}
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-ui)] text-[13px] font-bold text-[#0b1524]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {content.bookingNote ? (
        <p className="mt-4 font-[family-name:var(--font-ui)] text-[13px] leading-relaxed text-[#5a6577]">
          {content.bookingNote}
        </p>
      ) : null}

      <div className="mt-5 space-y-2.5">
        <Link
          href={content.bookHref || "/contact"}
          className="flex h-12 items-center justify-center rounded-xl bg-[#F58220] font-[family-name:var(--font-ui)] text-[14px] font-bold text-[#08121E] transition hover:brightness-110"
        >
          {content.bookLabel}
        </Link>
        <Link
          href={content.enquireHref || "/contact"}
          className="flex h-11 items-center justify-center rounded-xl border border-[#d5dbe6] bg-white font-[family-name:var(--font-ui)] text-[13px] font-bold text-[#0b1524] transition hover:border-[#0b1524]"
        >
          {content.enquireLabel}
        </Link>
        <a
          href={content.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0b1524] font-[family-name:var(--font-ui)] text-[13px] font-bold text-white transition hover:bg-[#1d4ed8]"
        >
          <MessageCircle className="size-4" />
          {content.whatsappLabel}
        </a>
      </div>
    </aside>
  );

  return (
    <div className="relative bg-[#f5f7fb]">
      <div className="border-b border-[#e4eaf3] bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-6 sm:px-8 lg:px-10">
          <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            {content.regionLabel}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-[1.65rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.1rem]">
            {content.title}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-3 font-[family-name:var(--font-ui)] text-[13px] text-[#5a6577]">
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-[#D8A34A] text-[#D8A34A]" />
              <span className="font-bold text-[#0b1524]">{content.rating.toFixed(1)}</span>
              <span>
                ({content.reviewCount} {content.reviewCount === 1 ? "Review" : "Reviews"})
              </span>
            </span>
            <span className="text-[#d5dbe6]">|</span>
            <span>{content.durationLabel}</span>
            <span className="text-[#d5dbe6]">|</span>
            <span>{content.difficultyLabel}</span>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-30 border-b border-[#e4eaf3] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-8 lg:px-10 [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollTo(tab.id)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-2 font-[family-name:var(--font-ui)] text-[12.5px] font-bold transition sm:text-[13px]",
                activeTab === tab.id
                  ? "bg-[#0b1524] text-white"
                  : "text-[#5a6577] hover:bg-[#f0f3f8] hover:text-[#0b1524]",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {facts.length > 0 ? (
        <div className="border-b border-[#e4eaf3] bg-white">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-px bg-[#eef2f8] sm:grid-cols-4 lg:grid-cols-8">
            {facts.map((fact) => (
              <div key={fact.id} className="bg-white px-3 py-3.5 text-center sm:px-2">
                <p className="font-[family-name:var(--font-ui)] text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a93a3]">
                  {fact.label}
                </p>
                <p className="mt-1 font-[family-name:var(--font-ui)] text-[12.5px] font-bold text-[#0b1524] sm:text-[13px]">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_340px] lg:px-10 lg:py-12">
        <div className="min-w-0 space-y-10">
          <section id="overview" className="scroll-mt-28 space-y-8">
            <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] font-bold text-[#0b1524]">
                {content.overviewHeading}
              </h3>
              <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
              {content.overviewImageUrl ? (
                <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl">
                  <Image
                    src={content.overviewImageUrl}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 700px"
                  />
                </div>
              ) : null}
              <div className="mt-5 space-y-4">
                <Paras
                  text={content.overviewBody}
                  className="font-[family-name:var(--font-ui)] text-[15px] leading-[1.85] text-[#5a6577]"
                />
              </div>
            </div>

            {content.highlights.length > 0 ? (
              <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
                <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] font-bold text-[#0b1524]">
                  {content.highlightsHeading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {content.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#5a6577]"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#F58220]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-6">
                <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] font-bold text-[#0b1524]">
                  {content.advantagesHeading}
                </h3>
                <ul className="mt-3 space-y-2">
                  {content.advantages.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2 font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a6577]"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#1d4ed8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-6">
                <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] font-bold text-[#0b1524]">
                  {content.whyHeading}
                </h3>
                <ul className="mt-3 space-y-2">
                  {content.whyPoints.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2 font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a6577]"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#F58220]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] font-bold text-[#0b1524]">
                {content.beginnersHeading}
              </h3>
              <div className="mt-4 space-y-3">
                <Paras
                  text={content.beginnersBody}
                  className="font-[family-name:var(--font-ui)] text-[14.5px] leading-[1.8] text-[#5a6577]"
                />
              </div>
              <h4 className="mt-6 font-[family-name:var(--font-display)] text-[1.1rem] font-bold text-[#0b1524]">
                {content.prepHeading}
              </h4>
              <ul className="mt-3 space-y-2">
                {content.prepPoints.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-[#5a6577]"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#F58220]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="itinerary" className="scroll-mt-28">
            <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] font-bold text-[#0b1524]">
                {content.itineraryHeading}
              </h3>
              <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
              {content.itineraryIntro ? (
                <p className="mt-4 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#5a6577]">
                  {content.itineraryIntro}
                </p>
              ) : null}
              <div className="mt-6 space-y-3">
                {days.map((day, index) => {
                  const open = openDay === day.id;
                  return (
                    <div
                      key={day.id}
                      className="overflow-hidden rounded-2xl border border-[#e8edf3]"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenDay(open ? null : day.id)}
                        className="flex w-full items-center justify-between gap-3 bg-[#f8fafc] px-4 py-4 text-left sm:px-5"
                      >
                        <div className="min-w-0">
                          <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.12em] text-[#F58220]">
                            {day.dayLabel || `Day ${index + 1}`}
                          </p>
                          <p className="mt-1 font-[family-name:var(--font-display)] text-[1.05rem] font-bold text-[#0b1524] sm:text-[1.12rem]">
                            {day.title}
                          </p>
                        </div>
                        <ChevronDown
                          className={cn(
                            "size-5 shrink-0 text-[#5a6577] transition",
                            open && "rotate-180",
                          )}
                        />
                      </button>
                      {open ? (
                        <div className="space-y-4 border-t border-[#e8edf3] px-4 py-4 sm:px-5">
                          <div className="flex flex-wrap gap-2">
                            {[
                              ["Max altitude", day.maxAltitude],
                              ["Meals", day.meals],
                              ["Stay", day.accommodation],
                            ]
                              .filter(([, v]) => v)
                              .map(([k, v]) => (
                                <span
                                  key={k}
                                  className="rounded-lg bg-[#fff4e8] px-2.5 py-1 font-[family-name:var(--font-ui)] text-[11.5px] font-semibold text-[#8a4b12]"
                                >
                                  {k}: {v}
                                </span>
                              ))}
                          </div>
                          {day.imageUrl ? (
                            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                              <Image
                                src={day.imageUrl}
                                alt=""
                                fill
                                unoptimized
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 700px"
                              />
                            </div>
                          ) : null}
                          <Paras
                            text={day.description}
                            className="font-[family-name:var(--font-ui)] text-[14.5px] leading-[1.8] text-[#5a6577]"
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="availability" className="scroll-mt-28 space-y-4">
            <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] font-bold text-[#0b1524]">
                {content.availabilityHeading}
              </h3>
              <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
              <div className="mt-4 space-y-3">
                <Paras
                  text={content.availabilityBody}
                  className="font-[family-name:var(--font-ui)] text-[14.5px] leading-[1.8] text-[#5a6577]"
                />
              </div>
              <ul className="mt-4 space-y-2">
                {content.availabilityNotes.map((note, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-[#5a6577]"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#F58220]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
            {addons.length > 0 ? (
              <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
                <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] font-bold text-[#0b1524]">
                  {content.addonsHeading}
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {addons.map((addon) => (
                    <article
                      key={addon.id}
                      className="rounded-xl border border-[#eef2f8] bg-[#f8fafc] p-4"
                    >
                      <h4 className="font-[family-name:var(--font-ui)] text-[14px] font-bold text-[#0b1524]">
                        {addon.title}
                      </h4>
                      <p className="mt-1.5 font-[family-name:var(--font-ui)] text-[13px] leading-relaxed text-[#5a6577]">
                        {addon.description}
                      </p>
                      {addon.priceLabel ? (
                        <p className="mt-2 font-[family-name:var(--font-ui)] text-[12px] font-bold text-[#F58220]">
                          {addon.priceLabel}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          <section id="cost" className="scroll-mt-28">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-7">
                <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold text-[#0b1524]">
                  {content.includesHeading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {content.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a6577]"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-7">
                <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold text-[#0b1524]">
                  {content.excludesHeading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {content.excludes.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a6577]"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#c45c5c]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {gallery.length > 0 ? (
            <section id="gallery" className="scroll-mt-28">
              <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
                <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] font-bold text-[#0b1524]">
                  {content.galleryHeading}
                </h3>
                <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {gallery.map((img) => (
                    <figure
                      key={img.id}
                      className="overflow-hidden rounded-2xl border border-[#eef2f8]"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={img.url}
                          alt={img.caption || ""}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      {img.caption ? (
                        <figcaption className="px-3 py-2.5 font-[family-name:var(--font-ui)] text-[12.5px] text-[#5a6577]">
                          {img.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section id="essential" className="scroll-mt-28">
            <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] font-bold text-[#0b1524]">
                {content.essentialHeading}
              </h3>
              <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {essentials.map((block) => (
                  <article
                    key={block.id}
                    className="overflow-hidden rounded-2xl border border-[#eef2f8] bg-[#f8fafc]"
                  >
                    {block.imageUrl ? (
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={block.imageUrl}
                          alt=""
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ) : null}
                    <div className="p-4 sm:p-5">
                      <h4 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold text-[#0b1524]">
                        {block.title}
                      </h4>
                      <div className="mt-2 space-y-2">
                        <Paras
                          text={block.body}
                          className="font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a6577]"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="equipment" className="scroll-mt-28 space-y-4">
            <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] font-bold text-[#0b1524]">
                {content.equipmentHeading}
              </h3>
              <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
              {content.equipmentIntro ? (
                <p className="mt-4 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#5a6577]">
                  {content.equipmentIntro}
                </p>
              ) : null}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {equip.map((group) => (
                  <div key={group.id} className="rounded-xl border border-[#eef2f8] p-4">
                    <h4 className="font-[family-name:var(--font-ui)] text-[14px] font-bold text-[#0b1524]">
                      {group.title}
                    </h4>
                    <ul className="mt-3 space-y-1.5">
                      {group.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-2 font-[family-name:var(--font-ui)] text-[13px] text-[#5a6577]"
                        >
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#F58220]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            {content.companyProvides.length > 0 ? (
              <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-[#0b1524] p-5 text-white sm:p-7">
                <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] font-bold">
                  {content.companyProvidesHeading}
                </h3>
                <ul className="mt-4 space-y-2">
                  {content.companyProvides.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-white/75"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#F58220]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          <section id="faqs" className="scroll-mt-28">
            <div className="rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] font-bold text-[#0b1524]">
                {content.faqsHeading}
              </h3>
              <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
              <div className="mt-5 space-y-2.5">
                {faqs.map((faq) => {
                  const open = openFaq === faq.id;
                  return (
                    <div key={faq.id} className="rounded-xl border border-[#e8edf3]">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : faq.id)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                      >
                        <span className="font-[family-name:var(--font-ui)] text-[14px] font-bold text-[#0b1524]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 text-[#5a6577] transition",
                            open && "rotate-180",
                          )}
                        />
                      </button>
                      {open ? (
                        <div className="border-t border-[#e8edf3] px-4 py-3">
                          <p className="font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-[#5a6577]">
                            {faq.answer}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[1.5rem] bg-[#0b1524] px-6 py-10 text-center sm:px-10">
            <h3 className="font-[family-name:var(--font-display)] text-[1.45rem] font-bold text-white sm:text-[1.65rem]">
              {content.ctaHeading}
            </h3>
            <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-white/70">
              {content.ctaBody}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={content.ctaPrimaryHref || "/contact"}
                className="inline-flex h-11 items-center rounded-xl bg-[#F58220] px-6 text-[14px] font-bold text-[#08121E] transition hover:brightness-110"
              >
                {content.ctaPrimaryLabel}
              </Link>
              <Link
                href={content.ctaSecondaryHref || "/travel-guide/packing-checklist"}
                className="inline-flex h-11 items-center rounded-xl border border-white/20 bg-white/5 px-5 text-[13px] font-semibold text-white transition hover:bg-white/10"
              >
                {content.ctaSecondaryLabel}
              </Link>
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="lg:hidden">{BookingCard}</div>
          <div className="hidden lg:block">{BookingCard}</div>
        </div>
      </div>
    </div>
  );
}
