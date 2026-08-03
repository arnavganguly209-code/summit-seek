"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TravelArticlesContent } from "@/types/travel-articles";
import { cn } from "@/lib/utils";

type Props = { content: TravelArticlesContent };

export function TravelArticlesSection({ content }: Props) {
  const articles = useMemo(
    () => content.articles.filter((a) => a.visible !== false),
    [content.articles],
  );
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const sync = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setPerView(3);
      else if (window.matchMedia("(min-width: 640px)").matches) setPerView(2);
      else setPerView(1);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, articles.length - perView)));
  }, [articles.length, perView]);

  if (!content.visible || !articles.length) return null;

  const maxIndex = Math.max(0, articles.length - perView);
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const slide = (dir: -1 | 1) => {
    setIndex((i) => Math.min(maxIndex, Math.max(0, i + dir)));
  };

  return (
    <section
      id="travel-articles"
      className="relative overflow-hidden bg-white py-10 sm:py-[50px] lg:py-[60px]"
      aria-labelledby="travel-articles-heading"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-5 font-[family-name:var(--font-ui)] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            {content.eyebrow}
          </p>
          <h2
            id="travel-articles-heading"
            className="mt-2 text-[1.7rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.15rem] lg:text-[2.35rem]"
          >
            {content.heading}
          </h2>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width: `${(articles.length / perView) * 100}%`,
                transform: `translateX(-${(index / articles.length) * 100}%)`,
              }}
            >
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="box-border shrink-0 px-2.5 sm:px-3"
                  style={{ width: `${100 / articles.length}%` }}
                >
                  <Link
                    href={article.href}
                    className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-[#e8edf3] bg-white shadow-[0_12px_36px_rgba(11,21,36,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(11,21,36,0.12)]"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#0b1524]/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute bottom-3 left-3 rounded-[4px] bg-[#F58220] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-white">
                        {article.dateLabel}
                      </span>
                    </div>
                    <div className="flex flex-1 px-4 py-4 sm:px-5 sm:py-5">
                      <h3 className="text-[15px] font-bold leading-snug tracking-[-0.01em] text-[#0b1524] transition group-hover:text-[#1d4ed8] sm:text-[16px]">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {articles.length > perView ? (
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Previous articles"
                disabled={!canPrev}
                onClick={() => slide(-1)}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-full border border-[#d8dee8] bg-white text-[#0b1524] transition",
                  canPrev ? "hover:border-[#0b1524]/30 hover:bg-[#f5f7fb]" : "opacity-35",
                )}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next articles"
                disabled={!canNext}
                onClick={() => slide(1)}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-full border border-[#d8dee8] bg-white text-[#0b1524] transition",
                  canNext ? "hover:border-[#0b1524]/30 hover:bg-[#f5f7fb]" : "opacity-35",
                )}
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href={content.viewMoreHref || "/blog"}
            className="inline-flex h-11 items-center justify-center rounded-md bg-[#F58220] px-7 text-[13px] font-bold text-[#08121E] shadow-[0_10px_28px_rgba(245,130,32,0.28)] transition hover:brightness-105"
          >
            {content.viewMoreLabel || "View More"}
          </Link>
        </div>
      </div>
    </section>
  );
}
