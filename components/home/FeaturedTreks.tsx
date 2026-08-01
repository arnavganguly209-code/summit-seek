"use client";

import { motion } from "framer-motion";
import { PackageCard } from "@/components/ui/PackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { featuredTreks } from "@/lib/data/packages";

export function FeaturedTreks() {
  const [lead, ...rest] = featuredTreks;

  return (
    <section className="bg-snow py-20 md:py-28" aria-labelledby="featured-treks">
      <Container>
        <SectionHeading
          eyebrow="Signature Trails"
          title="Featured Treks"
          description="Hand-selected journeys that define the Summit Seek standard — paced with care, guided with mastery."
          href="/trekking"
          linkLabel="All Treks"
        />

        {lead ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-8"
          >
            <PackageCard pkg={lead} variant="editorial" />
          </motion.div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.slice(0, 3).map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
