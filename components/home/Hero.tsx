"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ShieldCheck,
  Mountain,
  Users,
  Star,
  Play,
  Phone,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease },
});

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
];

export function Hero() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative h-[100svh] min-h-[700px] overflow-hidden bg-[#08121E]">
      {/* Full-bleed hero — no zoom animation, image fills viewport like reference */}
      <div className="absolute inset-0">
        <Image
          src="/hero-summit.jpg"
          alt="Summit Seek trekker celebrating on a Himalayan ridge at golden hour"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[58%_42%] sm:object-[55%_40%] lg:object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(4,13,24,0.45)" }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pt-[130px] pb-4 sm:px-8 lg:px-12 xl:pt-[140px]">
          <div className="max-w-[620px] lg:max-w-[640px]">
            {/* Badge */}
            <motion.div {...fadeUp(0.05)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D8A73C]/75 bg-[rgba(8,18,30,0.25)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                <Mountain className="size-3.5 text-[#D8A73C]" />
                Premium Himalayan Experiences
              </span>
            </motion.div>

            {/* Headline — matches reference typography */}
            <motion.h1
              {...fadeUp(0.12)}
              className="mt-5 font-[family-name:var(--font-display)] text-[2.75rem] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]"
            >
              Explore Nepal{" "}
              <span className="italic text-[#D8A73C]">Beyond</span>
              <br />
              The Ordinary
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-5 max-w-[540px] text-[15px] leading-[1.7] text-white/90 sm:text-base md:text-[17px]"
            >
              Bespoke treks, peak climbs, and luxury journeys crafted for
              travelers who expect excellence — from the first step to the final
              summit.
            </motion.p>

            {/* Search pill — exact reference layout */}
            <motion.form
              {...fadeUp(0.28)}
              className="mt-8 flex h-[60px] w-full max-w-[680px] items-center rounded-full bg-white p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:h-[68px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 pl-4 sm:pl-5">
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
                  className="w-full min-w-0 truncate bg-transparent text-[13px] font-medium text-[#08121E] outline-none placeholder:text-[#9aa3b2] sm:text-[14px]"
                />
              </div>
              <button
                type="submit"
                className="h-full shrink-0 rounded-full bg-[#D8A73C] px-5 text-[11px] font-semibold tracking-wide text-[#08121E] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:bg-[#c49630] hover:shadow-[0_10px_24px_rgba(216,167,60,0.45)] sm:px-7 sm:text-[13px]"
              >
                SEARCH JOURNEYS
              </button>
            </motion.form>

            {/* Trust stats — inline icons like reference (not cards) */}
            <motion.ul
              {...fadeUp(0.36)}
              className="mt-7 flex max-w-[700px] flex-wrap gap-x-6 gap-y-4 sm:gap-x-8 lg:gap-x-10"
            >
              {[
                { icon: Mountain, value: "20+", label: "Years of Experience" },
                { icon: Users, value: "3,000+", label: "Happy Travelers" },
                { icon: Star, value: "4.9/5", label: "Google Reviews" },
                { icon: ShieldCheck, value: "Licensed", label: "Govt. of Nepal" },
              ].map((stat) => (
                <li key={stat.label} className="flex items-center gap-2.5">
                  <stat.icon className="size-5 shrink-0 text-[#D8A73C]" strokeWidth={1.75} />
                  <div>
                    <p className="text-[14px] font-bold leading-none text-white sm:text-[15px]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-white/80 sm:text-[12px]">
                      {stat.label}
                    </p>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Bottom floating widgets — exact reference */}
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-5 sm:px-8 lg:px-12 lg:pb-7">
          <motion.div
            {...fadeUp(0.42)}
            className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
          >
            <Link
              href="/about#story"
              className="group flex flex-col gap-3 rounded-[18px] border border-white/12 bg-[rgba(8,18,30,0.58)] p-3.5 backdrop-blur-xl transition-all duration-[350ms] hover:border-[#D8A73C]/35 sm:flex-row sm:items-center sm:gap-5 sm:p-4 md:max-w-[720px]"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3.5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#D8A73C]/55 bg-[#D8A73C]/15 text-[#D8A73C] transition-transform group-hover:scale-105">
                  <Play className="size-5 fill-current" />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white">
                    Watch Our Story
                  </p>
                  <p className="mt-0.5 text-[12px] text-white/75 sm:text-[13px]">
                    Discover why travelers trust Summit Seek
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 pt-3 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <div className="flex -space-x-2.5">
                  {avatars.map((src) => (
                    <span
                      key={src}
                      className="relative size-8 overflow-hidden rounded-full border-2 border-[#08121E]"
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="32px" />
                    </span>
                  ))}
                </div>
                <p className="text-[12px] leading-snug text-white/85">
                  <span className="font-bold text-white">Trusted by 3,000+</span>
                  <br />
                  Adventurers Worldwide
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4 rounded-[18px] border border-white/12 bg-[rgba(8,18,30,0.58)] p-3.5 backdrop-blur-xl sm:p-4">
              <div className="min-w-0">
                <p className="text-[14px] font-bold text-white">Need Help Planning?</p>
                <p className="mt-0.5 text-[12px] text-white/75">
                  Our travel experts are here for you.
                </p>
              </div>
              <a
                href="tel:+97714000000"
                aria-label="Call Summit Seek"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#D8A73C] text-[#08121E] shadow-[0_10px_28px_rgba(216,167,60,0.45)] transition-all duration-[350ms] hover:-translate-y-0.5 hover:bg-[#c49630]"
              >
                <Phone className="size-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
