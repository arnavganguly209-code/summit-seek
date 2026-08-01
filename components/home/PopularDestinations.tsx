"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { destinations } from "@/lib/data/content";

export function PopularDestinations() {
  return (
    <section className="bg-mist py-20 md:py-28" aria-labelledby="destinations">
      <Container>
        <SectionHeading
          eyebrow="Where We Go"
          title="Popular Destinations"
          description="From iconic Khumbu trails to restricted kingdoms — each region shaped by our local expertise."
          href="/destinations"
        />

        <div className="grid auto-rows-[220px] gap-4 md:auto-rows-[260px] md:grid-cols-6 md:gap-5">
          {destinations.map((dest, i) => {
            const spans = [
              "md:col-span-3 md:row-span-2",
              "md:col-span-3",
              "md:col-span-2",
              "md:col-span-2",
              "md:col-span-2",
              "md:col-span-3",
            ];
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className={spans[i] ?? "md:col-span-2"}
              >
                <Link
                  href={dest.href}
                  className="group relative block h-full overflow-hidden rounded-2xl"
                >
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-deep/85 via-midnight/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-7">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                        {dest.region}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-snow md:text-3xl">
                        {dest.name}
                      </h3>
                      <p className="mt-1 text-sm text-snow/70">{dest.treks} journeys</p>
                    </div>
                    <span className="flex size-10 items-center justify-center rounded-full border border-snow/25 bg-snow/10 text-snow transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-midnight">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
