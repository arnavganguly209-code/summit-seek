"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flag, Mountain } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { expeditionPackages } from "@/lib/data/packages";
import { formatPrice } from "@/lib/utils";

export function Expeditions() {
  return (
    <section className="bg-mist-deep py-20 md:py-28" aria-labelledby="expeditions">
      <Container>
        <SectionHeading
          eyebrow="Full-Scale Mountaineering"
          title="Expeditions"
          description="Multi-week campaigns on the great Himalayan peaks — logistics, oxygen strategy, and elite mountain crews."
          href="/expeditions"
        />

        <div className="space-y-6">
          {expeditionPackages.map((pkg, i) => (
            <motion.article
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group grid overflow-hidden rounded-2xl border border-border bg-snow shadow-[0_16px_40px_rgba(11,29,54,0.05)] md:grid-cols-[280px_1fr_auto]"
            >
              <div className="relative min-h-[200px] md:min-h-full">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="280px"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="mb-2 inline-flex items-center gap-2 text-gold-dark">
                  <Flag className="size-4" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                    {pkg.region}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-midnight md:text-3xl">
                  <Link href={`/treks/${pkg.slug}`} className="hover:text-gold-dark">
                    {pkg.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-xl text-slate">{pkg.shortDescription}</p>
                <ul className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-midnight">
                  <li className="inline-flex items-center gap-1.5">
                    <Mountain className="size-3.5 text-gold-dark" />
                    {pkg.altitude}
                  </li>
                  <li>{pkg.duration}</li>
                  <li>{pkg.difficulty}</li>
                </ul>
              </div>
              <div className="flex flex-col items-start justify-center gap-4 border-t border-border p-6 md:border-l md:border-t-0 md:px-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-light">
                    Expedition from
                  </p>
                  <p className="font-display text-3xl font-semibold text-midnight">
                    {formatPrice(pkg.price, pkg.currency)}
                  </p>
                </div>
                <Button href={`/contact?book=${pkg.slug}`} size="sm">
                  Inquire
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
