"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.75, delay, ease },
});

export function AboutIntro() {
  return (
    <section
      id="about-intro"
      className="relative overflow-hidden bg-white py-[80px] sm:py-[100px] lg:py-[120px]"
      aria-labelledby="about-intro-heading"
    >
      {/* Very light premium texture — no gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-[1320px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10 xl:gap-20">
        {/* LEFT — overlapping dual-image composition */}
        <motion.div {...fadeUp(0)} className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
            {/* Decorative curved accent */}
            <svg
              className="pointer-events-none absolute -bottom-2 -left-3 z-0 h-[42%] w-[55%] text-[#E8A0A0]/70"
              viewBox="0 0 200 160"
              fill="none"
              aria-hidden
            >
              <path
                d="M10 140 C 40 40, 120 20, 190 70"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Large rounded rectangle */}
            <div className="absolute inset-x-[8%] inset-y-[6%] overflow-hidden rounded-[2.5rem] shadow-[0_28px_70px_rgba(8,18,30,0.14)] sm:rounded-[3rem]">
              <Image
                src="/about-main.jpg"
                alt="Himalayan stupa and prayer flags overlooking snow-capped peaks"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority={false}
              />
            </div>

            {/* Circular overlapping image — top left */}
            <div className="absolute left-0 top-0 z-10 size-[38%] max-w-[180px] overflow-hidden rounded-full border-[10px] border-white shadow-[0_18px_40px_rgba(8,18,30,0.16)] sm:size-[42%] sm:max-w-[200px] sm:border-[12px]">
              <Image
                src="/about-circle.jpg"
                alt="Nepal cultural heritage and Himalayan spirit"
                fill
                className="object-cover object-center"
                sizes="200px"
              />
            </div>

            {/* Floating experience card */}
            <motion.div
              className="absolute bottom-[4%] left-0 z-20 flex max-w-[min(100%,300px)] items-center gap-3.5 rounded-2xl border border-white/80 bg-white/95 px-4 py-3.5 shadow-[0_20px_50px_rgba(8,18,30,0.12)] backdrop-blur-md sm:gap-4 sm:px-5 sm:py-4"
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#F0D078] via-[#D8A73C] to-[#9a6f1f] shadow-[0_8px_20px_rgba(216,167,60,0.35)] sm:size-16"
                aria-hidden
              >
                <div className="absolute inset-[3px] rounded-full border-2 border-dashed border-white/50" />
                <div className="text-center leading-none text-[#08121E]">
                  <span className="block font-[family-name:var(--font-display)] text-[18px] font-bold sm:text-[20px]">
                    30+
                  </span>
                  <span className="mt-0.5 block text-[7px] font-bold uppercase tracking-[0.12em] sm:text-[8px]">
                    Years
                  </span>
                </div>
                {/* Ribbon accents */}
                <span className="absolute -bottom-1 left-1/2 h-3 w-8 -translate-x-1/2 rounded-sm bg-[#C43C3C]" />
              </div>
              <p className="text-[13px] leading-snug text-[#2a3342] sm:text-[14px]">
                <span className="font-bold text-[#08121E]">30+ Years of Himalayan Experience</span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT — copy */}
        <div className="text-center lg:text-left">
          <motion.p
            {...fadeUp(0.08)}
            className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#D8A73C]"
          >
            Get to Know Us
          </motion.p>

          <motion.h2
            id="about-intro-heading"
            {...fadeUp(0.16)}
            className="mt-4 font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-[1.18] tracking-[-0.02em] text-[#08121E] sm:text-[2.15rem] md:text-[2.45rem] lg:text-[2.65rem]"
          >
            Your Trusted Trekking Company
            <br className="hidden sm:block" />{" "}
            For Adventure &amp;
            <br className="hidden sm:block" />{" "}
            Tailor-Made Himalayan Journeys
          </motion.h2>

          <motion.p
            {...fadeUp(0.26)}
            className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.9] text-[#5a6577] sm:mt-7 sm:text-[16px] lg:mx-0"
          >
            Summit Seek is a Kathmandu-based trekking and expedition house built on three
            decades of Himalayan know-how. We craft private treks, peak climbs, and cultural
            journeys across Nepal, Tibet, and Bhutan — with local guides, thoughtful pacing,
            and the quiet confidence of a team that has walked these trails for generations.
            Whether you seek Everest Base Camp, a remote restricted circuit, or a lodge-to-lodge
            luxury itinerary, every detail is planned with care from the first briefing to the
            final summit day.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
