"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function LuxuryCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-labelledby="luxury-cta">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85"
          alt="Himalayan ridge at twilight"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-midnight/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.2),transparent_60%)]" />
      </div>
      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold">
            Your Himalaya Awaits
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-snow md:text-5xl lg:text-6xl">
            Craft a Journey That Stays With You Forever
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-snow/75">
            Tell us how you want to feel on the trail — we&apos;ll design the rest with
            precision and quiet luxury.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/plan-your-trip" size="lg">
              Plan Your Trip
            </Button>
            <Button href="/contact" variant="outlineLight" size="lg">
              Speak With an Expert
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
