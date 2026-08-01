"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Users,
  SlidersHorizontal,
  BadgeDollarSign,
  Shield,
  Headset,
  Leaf,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Government Licensed",
    text: "Fully authorized operator with transparent credentials and compliance.",
  },
  {
    icon: Users,
    title: "Local Expert Guides",
    text: "Sherpa and Nepali leaders with deep regional knowledge and first-aid certification.",
  },
  {
    icon: SlidersHorizontal,
    title: "100% Custom Trips",
    text: "Every itinerary shaped around your pace, goals, and travel style.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Price Promise",
    text: "Fair, all-inclusive pricing with no hidden trail-side surprises.",
  },
  {
    icon: Shield,
    title: "Safety First",
    text: "Pulse oximeters, evacuation protocols, and conservative altitude management.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    text: "Round-the-clock assistance from Kathmandu operations and field teams.",
  },
  {
    icon: Leaf,
    title: "Eco Tourism",
    text: "Leave-no-trace ethos, community partnerships, and responsible logistics.",
  },
];

export function WhySummitSeek() {
  return (
    <section className="bg-mist py-20 md:py-28" aria-labelledby="why-summit-seek">
      <Container>
        <SectionHeading
          eyebrow="Our Promise"
          title="Why Summit Seek"
          description="Seven principles that define how we design, guide, and care for every journey."
          align="center"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reasons.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className={`rounded-2xl border border-border bg-snow p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(11,29,54,0.08)] ${
                i === reasons.length - 1 ? "sm:col-span-2 lg:col-span-1 xl:col-span-1" : ""
              }`}
            >
              <span className="flex size-12 items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-br from-gold/15 to-transparent text-midnight">
                <item.icon className="size-5 text-gold-dark" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-midnight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
