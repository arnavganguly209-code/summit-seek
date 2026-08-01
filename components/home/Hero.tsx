"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ShieldCheck,
  Award,
  Users,
  Star,
  Play,
  Phone,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export function Hero() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#08121E]">
      {/* Exact hero image — contain, no crop, no zoom */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/hero-summit.jpg"
          alt="Summit Seek trekker celebrating on a Himalayan ridge at golden hour"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-contain object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(4,13,24,0.45)" }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pb-6 pt-[140px] sm:px-6 md:pt-[150px] lg:px-10 xl:pt-[155px]">
          {/* Left content — right side kept open for the climber */}
          <div className="max-w-[640px] xl:max-w-[680px]">
            <motion.span
              {...fadeUp(0.05)}
              className="inline-flex items-center rounded-full border border-[#D8A73C]/70 bg-[#D8A73C]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D8A73C]"
            >
              Premium Himalayan Experiences
            </motion.span>

            <motion.h1
              {...fadeUp(0.12)}
              className="mt-5 font-[family-name:var(--font-display)] text-[2.5rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              Explore Nepal
              <br />
              <span className="italic text-[#D8A73C]">Beyond</span>
              <br />
              The Ordinary
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#D5D8DD] sm:text-base md:text-lg"
            >
              Craft unforgettable trekking holidays, luxury expeditions, peak
              climbing adventures, and tailor-made Himalayan journeys guided by
              Nepal&apos;s trusted local experts.
            </motion.p>

            {/* Luxury pill search */}
            <motion.form
              {...fadeUp(0.28)}
              className="mt-8 flex w-full max-w-[720px] items-center gap-2 rounded-full border border-white/15 bg-white p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 pl-4">
                <Search className="size-5 shrink-0 text-[#D8A73C]" />
                <label className="sr-only" htmlFor="hero-search">
                  Search destinations
                </label>
                <input
                  id="hero-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Where would you like to go? (Everest Base Camp, Annapurna Circuit, Manaslu...)"
                  className="w-full min-w-0 bg-transparent text-[13px] font-medium text-[#08121E] outline-none placeholder:text-[#8a93a3] sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="h-[52px] shrink-0 rounded-full bg-[#D8A73C] px-5 text-[12px] font-semibold tracking-wide text-[#08121E] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#c49630] hover:shadow-[0_12px_28px_rgba(216,167,60,0.4)] sm:px-7 sm:text-[13px] md:h-[56px]"
              >
                SEARCH JOURNEYS
              </button>
            </motion.form>

            {/* Stats */}
            <motion.ul
              {...fadeUp(0.36)}
              className="mt-7 grid max-w-[720px] grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {[
                { icon: Award, value: "20+", label: "Years Experience" },
                { icon: Users, value: "3000+", label: "Happy Travelers" },
                { icon: Star, value: "4.9/5", label: "Google Reviews" },
                { icon: ShieldCheck, value: "Licensed", label: "Govt. of Nepal" },
              ].map((stat) => (
                <li
                  key={stat.label}
                  className="rounded-2xl border border-white/12 bg-white/[0.08] px-3 py-3.5 backdrop-blur-md"
                >
                  <stat.icon className="size-4 text-[#D8A73C]" strokeWidth={1.75} />
                  <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-[#D5D8DD]">
                    {stat.label}
                  </p>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Bottom floating cards */}
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-5 sm:px-6 lg:px-10 lg:pb-7">
          <motion.div
            {...fadeUp(0.42)}
            className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between"
          >
            <Link
              href="/about#story"
              className="group flex max-w-md items-center gap-4 rounded-2xl border border-white/12 bg-[rgba(8,18,30,0.55)] p-3.5 backdrop-blur-xl transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#D8A73C]/40 hover:bg-[rgba(8,18,30,0.7)] sm:p-4"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#D8A73C]/50 bg-[#D8A73C]/15 text-[#D8A73C] transition-transform duration-[350ms] group-hover:scale-105">
                <Play className="size-5 fill-current" />
              </span>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white">
                  Watch Our Story
                </p>
                <p className="mt-1 text-[13px] text-[#D5D8DD]">
                  Discover why travelers trust Summit Seek.
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4 rounded-2xl border border-white/12 bg-[rgba(8,18,30,0.55)] p-3.5 backdrop-blur-xl sm:p-4">
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-white">Need Help Planning?</p>
                <p className="mt-0.5 text-[12px] text-[#D5D8DD]">
                  Our experts are available.
                </p>
              </div>
              <a
                href="tel:+97714000000"
                aria-label="Call Summit Seek"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#D8A73C] text-[#08121E] shadow-[0_10px_28px_rgba(216,167,60,0.4)] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#c49630]"
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
