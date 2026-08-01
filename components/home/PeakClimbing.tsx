"use client";

import { motion } from "framer-motion";
import { PackageCard } from "@/components/ui/PackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { peakPackages } from "@/lib/data/packages";

export function PeakClimbing() {
  return (
    <section className="bg-snow py-20 md:py-28" aria-labelledby="peak-climbing">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="Alpine Ambition"
            title="Peak Climbing"
            description="Technical summits guided by seasoned climbers — Island Peak, Mera, Lobuche, and beyond."
            href="/peak-climbing"
            className="mb-0!"
          />
          <p className="max-w-xl text-slate lg:justify-self-end lg:text-right">
            Every climb includes acclimatization strategy, equipment briefings, and contingency planning — the quiet architecture of a successful summit.
          </p>
        </div>

        <div className="mt-12 flex gap-5 overflow-x-auto pb-4 luxury-scroll snap-x snap-mandatory">
          {peakPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="w-[min(100%,340px)] shrink-0 snap-start"
            >
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
