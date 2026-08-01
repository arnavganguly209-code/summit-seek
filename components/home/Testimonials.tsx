"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/data/content";
import { SITE } from "@/lib/constants";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-midnight py-20 md:py-28" aria-labelledby="testimonials">
      <Container>
        <SectionHeading
          eyebrow="Verified Travelers"
          title="Testimonials"
          description="Stories from guests who trusted us with their Himalayan chapter."
          light
          align="center"
        />

        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-center gap-2 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-current" />
            ))}
            <span className="ml-2 text-sm font-bold text-snow/80">
              Google {SITE.googleRating}/5
            </span>
          </div>

          <div className="relative min-h-[280px] rounded-2xl border border-snow/10 bg-snow/5 p-8 backdrop-blur-sm md:p-12">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <p className="font-display text-2xl leading-relaxed text-snow md:text-3xl">
                  &ldquo;{active.text}&rdquo;
                </p>
                <footer className="mt-8 flex flex-col items-center gap-3">
                  <div className="relative size-14 overflow-hidden rounded-full border-2 border-gold/40">
                    <Image
                      src={active.avatar}
                      alt={active.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <cite className="not-italic">
                      <span className="inline-flex items-center gap-2 text-base font-bold text-snow">
                        {active.name}
                        <BadgeCheck className="size-4 text-gold" />
                      </span>
                    </cite>
                    <p className="mt-1 text-sm text-snow/60">
                      <span className="mr-1.5 inline-block" aria-hidden>
                        {flagEmoji(active.countryCode)}
                      </span>
                      {active.country} · {active.trek}
                    </p>
                    <p className="mt-0.5 text-xs text-snow/40">{active.date}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex size-11 items-center justify-center rounded-full border border-snow/20 text-snow transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronLeft className="size-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-8 bg-gold" : "w-2 bg-snow/30"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex size-11 items-center justify-center rounded-full border border-snow/20 text-snow transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function flagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
}
