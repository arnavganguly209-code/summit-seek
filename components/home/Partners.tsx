"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { partners } from "@/lib/data/content";

export function Partners() {
  return (
    <section className="border-y border-border bg-mist py-14 md:py-16" aria-labelledby="partners">
      <Container>
        <p className="mb-8 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-slate-light">
          Partners & Affiliations
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {partners.map((name, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="font-display text-lg font-semibold tracking-wide text-midnight/45 transition-colors hover:text-midnight md:text-xl"
            >
              {name}
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
