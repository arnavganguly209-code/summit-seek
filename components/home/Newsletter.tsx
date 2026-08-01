"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-mist-deep py-16 md:py-20" aria-labelledby="newsletter">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-dark">
            Stay Inspired
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-midnight md:text-4xl">
            Newsletter
          </h2>
          <p className="mt-3 text-slate">
            Seasonal itineraries, trail insights, and early access to limited departures —
            delivered with restraint.
          </p>
          {sent ? (
            <p className="mt-8 text-sm font-semibold text-midnight">
              Thank you — you&apos;re on the list.
            </p>
          ) : (
            <form
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="field-input h-13 flex-1 bg-snow"
              />
              <Button type="submit" size="lg" className="sm:w-auto">
                <Send className="size-4" />
                Subscribe
              </Button>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
