"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { awards } from "@/lib/data/content";

export function Awards() {
  return (
    <section className="bg-snow py-20 md:py-24" aria-labelledby="awards">
      <Container>
        <SectionHeading
          eyebrow="Recognition"
          title="Awards"
          description="Honors that reflect our commitment to safety, sustainability, and guest experience."
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((award, i) => (
            <motion.article
              key={award.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-mist/50 px-6 py-8 text-center"
            >
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold-dark">
                <Trophy className="size-6" strokeWidth={1.5} />
              </div>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-dark">
                {award.year}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-midnight">
                {award.title}
              </h3>
              <p className="mt-2 text-sm text-slate">{award.org}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
