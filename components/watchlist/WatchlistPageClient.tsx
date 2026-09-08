"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import { useWatchlist } from "@/components/watchlist/WatchlistProvider";
import { cn } from "@/lib/utils";

const ui = "font-[family-name:var(--font-ui)]";

function formatMoney(amount: number) {
  if (!amount) return null;
  return `US$${amount.toLocaleString("en-US")}`;
}

export function WatchlistPageClient() {
  const { items, remove, clear, ready } = useWatchlist();

  return (
    <div className={cn(ui, "mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8")}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#1d4ed8]">
            Your list
          </p>
          <h1 className="mt-2 text-[1.75rem] font-extrabold tracking-[-0.03em] text-[#0b1524] sm:text-[2.1rem]">
            Watchlist
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#5a6577]">
            Save packages and trips without signing in. Your list stays on this device and syncs
            by network for the same visitor IP.
          </p>
        </div>
        {items.length > 0 ? (
          <button
            type="button"
            onClick={() => clear()}
            className="inline-flex items-center gap-2 rounded-full border border-[#e4eaf3] px-4 py-2 text-[13px] font-semibold text-[#5a6577] transition hover:border-[#e11d48]/40 hover:text-[#e11d48]"
          >
            <Trash2 className="size-3.5" />
            Clear all
          </button>
        ) : null}
      </div>

      {!ready ? (
        <div className="mt-10 rounded-2xl border border-[#e4eaf3] bg-[#f8fafc] px-5 py-10 text-center text-[14px] text-[#5a6577]">
          Loading your watchlist…
        </div>
      ) : items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-[#d5deea] bg-white px-5 py-14 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#fff1f2] text-[#e11d48]">
            <Heart className="size-6" />
          </div>
          <h2 className="mt-4 text-[1.2rem] font-bold text-[#0b1524]">No saved trips yet</h2>
          <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-[#5a6577]">
            Tap the heart on any package or trip page to add it here. You can book directly from
            this list anytime.
          </p>
          <Link
            href="/destinations/annapurna-region"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1d4ed8] px-5 py-3 text-[13px] font-extrabold uppercase tracking-[0.06em] text-white"
          >
            Browse trips
            <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {items.map((item) => {
            const bookHref = `/book?${new URLSearchParams({
              package: item.href,
              title: item.title,
            }).toString()}`;
            const price = formatMoney(item.price);
            const compare = item.compareAtPrice ? formatMoney(item.compareAtPrice) : null;

            return (
              <li
                key={item.href}
                className="overflow-hidden rounded-2xl border border-[#e4eaf3] bg-white shadow-[0_10px_28px_rgba(11,21,36,0.05)]"
              >
                <div className="flex flex-col sm:flex-row">
                  <Link
                    href={item.href}
                    className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#eef2f7] sm:aspect-auto sm:h-auto sm:w-[220px]"
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, 220px"
                      />
                    ) : (
                      <div className="flex h-full min-h-[140px] items-center justify-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a93a3]">
                        Summit Seek
                      </div>
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-5">
                    <div className="min-w-0">
                      {item.durationLabel ? (
                        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1d4ed8]">
                          {item.durationLabel}
                        </p>
                      ) : null}
                      <Link href={item.href}>
                        <h2 className="mt-1 text-[1.1rem] font-extrabold tracking-[-0.02em] text-[#0b1524] transition hover:text-[#1d4ed8] sm:text-[1.25rem]">
                          {item.title}
                        </h2>
                      </Link>
                      {price ? (
                        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-[14px]">
                          <span className="text-[18px] font-extrabold text-[#2f9e44]">{price}</span>
                          {compare && item.compareAtPrice && item.compareAtPrice > item.price ? (
                            <span className="text-[13px] text-[#9aa3b2] line-through">{compare}</span>
                          ) : null}
                          <span className="text-[12px] text-[#8a93a3]">per person</span>
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-2.5">
                      <Link
                        href={bookHref}
                        className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-[#1d4ed8] px-4 text-[13px] font-extrabold uppercase tracking-[0.06em] text-white sm:flex-none"
                      >
                        Book this trip
                      </Link>
                      <Link
                        href={item.href}
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-[#dce6f2] px-4 text-[13px] font-bold text-[#0b1524] transition hover:border-[#1d4ed8] hover:text-[#1d4ed8]"
                      >
                        View details
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(item.href)}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#f1d4d8] px-4 text-[13px] font-semibold text-[#e11d48] transition hover:bg-[#fff1f2]"
                      >
                        <Trash2 className="size-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
