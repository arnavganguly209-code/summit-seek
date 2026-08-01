"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Utensils, BedDouble, Plane } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const perks = [
  {
    icon: BedDouble,
    title: "Boutique Mountain Lodges",
    text: "Curated stays with private baths, mountain views, and thoughtful hospitality.",
  },
  {
    icon: Utensils,
    title: "Private Dining",
    text: "Seasonal menus prepared by lodge chefs — nourishment as ritual.",
  },
  {
    icon: Plane,
    title: "Heli Options",
    text: "Scenic flights and flexible returns that reshape how you experience the Khumbu.",
  },
  {
    icon: Sparkles,
    title: "Concierge Care",
    text: "A dedicated trip designer from first inquiry through homecoming.",
  },
];

export function LuxuryExperience() {
  return (
    <section className="bg-snow py-20 md:py-28" aria-labelledby="luxury-experience">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Himalayan lodge experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-56 overflow-hidden rounded-xl border border-border bg-snow p-2 shadow-xl md:block lg:-right-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80"
                  alt="Private trekking moment"
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-dark">
              The Summit Seek Difference
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-midnight md:text-5xl">
              Luxury Experience
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              Adventure refined. We pair the raw beauty of the Himalaya with service
              standards inspired by the world&apos;s finest hospitality houses —
              intimate, intentional, unforgettable.
            </p>
            <ul className="mt-8 space-y-5">
              {perks.map((perk) => (
                <li key={perk.title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold-dark">
                    <perk.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-midnight">{perk.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate">{perk.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button href="/luxury-trek" size="lg">
                Discover Luxury Treks
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
