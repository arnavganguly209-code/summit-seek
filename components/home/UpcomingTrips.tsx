"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import type { UpcomingTripsContent } from "@/types/upcoming-trips";
import { cn } from "@/lib/utils";

function formatUsd(n: number) {
  return `US$${n.toLocaleString("en-US")}`;
}

type Props = { content: UpcomingTripsContent };

export function UpcomingTripsSection({ content }: Props) {
  const months = content.months.filter((m) => m.trips?.some((t) => t.visible !== false));
  const [activeId, setActiveId] = useState(months[0]?.id || "");

  const active = useMemo(() => {
    return months.find((m) => m.id === activeId) || months[0];
  }, [months, activeId]);

  if (!content.visible || !months.length || !active) return null;

  const trips = active.trips.filter((t) => t.visible !== false);

  return (
    <section
      id="upcoming-trips"
      className="relative overflow-hidden bg-[#f4f6fa] py-10 sm:py-[50px] lg:py-[60px]"
      aria-labelledby="upcoming-trips-heading"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-5 font-[family-name:var(--font-ui)] sm:px-8 lg:px-10">
        <p className="text-[13px] font-semibold text-[#5a6577]">{content.eyebrow}</p>
        <h2
          id="upcoming-trips-heading"
          className="mt-1.5 text-[1.75rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.2rem] lg:text-[2.4rem]"
        >
          {content.heading}
        </h2>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {months.map((month) => {
            const on = month.id === active.id;
            return (
              <button
                key={month.id}
                type="button"
                onClick={() => setActiveId(month.id)}
                className={cn(
                  "rounded-xl border px-4 py-2.5 text-[13px] font-bold transition",
                  on
                    ? "border-[#0b1524]/20 bg-[rgba(11,21,36,0.9)] text-white shadow-[0_10px_28px_rgba(11,21,36,0.22)] backdrop-blur-md"
                    : "border-[#d8dee8] bg-white/80 text-[#0b1524] hover:border-[#0b1524]/25 hover:bg-white",
                )}
              >
                {month.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-[18px] border border-white/40 bg-white/70 shadow-[0_18px_50px_rgba(11,21,36,0.08)] backdrop-blur-xl">
          <div className="hidden grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1fr)_7.5rem] gap-4 border-b border-white/10 bg-[rgba(11,21,36,0.92)] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#93c5fd] backdrop-blur-xl md:grid lg:px-6">
            <span>Trip and Days</span>
            <span>Departure Date</span>
            <span>Status</span>
            <span>Price</span>
            <span className="text-right">Book</span>
          </div>

          <div className="divide-y divide-[#e8edf3]">
            {trips.map((trip) => {
              const save =
                trip.compareAtPrice && trip.compareAtPrice > trip.price
                  ? trip.compareAtPrice - trip.price
                  : 0;
              return (
                <div
                  key={trip.id}
                  className="grid grid-cols-1 gap-4 px-5 py-5 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1fr)_7.5rem] md:items-center lg:px-6"
                >
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold leading-snug text-[#0b1524] sm:text-[16px]">
                      {trip.title}
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-[#8a94a6]">
                      {trip.durationDays === 1 ? "1 Day" : `${trip.durationDays} Days`}
                    </p>
                  </div>

                  <div className="text-[13px] font-medium leading-relaxed text-[#5a6577]">
                    <p>Starts: {trip.startsLabel}</p>
                    <p>Ends: {trip.endsLabel}</p>
                  </div>

                  <div>
                    <p className="text-[13px] font-semibold text-[#5a6577]">{trip.status}</p>
                    {trip.badgeLabel ? (
                      <span className="mt-1.5 inline-flex rounded-full border border-[#0b1524]/10 bg-[rgba(11,21,36,0.06)] px-2.5 py-1 text-[11px] font-bold text-[#0b1524]">
                        {trip.badgeLabel}
                      </span>
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <p className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[18px] font-extrabold tracking-[-0.02em] text-[#F58220]">
                        {formatUsd(trip.price)}
                      </span>
                      {trip.compareAtPrice && trip.compareAtPrice > trip.price ? (
                        <span className="text-[13px] font-medium text-[#9aa3b2] line-through">
                          {formatUsd(trip.compareAtPrice)}
                        </span>
                      ) : null}
                    </p>
                    {save > 0 ? (
                      <span className="mt-1.5 inline-flex rounded-[4px] bg-[#F58220] px-2 py-0.5 text-[11px] font-bold text-white">
                        Save {formatUsd(save)}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex md:justify-end">
                    <Link
                      href={trip.bookHref}
                      className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#2f9e44] px-3 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(47,158,68,0.28)] transition hover:brightness-110 md:w-[7.5rem]"
                    >
                      {content.bookLabel || "Book Now"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-[16px] border border-white/30 bg-[rgba(11,21,36,0.88)] px-5 py-4 text-white shadow-[0_16px_40px_rgba(11,21,36,0.18)] backdrop-blur-xl sm:px-6">
          <div className="flex gap-3">
            <Info className="mt-0.5 size-5 shrink-0 text-[#93c5fd]" />
            <div>
              <p className="text-[14px] font-bold">{content.noteTitle}</p>
              <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-white/75">
                {content.noteBody}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href={content.viewAllHref || "/packages"}
            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0b1524] transition hover:text-[#1d4ed8]"
          >
            {content.viewAllLabel || "View All Dates"}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
