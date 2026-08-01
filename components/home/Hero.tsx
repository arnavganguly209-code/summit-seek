"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Play, Phone } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const titleWords = [
  { text: "Explore", gold: false },
  { text: "Nepal", gold: false },
  { text: "Beyond", gold: true },
  { text: "The", gold: false, breakBefore: true },
  { text: "Ordinary", gold: false },
] as const;

const titleContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.25, delayChildren: 0.05 },
  },
};

const titleWord = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease },
  },
};

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
];

function HeroHeading() {
  return (
    <motion.h1
      variants={titleContainer}
      initial="initial"
      animate="animate"
      className="font-[family-name:var(--font-display)] text-[1.95rem] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.55rem] md:text-[2.85rem] lg:text-[3.35rem]"
      aria-label="Explore Nepal Beyond The Ordinary"
    >
      {titleWords.map((word) => (
        <span key={word.text}>
          {"breakBefore" in word && word.breakBefore ? <br /> : null}
          <motion.span
            variants={titleWord}
            className={
              word.gold
                ? "mr-[0.28em] inline-block bg-gradient-to-r from-[#F0D078] via-[#D8A73C] to-[#B8892A] bg-clip-text italic text-transparent"
                : "mr-[0.28em] inline-block"
            }
          >
            {word.text}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export function Hero() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#08121E]">
      <div className="absolute inset-0">
        <Image
          src="/hero-summit.png"
          alt="Summit Seek trekker celebrating on a Himalayan ridge at golden hour"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(4,13,24,0.40)" }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pt-[160px] pb-3 sm:px-8 lg:px-12 lg:pt-[172px]">
          <div className="max-w-[620px]">
            <HeroHeading />

            <p className="mt-4 max-w-[480px] text-[13px] leading-[1.65] text-white/90 sm:mt-5 sm:text-[14px] md:text-[15px]">
              Bespoke treks, peak climbs, and luxury journeys crafted for
              travelers who expect excellence — from the first step to the final
              summit.
            </p>

            <form
              className="mt-8 flex h-[52px] w-full max-w-[640px] items-center rounded-full border border-white/50 bg-white/92 p-[5px] shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:mt-10 sm:h-[60px] sm:p-1.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2.5 pl-3.5 sm:gap-3 sm:pl-5">
                <Search className="size-[18px] shrink-0 text-[#D8A73C] sm:size-5" />
                <label className="sr-only" htmlFor="hero-search">
                  Search destinations
                </label>
                <input
                  id="hero-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Where do you want to go? (e.g. Everest Base Camp, Annapurna Circuit)"
                  className="w-full min-w-0 bg-transparent text-[12px] font-medium text-[#08121E] outline-none placeholder:text-[#9aa3b2] sm:text-[14px]"
                />
              </div>
              <button
                type="submit"
                className="h-full shrink-0 rounded-full bg-[#D8A73C] px-4 text-[10px] font-semibold tracking-wide text-[#08121E] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:bg-[#c49630] hover:shadow-[0_8px_24px_rgba(216,167,60,0.45)] sm:px-6 sm:text-[13px]"
              >
                SEARCH JOURNEYS
              </button>
            </form>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-5 pb-4 sm:px-8 lg:px-12 lg:pb-5">
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-stretch lg:justify-between">
            <Link
              href="/about#story"
              className="group flex flex-1 flex-col gap-3 rounded-[18px] border border-white/12 bg-[rgba(8,18,30,0.55)] p-3 backdrop-blur-xl transition-all duration-[350ms] hover:border-[#D8A73C]/35 sm:flex-row sm:items-center sm:gap-4 sm:p-3.5 lg:max-w-[720px]"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#D8A73C]/55 bg-[#D8A73C]/15 text-[#D8A73C] transition-transform group-hover:scale-105">
                  <Play className="size-4 fill-current" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                    Watch Our Story
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/75 sm:text-[12px]">
                    Discover why travelers trust Summit Seek
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 pt-2.5 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                <div className="flex -space-x-2">
                  {avatars.map((src) => (
                    <span
                      key={src}
                      className="relative size-7 overflow-hidden rounded-full border-2 border-[#08121E]"
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="28px" />
                    </span>
                  ))}
                </div>
                <p className="text-[11px] leading-snug text-white/85">
                  <span className="font-bold text-white">Trusted by 3,000+</span>
                  <br />
                  Adventurers Worldwide
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3 rounded-[18px] border border-white/12 bg-[rgba(8,18,30,0.55)] p-3 backdrop-blur-xl sm:p-3.5">
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-white">Need Help Planning?</p>
                <p className="mt-0.5 text-[11px] text-white/75">
                  Our travel experts are here for you.
                </p>
              </div>
              <a
                href="tel:+97714000000"
                aria-label="Call Summit Seek"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#D8A73C] text-[#08121E] shadow-[0_10px_28px_rgba(216,167,60,0.45)] transition-all duration-[350ms] hover:-translate-y-0.5 hover:bg-[#c49630]"
              >
                <Phone className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
