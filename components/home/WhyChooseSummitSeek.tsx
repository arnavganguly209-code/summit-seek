"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mountain,
  Users,
  SlidersHorizontal,
  Headset,
  Shield,
  BadgeDollarSign,
  Landmark,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    icon: Users,
    title: "Expert Local Guides",
    text: "Certified mountain guides with years of Himalayan experience.",
  },
  {
    icon: SlidersHorizontal,
    title: "Tailor-Made Adventures",
    text: "Trips customized for every traveler.",
  },
  {
    icon: Headset,
    title: "24/7 Travel Support",
    text: "Dedicated assistance before and during your journey.",
  },
  {
    icon: Shield,
    title: "Safe & Responsible Travel",
    text: "Licensed company following sustainable tourism practices.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Value Pricing",
    text: "Transparent pricing with no hidden costs.",
  },
  {
    icon: Landmark,
    title: "Authentic Local Experiences",
    text: "Culture, villages, monasteries and local traditions.",
  },
] as const;

const stats = [
  { value: "1000+", label: "Successful Treks", top: "12%", left: "-6%" },
  { value: "15+", label: "Years of Experience", top: "48%", right: "-4%" },
  { value: "5000+", label: "Happy Travelers", bottom: "8%", left: "8%" },
] as const;

export function WhyChooseSummitSeek() {
  return (
    <section
      id="why-choose"
      className="relative overflow-hidden bg-white py-10 sm:py-[50px] lg:py-[60px]"
      aria-labelledby="why-choose-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-[1320px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10 xl:gap-20">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
        >
          <p className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#D8A73C]">
            <Mountain className="size-3.5" aria-hidden />
            Why Choose Summit Seek
          </p>
          <h2
            id="why-choose-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-[1.85rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#08121E] sm:text-[2.25rem] lg:text-[2.55rem]"
          >
            Travel Nepal With Confidence
          </h2>
          <p className="mt-4 max-w-[540px] text-[15px] leading-[1.8] text-[#5a6577] sm:text-[16px]">
            Experience the Himalayas with trusted local experts, personalized itineraries,
            and unforgettable adventures crafted for every traveler.
          </p>

          <div className="mt-6 max-w-[560px] space-y-4 text-[14px] leading-[1.85] text-[#4a5260] sm:text-[15px]">
            <p>
              Our guides are born of these mountains — men and women who know the rhythm of
              the trail, the weather on a high pass, and the quiet hospitality of villages
              few maps still mark. You walk with people who treat your journey as their own
              craft.
            </p>
            <p>
              We keep groups intimate, itineraries flexible, and safety non-negotiable.
              Acclimatization is paced with care. Equipment and evacuation protocols are
              prepared long before you lace a boot. Every trek is licensed, insured, and
              planned to leave the land as we found it.
            </p>
            <p>
              Between summit days and lodge evenings, we open doors to monasteries, tea
              houses, and family kitchens — the living culture that makes Nepal more than a
              destination. This is travel measured in meaning, not just metres gained.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease }}
                  className="rounded-2xl border border-[#e8ebf0] bg-[#F9FAFB] p-4 transition-all duration-300 hover:border-[#D8A73C]/35 hover:bg-white hover:shadow-[0_14px_36px_rgba(8,18,30,0.06)] sm:p-5"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#D8A73C]/12 text-[#D8A73C]">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="mt-3 text-[14px] font-bold text-[#08121E]">{feature.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#5a6577]">
                    {feature.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT — image composition */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full">
            {/* Main large image */}
            <div className="absolute inset-x-[10%] inset-y-[8%] overflow-hidden rounded-[28px] shadow-[0_32px_70px_rgba(8,18,30,0.16)]">
              <Image
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=85"
                alt="Himalayan trekker on a mountain trail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>

            {/* Top overlapping image */}
            <div className="absolute left-0 top-[4%] z-10 h-[28%] w-[42%] overflow-hidden rounded-[22px] border-[6px] border-white shadow-[0_18px_40px_rgba(8,18,30,0.14)]">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=85"
                alt="Snow-capped Himalayan peaks at golden hour"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>

            {/* Bottom overlapping image */}
            <div className="absolute bottom-[6%] right-0 z-10 h-[30%] w-[44%] overflow-hidden rounded-[22px] border-[6px] border-white shadow-[0_18px_40px_rgba(8,18,30,0.14)]">
              <Image
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=85"
                alt="Prayer flags against mountain sky"
                fill
                className="object-cover"
                sizes="220px"
              />
            </div>

            {/* Floating glass stats */}
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="absolute z-20 rounded-2xl border border-white/70 bg-white/92 px-4 py-3 shadow-[0_16px_40px_rgba(8,18,30,0.12)] backdrop-blur-md"
                style={{
                  top: "top" in stat ? stat.top : undefined,
                  left: "left" in stat ? stat.left : undefined,
                  right: "right" in stat ? stat.right : undefined,
                  bottom: "bottom" in stat ? stat.bottom : undefined,
                }}
                animate={{ y: [0, i % 2 === 0 ? -8 : -6, 0] }}
                transition={{
                  duration: 5 + i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-[#D8A73C]">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5a6577]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
