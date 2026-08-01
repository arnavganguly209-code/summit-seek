"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  ShieldCheck,
  Award,
  Users,
  Star,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

const destinations = [
  "Everest Region",
  "Annapurna",
  "Langtang",
  "Manaslu",
  "Mustang",
  "Kanchenjunga",
];
const durations = ["1–7 Days", "8–14 Days", "15–21 Days", "22+ Days"];
const difficulties = ["Easy", "Moderate", "Challenging", "Strenuous"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function Hero() {
  const [query, setQuery] = useState({
    trek: "",
    destination: "",
    duration: "",
    difficulty: "",
    month: "",
  });

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-midnight-deep">
      {/* Full-bleed mountain plane */}
      <div className="absolute inset-0">
        <div className="hero-bg-zoom absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=85"
            alt="Himalayan peaks at dawn — Summit Seek expeditions"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        </div>
        {/* Luxury dark overlay + lighting */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,16,24,0.72)_0%,rgba(11,29,54,0.38)_45%,rgba(6,16,24,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_18%,rgba(201,168,76,0.22),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,16,24,0.55)_0%,transparent_42%)]" />
        <div className="fog-layer absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-midnight-deep/50 via-snow/8 to-transparent" />
        {/* Floating clouds */}
        <div
          className="cloud-layer pointer-events-none absolute -left-[10%] top-[18%] h-40 w-[120%] opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.45) 0%, transparent 50%), radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.3) 0%, transparent 45%), radial-gradient(ellipse at 90% 60%, rgba(255,255,255,0.25) 0%, transparent 40%)",
          }}
        />
      </div>

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center pb-28 pt-36 lg:pb-32 lg:pt-40">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-20">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-sm border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-light">
                <Award className="size-3.5 text-gold" />
                Premium Himalayan Expeditions
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-snow/60">
                Kathmandu · Everest · Annapurna · Beyond
              </p>
              <h1 className="mt-4 max-w-2xl font-display text-[2.65rem] font-semibold leading-[1.08] tracking-tight text-snow sm:text-5xl md:text-6xl xl:text-[4.25rem]">
                Explore Nepal{" "}
                <span className="italic text-gold">Beyond</span> The Ordinary
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-snow/75 md:text-lg">
                Bespoke treks, peak climbs, and luxury lodge journeys crafted for
                travelers who expect excellence — from the first briefing to the
                final summit view.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/trekking" size="lg">
                  Discover Journeys
                </Button>
                <Button href="/plan-your-trip" variant="outlineLight" size="lg">
                  Plan Your Trip
                </Button>
              </div>
            </motion.div>

            {/* Trust badges */}
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.65 }}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {[
                {
                  icon: ShieldCheck,
                  label: "Licensed",
                  value: "Govt. Approved",
                },
                {
                  icon: Award,
                  label: "Experience",
                  value: `${SITE.yearsExperience}+ Years`,
                },
                {
                  icon: Users,
                  label: "Travelers",
                  value: SITE.happyTravelers,
                },
                {
                  icon: Star,
                  label: "Google",
                  value: `${SITE.googleRating}/5 Reviews`,
                },
              ].map((item) => (
                <li
                  key={item.label}
                  className="rounded-xl border border-snow/10 bg-snow/5 px-3 py-3 backdrop-blur-sm"
                >
                  <item.icon className="size-4 text-gold" />
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-snow/50">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-snow">{item.value}</p>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Floating booking panel */}
          <motion.aside
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-2xl border border-snow/15 bg-snow/95 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
              <div className="mb-6 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-dark">
                    Begin Your Journey
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-midnight md:text-3xl">
                    Search Trek
                  </h2>
                </div>
                <Search className="size-5 text-gold-dark" />
              </div>

              <form
                className="space-y-3.5"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Field label="Search Trek">
                  <input
                    type="search"
                    placeholder="Everest Base Camp, Island Peak…"
                    value={query.trek}
                    onChange={(e) => setQuery({ ...query, trek: e.target.value })}
                    className="field-input"
                  />
                </Field>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <Field label="Destination">
                    <Select
                      value={query.destination}
                      onChange={(v) => setQuery({ ...query, destination: v })}
                      options={destinations}
                      placeholder="Select region"
                    />
                  </Field>
                  <Field label="Duration">
                    <Select
                      value={query.duration}
                      onChange={(v) => setQuery({ ...query, duration: v })}
                      options={durations}
                      placeholder="Any length"
                    />
                  </Field>
                  <Field label="Difficulty">
                    <Select
                      value={query.difficulty}
                      onChange={(v) => setQuery({ ...query, difficulty: v })}
                      options={difficulties}
                      placeholder="Any level"
                    />
                  </Field>
                  <Field label="Month">
                    <Select
                      value={query.month}
                      onChange={(v) => setQuery({ ...query, month: v })}
                      options={months}
                      placeholder="Travel month"
                    />
                  </Field>
                </div>
                <Button type="submit" className="mt-2 w-full" size="lg">
                  <Search className="size-4" />
                  Search Journeys
                </Button>
              </form>
            </div>
          </motion.aside>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-snow/55">
          Scroll
        </span>
        <ChevronDown className="size-4 text-gold" />
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate">
        {label}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input appearance-none pr-9"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-light" />
    </div>
  );
}
