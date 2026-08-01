"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mountain, ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    id: "peak-climbing",
    title: "Peak Climbing",
    subtitle: "12 Experiences",
    href: "/peak-climbing",
    image:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "mountain-flights",
    title: "Mountain Flights",
    subtitle: "8 Experiences",
    href: "/helicopter-tours",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "adventure",
    title: "Adventure Activities",
    subtitle: "15 Experiences",
    href: "/day-tours",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "wildlife",
    title: "Wildlife & Jungle Safari",
    subtitle: "6 Experiences",
    href: "/destinations/hidden-himalayas",
    image:
      "https://images.unsplash.com/photo-1564760055775-d63b17a69df2?auto=format&fit=crop&w=900&q=85",
  },
] as const;

export function WhatWeOffer() {
  return (
    <section
      id="what-we-offer"
      className="relative overflow-hidden bg-white py-[80px] sm:py-[100px] lg:py-[120px]"
      aria-labelledby="what-we-offer-heading"
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
            <Mountain className="size-3.5" aria-hidden />
            What We Offer
          </p>
          <h2
            id="what-we-offer-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-[1.85rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#08121E] sm:text-[2.35rem] lg:text-[2.65rem]"
          >
            Explore Our Services &amp; Experiences
          </h2>
          <p className="mx-auto mt-4 max-w-[720px] text-[15px] leading-[1.75] text-[#5a6577] sm:text-[16px]">
            Beyond trekking, discover unforgettable Himalayan adventures, cultural
            experiences, wildlife tours and premium travel services.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-[30px] sm:mt-14 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease }}
            >
              <Link
                href={service.href}
                className="group relative block h-[420px] overflow-hidden rounded-[24px] shadow-[0_18px_48px_rgba(8,18,30,0.1)] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_28px_64px_rgba(8,18,30,0.18)] sm:h-[480px] xl:h-[520px]"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />

                {/* Luxury gradient overlay */}
                <div
                  className="absolute inset-0 transition-colors duration-[350ms]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(4,13,24,0.12) 0%, rgba(4,13,24,0.28) 45%, rgba(4,13,24,0.78) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(4,13,24,0.22) 0%, rgba(4,13,24,0.4) 45%, rgba(4,13,24,0.88) 100%)",
                  }}
                  aria-hidden
                />

                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[1.45rem] font-bold leading-tight text-white sm:text-[1.6rem]">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] font-medium text-white/70">
                      {service.subtitle}
                    </p>
                  </div>

                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/85 bg-transparent px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[#D8A73C] group-hover:bg-[#D8A73C] group-hover:text-[#08121E] group-hover:shadow-[0_10px_28px_rgba(216,167,60,0.4)]">
                    Explore More
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
