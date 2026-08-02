"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Medal } from "lucide-react";
import type { AboutIntroContent } from "@/types/about-intro";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, delay, ease },
});

type Props = {
  content: AboutIntroContent;
};

export function AboutIntro({ content }: Props) {
  if (!content.visible) return null;

  const isLocal = (url: string) => url.startsWith("/");

  return (
    <section
      id="about-intro"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-[100px]"
      aria-labelledby="about-intro-heading"
    >
      <div className="relative mx-auto grid w-full max-w-[1320px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-10 xl:gap-20">
        <motion.div
          {...fadeUp(0)}
          className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
            <svg
              className="pointer-events-none absolute -bottom-1 -left-2 z-0 h-[40%] w-[52%] text-[#0b1524]/12"
              viewBox="0 0 200 160"
              fill="none"
              aria-hidden
            >
              <path
                d="M10 140 C 40 40, 120 20, 190 70"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-x-[8%] inset-y-[6%] overflow-hidden rounded-[2.25rem] shadow-[0_28px_70px_rgba(11,21,36,0.14)] sm:rounded-[2.75rem]">
              <Image
                src={content.mainImageUrl}
                alt={content.mainImageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 45vw"
                unoptimized={isLocal(content.mainImageUrl)}
              />
            </div>

            <div className="absolute left-0 top-0 z-10 size-[36%] max-w-[170px] overflow-hidden rounded-full border-[9px] border-white shadow-[0_18px_40px_rgba(11,21,36,0.16)] sm:size-[40%] sm:max-w-[190px] sm:border-[11px]">
              <Image
                src={content.circleImageUrl}
                alt={content.circleImageAlt}
                fill
                className="object-cover object-center"
                sizes="200px"
                unoptimized={isLocal(content.circleImageUrl)}
              />
            </div>

            <motion.div
              className="absolute bottom-[5%] left-0 z-20 flex max-w-[min(100%,290px)] items-center gap-3 rounded-2xl border border-[#e8ebf2] bg-white px-3.5 py-3 shadow-[0_18px_44px_rgba(11,21,36,0.12)] sm:gap-3.5 sm:px-4 sm:py-3.5"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0b1524] text-white sm:size-14"
                aria-hidden
              >
                <Medal className="size-6 text-[#D8A34A]" strokeWidth={2} />
              </div>
              <p className="font-[family-name:var(--font-ui)] text-[13px] leading-snug text-[#2a3342] sm:text-[14px]">
                {content.experiencePrefix}{" "}
                <span className="font-bold text-[#0b1524]">
                  {content.experienceHighlight}
                </span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="text-center lg:text-left">
          <motion.p
            {...fadeUp(0.06)}
            className="font-[family-name:var(--font-ui)] text-[12px] font-bold uppercase tracking-[0.2em] text-[#0b1524]"
          >
            {content.eyebrow}
          </motion.p>

          <motion.h2
            id="about-intro-heading"
            {...fadeUp(0.12)}
            className="mt-3 font-[family-name:var(--font-ui)] text-[1.9rem] font-extrabold leading-[1.2] tracking-[-0.025em] text-[#0b1524] sm:mt-4 sm:text-[2.35rem] md:text-[2.55rem] lg:text-[2.75rem]"
          >
            {content.heading}
          </motion.h2>

          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mt-5 max-w-[640px] font-[family-name:var(--font-ui)] text-[14.5px] font-medium leading-[1.85] text-[#5a6577] sm:mt-6 sm:text-[15.5px] lg:mx-0"
          >
            {content.description}
          </motion.p>

          <motion.ul
            {...fadeUp(0.28)}
            className="mx-auto mt-7 max-w-[640px] space-y-3.5 text-left lg:mx-0"
          >
            {content.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-[family-name:var(--font-ui)] text-[14.5px] font-semibold text-[#0b1524] sm:text-[15px]"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#0b1524] text-white sm:size-[26px]">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div {...fadeUp(0.36)} className="mt-8 sm:mt-9">
            <Link
              href={content.ctaHref || "/about"}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0b1524] px-8 font-[family-name:var(--font-ui)] text-[13px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_12px_28px_rgba(11,21,36,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_16px_32px_rgba(29,78,216,0.32)]"
            >
              {content.ctaLabel}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
