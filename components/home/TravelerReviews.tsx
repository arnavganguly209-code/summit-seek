"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Quote,
  Star,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const reviews = [
  {
    id: "r1",
    name: "Elena Moreau",
    country: "France",
    trek: "Everest Base Camp Trek",
    date: "March 2026",
    text: "From the first briefing in Kathmandu to sunrise at Base Camp, every detail felt considered. Summit Seek elevates Himalayan travel into something quietly extraordinary — paced with care, guided with quiet mastery.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "r2",
    name: "James Whitfield",
    country: "United Kingdom",
    trek: "Manaslu Circuit Trek",
    date: "October 2025",
    text: "Our Manaslu circuit was seamless. Expert guides, thoughtful pacing, and a level of care I have only experienced at the finest hotels. We never once worried about logistics — only the trail ahead.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "r3",
    name: "Sakura Tanaka",
    country: "Japan",
    trek: "Island Peak Climbing",
    date: "May 2025",
    text: "Island Peak with Summit Seek was the adventure of a lifetime. Safety briefings were meticulous, and the team made every challenge feel achievable. I stood on the summit knowing I was in the right hands.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "r4",
    name: "Marcus Keller",
    country: "Germany",
    trek: "Upper Mustang Trek",
    date: "September 2025",
    text: "Upper Mustang felt like stepping into another century. The logistics were invisible — exactly what you want on a journey of this calibre. Summit Seek understands both wilderness and refinement.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "r5",
    name: "Sophia Chen",
    country: "Singapore",
    trek: "EBC with Helicopter Return",
    date: "April 2026",
    text: "The helicopter return from Everest Base Camp was pure magic. Summit Seek understands luxury without ever making it feel ostentatious — warm, precise, and deeply personal from start to finish.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "r6",
    name: "Daniel Okonkwo",
    country: "United States",
    trek: "Annapurna Circuit Trek",
    date: "November 2025",
    text: "Fifteen days on the Annapurna Circuit and not a single wasted moment. Our guide knew every village, every weather pattern, every quiet viewpoint. This is how Himalayan travel should feel.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85",
  },
] as const;

export function TravelerReviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = reviews[index];

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      id="traveler-reviews"
      className="relative overflow-hidden bg-white py-[80px] sm:py-[100px] lg:py-[120px]"
      aria-labelledby="traveler-reviews-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="inline-flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#D8A73C]">
            <Quote className="size-3.5" aria-hidden />
            Traveler Reviews
          </p>
          <h2
            id="traveler-reviews-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-[1.85rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#08121E] sm:text-[2.35rem] lg:text-[2.65rem]"
          >
            What Our Travelers Say
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-[1.75] text-[#5a6577] sm:text-[16px]">
            Thousands of travelers have trusted Summit Seek for unforgettable Himalayan
            adventures.
          </p>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease }}
              className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
            >
              {/* Left — profile */}
              <div className="mx-auto w-full max-w-[340px] text-center lg:mx-0 lg:text-left">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[28px] shadow-[0_28px_60px_rgba(8,18,30,0.14)] lg:mx-0">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    className="object-cover"
                    sizes="300px"
                    priority={index === 0}
                  />
                </div>
                <p className="mt-5 font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-[#08121E]">
                  {active.name}
                </p>
                <p className="mt-1 text-[14px] text-[#5a6577]">{active.country}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#D8A73C]/35 bg-[#D8A73C]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#B8892A]">
                  <BadgeCheck className="size-3.5" />
                  Verified Review
                </span>
              </div>

              {/* Right — quote */}
              <div className="relative mx-auto max-w-[900px] lg:mx-0">
                <Quote
                  className="pointer-events-none absolute -left-2 -top-4 size-20 text-[#D8A73C]/12 sm:size-28"
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-center gap-1 text-[#D8A73C]" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-5 fill-current sm:size-6" />
                    ))}
                  </div>

                  <blockquote className="mt-5 font-[family-name:var(--font-display)] text-[1.35rem] font-medium leading-[1.55] tracking-[-0.01em] text-[#08121E] sm:text-[1.65rem] lg:text-[1.85rem]">
                    &ldquo;{active.text}&rdquo;
                  </blockquote>

                  <div className="mt-8 border-t border-[#e8ebf0] pt-6">
                    <p className="text-[16px] font-bold text-[#08121E]">{active.name}</p>
                    <p className="mt-1 text-[13px] text-[#5a6577]">
                      {active.country}
                      <span className="mx-2 text-[#c5cad3]">·</span>
                      {active.trek}
                    </p>
                    <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.12em] text-[#8a93a3]">
                      {active.date}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4 lg:justify-end">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="flex size-12 items-center justify-center rounded-full border border-[#e0e4ea] bg-white text-[#08121E] shadow-[0_8px_24px_rgba(8,18,30,0.06)] transition-all duration-300 hover:border-[#D8A73C] hover:text-[#D8A73C]"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex items-center gap-2" aria-hidden>
              {reviews.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={
                    i === index
                      ? "h-2 w-6 rounded-full bg-[#D8A73C] transition-all"
                      : "size-2 rounded-full bg-[#d0d5de] transition-all hover:bg-[#D8A73C]/60"
                  }
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="flex size-12 items-center justify-center rounded-full border border-[#e0e4ea] bg-white text-[#08121E] shadow-[0_8px_24px_rgba(8,18,30,0.06)] transition-all duration-300 hover:border-[#D8A73C] hover:text-[#D8A73C]"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
