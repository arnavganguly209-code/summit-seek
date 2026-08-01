"use client";

import { motion } from "framer-motion";
import { Star, BadgeCheck, Building2, Landmark } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

const trusts = [
  {
    icon: Star,
    title: "Google Reviews",
    subtitle: `${SITE.googleRating} · ${SITE.googleReviews}+ reviews`,
  },
  {
    icon: BadgeCheck,
    title: "TripAdvisor",
    subtitle: "Travellers' Choice",
  },
  {
    icon: Building2,
    title: "Adventure Association",
    subtitle: "TAAN · NMA Member",
  },
  {
    icon: Landmark,
    title: "Government License",
    subtitle: SITE.license,
  },
];

export function TrustedBy() {
  return (
    <section className="relative z-20 -mt-8 bg-snow pb-4 pt-2 md:-mt-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="rounded-2xl border border-border bg-snow px-5 py-6 shadow-[0_24px_60px_rgba(11,29,54,0.1)] md:px-8"
        >
          <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-slate-light">
            Trusted By Discerning Travelers Worldwide
          </p>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trusts.map((item) => (
              <li
                key={item.title}
                className="flex items-center gap-3 border-border sm:justify-center lg:border-r lg:last:border-r-0"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-dark">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-midnight">{item.title}</p>
                  <p className="text-xs text-slate">{item.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
