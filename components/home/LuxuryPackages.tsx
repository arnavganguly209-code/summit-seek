"use client";

import { motion } from "framer-motion";
import { PackageCard } from "@/components/ui/PackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { luxuryPackages } from "@/lib/data/packages";

export function LuxuryPackages() {
  return (
    <section className="relative overflow-hidden bg-midnight py-20 md:py-28" aria-labelledby="luxury-packages">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Refined Adventure"
          title="Luxury Packages"
          description="Lodge-to-lodge comfort, private service, and Himalayan grandeur — without compromise."
          light
          href="/luxury-trek"
          linkLabel="Explore Luxury"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {luxuryPackages.slice(0, 3).map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
            >
              <PackageCard pkg={pkg} variant="overlay" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
