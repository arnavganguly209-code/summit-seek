"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import type { TrekPageContent } from "@/types/trek-page-cms";
import { cn } from "@/lib/utils";

const ui = "font-[family-name:var(--font-ui)]";

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

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className={cn(ui, "text-[1.35rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[1.45rem]")}>
      {children}
    </h3>
  );
}

export function TrekPageView({ content }: { content: TrekPageContent }) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [openDay, setOpenDay] = useState<string | null>(content.days[0]?.id ?? null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [groupOpen, setGroupOpen] = useState(true);

  const facts = content.facts.filter((f) => f.visible !== false);
  const days = content.days.filter((d) => d.visible !== false);
  const addons = content.addons.filter((a) => a.visible !== false);
  const gallery = content.gallery.filter((g) => g.visible !== false && g.url.trim());
  const essentials = content.essentialBlocks.filter((e) => e.visible !== false);
  const equip = content.equipmentGroups.filter((e) => e.visible !== false);
  const faqs = content.faqs.filter((f) => f.visible !== false);
  const groupDiscounts = (content.groupDiscounts || []).filter((g) => g.visible !== false);

  const heroMain = content.heroMainImageUrl || content.coverImageUrl;
  const heroSide1 = content.heroSideImage1Url;
  const heroSide2 = content.heroSideImage2Url;

  const discountPct = useMemo(() => {
    if (!content.compareAtPrice || content.compareAtPrice <= content.price) return null;
    return Math.max(1, Math.round((1 - content.price / content.compareAtPrice) * 100));
  }, [content.compareAtPrice, content.price]);

  const discountLabel =
    content.discountBadge?.trim() || (discountPct ? `${discountPct}% OFF` : "");

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
    <aside className="relative overflow-hidden rounded-[1.15rem] border border-[#dce6f2] bg-white shadow-[0_14px_36px_rgba(8,18,30,0.1)]">
      {discountLabel ? (
        <div className="absolute -right-8 top-4 z-10 rotate-45 bg-[#16a34a] px-10 py-1.5 text-center shadow-sm">
          <span className={cn(ui, "text-[11px] font-extrabold uppercase tracking-wide text-white")}>
            {discountLabel}
          </span>
        </div>
      ) : null}

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {content.shortTripBadge ? (
            <span
              className={cn(
                ui,
                "rounded-md bg-[#1d4ed8] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white",
              )}
            >
              {content.shortTripBadge}
            </span>
          ) : null}
          <span className={cn(ui, "text-[12px] font-semibold text-[#6b7585]")}>
            {content.perPersonLabel}
          </span>
        </div>

        <p className="mt-3 flex flex-wrap items-baseline gap-2.5">
          <span className={cn(ui, "text-[2rem] font-extrabold tracking-[-0.03em] text-[#16a34a]")}>
            {formatMoney(content.currencyPrefix, content.price)}
          </span>
          {content.compareAtPrice && content.compareAtPrice > content.price ? (
            <span className={cn(ui, "text-[15px] font-semibold text-[#9aa3b2] line-through")}>
              {formatMoney(content.currencyPrefix, content.compareAtPrice)}
            </span>
          ) : null}
        </p>

        {groupDiscounts.length > 0 ? (
          <div className="mt-4 overflow-hidden rounded-xl border border-[#cfe0f5] bg-[#eef5fc]">
            <button
              type="button"
              onClick={() => setGroupOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left"
            >
              <span className={cn(ui, "text-[13px] font-bold text-[#0b1524]")}>
                {content.groupDiscountHeading || "Group Discount Price"}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-[#1d4ed8] transition",
                  groupOpen && "rotate-180",
                )}
              />
            </button>
            {groupOpen ? (
              <ul className="border-t border-[#cfe0f5] px-3.5 pb-3 pt-1">
                {groupDiscounts.map((row) => (
                  <li
                    key={row.id}
                    className="flex items-center justify-between gap-3 border-b border-[#d9e6f5] py-2.5 last:border-b-0"
                  >
                    <span className={cn(ui, "text-[13px] font-semibold text-[#3d4656]")}>
                      {row.paxLabel}
                    </span>
                    <span className={cn(ui, "text-[13px] font-extrabold text-[#0b1524]")}>
                      {formatMoney(content.currencyPrefix, row.price)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {content.bookingNote ? (
          <p className={cn(ui, "mt-4 text-[12.5px] leading-relaxed text-[#5a6577]")}>
            {content.bookingNote}
          </p>
        ) : null}

        <div className="mt-5 space-y-2.5">
          <Link
            href={content.bookHref || "/contact"}
            className={cn(
              ui,
              "flex h-12 items-center justify-center rounded-lg bg-[#1d4ed8] text-[13px] font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#1e40af]",
            )}
          >
            {content.bookLabel}
          </Link>
          <Link
            href={content.customizeHref || "/contact"}
            className={cn(
              ui,
              "flex h-11 items-center justify-center rounded-lg bg-[#16a34a] text-[13px] font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#15803d]",
            )}
          >
            {content.customizeLabel || "Customize Trip"}
          </Link>
          <Link
            href={content.enquireHref || "/contact"}
            className={cn(
              ui,
              "flex h-11 items-center justify-center rounded-lg border-2 border-[#1d4ed8] bg-white text-[13px] font-extrabold uppercase tracking-[0.04em] text-[#1d4ed8] transition hover:bg-[#eff6ff]",
            )}
          >
            {content.enquireLabel}
          </Link>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="relative bg-white">
      {/* Floating side actions */}
      <div className="fixed left-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 sm:left-4">
        <a
          href={content.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={content.whatsappLabel}
          className="group relative flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition hover:scale-105 sm:size-14"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/35" />
          <MessageCircle className="relative size-6 sm:size-7" strokeWidth={2.2} />
        </a>
        <Link
          href={content.enquireHref || "/contact"}
          aria-label="Live chat / inquire"
          className="group relative flex size-12 items-center justify-center rounded-full bg-[#0b1524] text-white shadow-[0_8px_24px_rgba(11,21,36,0.35)] transition hover:scale-105 hover:bg-[#1d4ed8] sm:size-14"
        >
          <span className="absolute inset-0 animate-[pulse_2.4s_ease-in-out_infinite] rounded-full bg-[#1d4ed8]/25" />
          <span className={cn(ui, "relative text-[10px] font-extrabold uppercase leading-tight tracking-wide")}>
            Chat
          </span>
        </Link>
      </div>

      <div className="mx-auto max-w-[1180px] px-4 pt-5 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className={cn(ui, "text-[12px] text-[#8a93a3] sm:text-[13px]")}>
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <li>
              <Link href="/" className="hover:text-[#1d4ed8]">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/packages" className="hover:text-[#1d4ed8]">
                Destinations
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <span className="text-[#5a6577]">{content.regionLabel}</span>
            </li>
            <li aria-hidden>/</li>
            <li className="font-semibold text-[#0b1524]">{content.breadcrumbLabel || content.title}</li>
          </ol>
        </nav>

        {/* Hero mosaic — large left, two stacked right */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-[1.35fr_0.65fr] sm:gap-3 sm:h-[380px] lg:h-[440px]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:aspect-auto sm:h-full sm:rounded-2xl">
            {heroMain ? (
              <Image
                src={heroMain}
                alt={content.title}
                fill
                priority
                unoptimized
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 65vw"
              />
            ) : (
              <div className="absolute inset-0 bg-[#e8eef5]" />
            )}
          </div>
          <div className="grid h-full grid-cols-2 gap-2.5 sm:grid-cols-1 sm:grid-rows-2 sm:gap-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-auto sm:h-full sm:rounded-2xl">
              {heroSide1 ? (
                <Image
                  src={heroSide1}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 bg-[#dde6f0]" />
              )}
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-auto sm:h-full sm:rounded-2xl">
              {heroSide2 ? (
                <Image
                  src={heroSide2}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 bg-[#d2dce8]" />
              )}
            </div>
          </div>
        </div>

        {/* Title row */}
        <div className="mt-7 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1
              className={cn(
                ui,
                "text-[1.65rem] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#0b1524] sm:text-[2.05rem] lg:text-[2.25rem]",
              )}
            >
              {content.title}
            </h1>
            <div className={cn(ui, "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#5a6577]")}>
              <span className="inline-flex items-center gap-1.5">
                <span className="font-bold text-[#00a680]">TripAdvisor</span>
                <span className="font-extrabold text-[#0b1524]">
                  {content.tripAdvisorRating || content.rating.toFixed(1)}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="font-bold text-[#4285F4]">Google</span>
                <span className="font-extrabold text-[#0b1524]">
                  {content.googleRating || content.rating.toFixed(1)}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="font-bold text-[#00b67a]">Trustpilot</span>
                <span className="font-extrabold text-[#0b1524]">
                  {content.trustpilotRating || content.rating.toFixed(1)}
                </span>
              </span>
              <span>
                ({content.reviewCount} {content.reviewCount === 1 ? "Review" : "Reviews"})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Wishlist"
              className="flex size-10 items-center justify-center rounded-full border border-[#e4eaf3] text-[#5a6577] transition hover:border-[#0b1524] hover:text-[#0b1524]"
            >
              <Heart className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Share"
              className="flex size-10 items-center justify-center rounded-full border border-[#e4eaf3] text-[#5a6577] transition hover:border-[#0b1524] hover:text-[#0b1524]"
            >
              <Share2 className="size-4" />
            </button>
          </div>
        </div>

        {/* Trip facts card */}
        {facts.length > 0 ? (
          <div className="mt-6 rounded-2xl border border-[#dce6f2] bg-[#f7fafc] p-4 sm:p-5">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 lg:grid-cols-8">
              {facts.map((fact) => (
                <div key={fact.id} className="min-w-0">
                  <p className={cn(ui, "text-[11px] font-bold uppercase tracking-[0.06em] text-[#6b7585]")}>
                    {fact.label}
                  </p>
                  <p className={cn(ui, "mt-1 text-[13.5px] font-semibold text-[#0b1524]")}>
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="sticky top-0 z-30 mt-6 border-y border-[#e4eaf3] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] gap-1 overflow-x-auto px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollTo(tab.id)}
              className={cn(
                ui,
                "shrink-0 rounded-lg px-3 py-2 text-[12.5px] font-bold transition sm:text-[13px]",
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

      <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8 lg:py-12">
        <div className="min-w-0 space-y-10">
          <section id="overview" className="scroll-mt-28 space-y-8">
            <div>
              <SectionTitle>{content.overviewHeading}</SectionTitle>
              <div className="mt-2.5 h-[3px] w-10 rounded-full bg-[#F58220]" />
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
                  className={cn(ui, "text-[15px] font-normal leading-[1.85] text-[#3d4656]")}
                />
              </div>
            </div>

            {content.highlights.length > 0 ? (
              <div>
                <SectionTitle>{content.highlightsHeading}</SectionTitle>
                <ul className="mt-4 space-y-2.5">
                  {content.highlights.map((item, i) => (
                    <li
                      key={i}
                      className={cn(ui, "flex gap-2.5 text-[14.5px] leading-relaxed text-[#3d4656]")}
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#F58220]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className={cn(ui, "text-[1.15rem] font-bold text-[#0b1524]")}>
                  {content.advantagesHeading}
                </h4>
                <ul className="mt-3 space-y-2">
                  {content.advantages.map((item, i) => (
                    <li
                      key={i}
                      className={cn(ui, "flex gap-2 text-[13.5px] leading-relaxed text-[#3d4656]")}
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#1d4ed8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className={cn(ui, "text-[1.15rem] font-bold text-[#0b1524]")}>
                  {content.whyHeading}
                </h4>
                <ul className="mt-3 space-y-2">
                  {content.whyPoints.map((item, i) => (
                    <li
                      key={i}
                      className={cn(ui, "flex gap-2 text-[13.5px] leading-relaxed text-[#3d4656]")}
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#F58220]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <SectionTitle>{content.beginnersHeading}</SectionTitle>
              <div className="mt-4 space-y-3">
                <Paras
                  text={content.beginnersBody}
                  className={cn(ui, "text-[14.5px] leading-[1.8] text-[#3d4656]")}
                />
              </div>
              <h4 className={cn(ui, "mt-6 text-[1.1rem] font-bold text-[#0b1524]")}>
                {content.prepHeading}
              </h4>
              <ul className="mt-3 space-y-2">
                {content.prepPoints.map((item, i) => (
                  <li
                    key={i}
                    className={cn(ui, "flex gap-2.5 text-[14px] leading-relaxed text-[#3d4656]")}
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#F58220]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="itinerary" className="scroll-mt-28">
            <SectionTitle>{content.itineraryHeading}</SectionTitle>
            <div className="mt-2.5 h-[3px] w-10 rounded-full bg-[#F58220]" />
            {content.itineraryIntro ? (
              <p className={cn(ui, "mt-4 text-[14.5px] leading-relaxed text-[#3d4656]")}>
                {content.itineraryIntro}
              </p>
            ) : null}
            <div className="mt-6 space-y-3">
              {days.map((day, index) => {
                const open = openDay === day.id;
                return (
                  <div key={day.id} className="overflow-hidden rounded-2xl border border-[#e8edf3]">
                    <button
                      type="button"
                      onClick={() => setOpenDay(open ? null : day.id)}
                      className="flex w-full items-center justify-between gap-3 bg-[#f8fafc] px-4 py-4 text-left sm:px-5"
                    >
                      <div className="min-w-0">
                        <p
                          className={cn(
                            ui,
                            "text-[11px] font-bold uppercase tracking-[0.12em] text-[#F58220]",
                          )}
                        >
                          {day.dayLabel || `Day ${index + 1}`}
                        </p>
                        <p
                          className={cn(
                            ui,
                            "mt-1 text-[1.05rem] font-bold text-[#0b1524] sm:text-[1.12rem]",
                          )}
                        >
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
                                className={cn(
                                  ui,
                                  "rounded-lg bg-[#fff4e8] px-2.5 py-1 text-[11.5px] font-semibold text-[#8a4b12]",
                                )}
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
                          className={cn(ui, "text-[14.5px] leading-[1.8] text-[#3d4656]")}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          <section id="availability" className="scroll-mt-28 space-y-6">
            <div>
              <SectionTitle>{content.availabilityHeading}</SectionTitle>
              <div className="mt-2.5 h-[3px] w-10 rounded-full bg-[#F58220]" />
              <div className="mt-4 space-y-3">
                <Paras
                  text={content.availabilityBody}
                  className={cn(ui, "text-[14.5px] leading-[1.8] text-[#3d4656]")}
                />
              </div>
              <ul className="mt-4 space-y-2">
                {content.availabilityNotes.map((note, i) => (
                  <li
                    key={i}
                    className={cn(ui, "flex gap-2.5 text-[14px] leading-relaxed text-[#3d4656]")}
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#F58220]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
            {addons.length > 0 ? (
              <div>
                <h4 className={cn(ui, "text-[1.2rem] font-bold text-[#0b1524]")}>
                  {content.addonsHeading}
                </h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {addons.map((addon) => (
                    <article
                      key={addon.id}
                      className="rounded-xl border border-[#eef2f8] bg-[#f8fafc] p-4"
                    >
                      <h5 className={cn(ui, "text-[14px] font-bold text-[#0b1524]")}>{addon.title}</h5>
                      <p className={cn(ui, "mt-1.5 text-[13px] leading-relaxed text-[#5a6577]")}>
                        {addon.description}
                      </p>
                      {addon.priceLabel ? (
                        <p className={cn(ui, "mt-2 text-[12px] font-bold text-[#F58220]")}>
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
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <SectionTitle>{content.includesHeading}</SectionTitle>
                <ul className="mt-4 space-y-2.5">
                  {content.includes.map((item, i) => (
                    <li
                      key={i}
                      className={cn(ui, "flex gap-2.5 text-[13.5px] leading-relaxed text-[#3d4656]")}
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <SectionTitle>{content.excludesHeading}</SectionTitle>
                <ul className="mt-4 space-y-2.5">
                  {content.excludes.map((item, i) => (
                    <li
                      key={i}
                      className={cn(ui, "flex gap-2.5 text-[13.5px] leading-relaxed text-[#3d4656]")}
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
              <SectionTitle>{content.galleryHeading}</SectionTitle>
              <div className="mt-2.5 h-[3px] w-10 rounded-full bg-[#F58220]" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {gallery.map((img) => (
                  <figure key={img.id} className="overflow-hidden rounded-2xl border border-[#eef2f8]">
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
                      <figcaption className={cn(ui, "px-3 py-2.5 text-[12.5px] text-[#5a6577]")}>
                        {img.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          <section id="essential" className="scroll-mt-28">
            <SectionTitle>{content.essentialHeading}</SectionTitle>
            <div className="mt-2.5 h-[3px] w-10 rounded-full bg-[#F58220]" />
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
                    <h4 className={cn(ui, "text-[1.05rem] font-bold text-[#0b1524]")}>{block.title}</h4>
                    <div className="mt-2 space-y-2">
                      <Paras
                        text={block.body}
                        className={cn(ui, "text-[13.5px] leading-relaxed text-[#5a6577]")}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="equipment" className="scroll-mt-28 space-y-4">
            <div>
              <SectionTitle>{content.equipmentHeading}</SectionTitle>
              <div className="mt-2.5 h-[3px] w-10 rounded-full bg-[#F58220]" />
              {content.equipmentIntro ? (
                <p className={cn(ui, "mt-4 text-[14.5px] leading-relaxed text-[#3d4656]")}>
                  {content.equipmentIntro}
                </p>
              ) : null}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {equip.map((group) => (
                  <div key={group.id} className="rounded-xl border border-[#eef2f8] p-4">
                    <h4 className={cn(ui, "text-[14px] font-bold text-[#0b1524]")}>{group.title}</h4>
                    <ul className="mt-3 space-y-1.5">
                      {group.items.map((item, i) => (
                        <li
                          key={i}
                          className={cn(ui, "flex gap-2 text-[13px] text-[#5a6577]")}
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
              <div className="rounded-[1.4rem] bg-[#0b1524] p-5 text-white sm:p-7">
                <h3 className={cn(ui, "text-[1.2rem] font-bold")}>{content.companyProvidesHeading}</h3>
                <ul className="mt-4 space-y-2">
                  {content.companyProvides.map((item, i) => (
                    <li
                      key={i}
                      className={cn(ui, "flex gap-2.5 text-[14px] leading-relaxed text-white/75")}
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
            <SectionTitle>{content.faqsHeading}</SectionTitle>
            <div className="mt-2.5 h-[3px] w-10 rounded-full bg-[#F58220]" />
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
                      <span className={cn(ui, "text-[14px] font-bold text-[#0b1524]")}>
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
                        <p className={cn(ui, "text-[14px] leading-relaxed text-[#5a6577]")}>
                          {faq.answer}
                        </p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="overflow-hidden rounded-[1.5rem] bg-[#0b1524] px-6 py-10 text-center sm:px-10">
            <h3 className={cn(ui, "text-[1.45rem] font-bold text-white sm:text-[1.65rem]")}>
              {content.ctaHeading}
            </h3>
            <p className={cn(ui, "mx-auto mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/70")}>
              {content.ctaBody}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={content.ctaPrimaryHref || "/contact"}
                className={cn(
                  ui,
                  "inline-flex h-11 items-center rounded-xl bg-[#F58220] px-6 text-[14px] font-bold text-[#08121E] transition hover:brightness-110",
                )}
              >
                {content.ctaPrimaryLabel}
              </Link>
              <Link
                href={content.ctaSecondaryHref || "/travel-guide/packing-checklist"}
                className={cn(
                  ui,
                  "inline-flex h-11 items-center rounded-xl border border-white/20 bg-white/5 px-5 text-[13px] font-semibold text-white transition hover:bg-white/10",
                )}
              >
                {content.ctaSecondaryLabel}
              </Link>
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          {BookingCard}
        </div>
      </div>
    </div>
  );
}
