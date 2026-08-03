"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mountain, ArrowUpRight } from "lucide-react";
import type { WhatWeOfferContent } from "@/types/what-we-offer";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = { content: WhatWeOfferContent };

export function WhatWeOffer({ content }: Props) {
  if (!content.visible) return null;
  const cards = content.cards.filter((c) => c.visible !== false);
  if (!cards.length) return null;

  return (
    <section
      id="what-we-offer"
      className="relative overflow-hidden bg-white py-10 sm:py-[50px] lg:py-[60px]"
      aria-labelledby="what-we-offer-heading"
    >
      <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[740px] text-center font-[family-name:var(--font-ui)]">
          <p className="inline-flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.22em] text-[#D8A34A]">
            <Mountain className="size-3.5" aria-hidden />
            {content.eyebrow}
          </p>
          <h2
            id="what-we-offer-heading"
            className="mt-3 text-[1.7rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#0b1524] sm:text-[2.1rem] lg:text-[2.35rem]"
          >
            {content.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-[680px] text-[14px] font-medium leading-[1.7] text-[#5a6577] sm:text-[15px]">
            {content.description}
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-7">
          {cards.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease }}
            >
              <Link
                href={service.href}
                className="group relative block h-[400px] overflow-hidden rounded-[22px] shadow-[0_16px_40px_rgba(11,21,36,0.12)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_52px_rgba(11,21,36,0.18)] sm:h-[460px] xl:h-[500px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(4,13,24,0.18) 0%, rgba(4,13,24,0.35) 42%, rgba(4,13,24,0.82) 100%)",
                  }}
                />

                <div className="absolute inset-0 flex flex-col justify-between p-5 font-[family-name:var(--font-ui)] sm:p-6">
                  <div>
                    <h3 className="text-[1.35rem] font-bold leading-tight tracking-[-0.01em] text-white sm:text-[1.5rem]">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] font-semibold text-white/75">
                      {service.subtitle}
                    </p>
                  </div>

                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/90 bg-transparent px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition group-hover:border-[#F58220] group-hover:bg-[#F58220] group-hover:text-white">
                    {service.ctaLabel || "Explore More"}
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
