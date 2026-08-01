"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Star,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedInIcon,
  TripadvisorIcon,
} from "@/components/ui/SocialIcons";
import { Logo } from "@/components/layout/Logo";
import { SITE, SOCIAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const destinations = [
  { label: "Everest Region", href: "/destinations/everest" },
  { label: "Annapurna", href: "/destinations/annapurna" },
  { label: "Langtang", href: "/destinations/langtang" },
  { label: "Manaslu", href: "/destinations/manaslu" },
  { label: "Mustang", href: "/destinations/mustang" },
  { label: "Dolpo", href: "/destinations/dolpo" },
  { label: "Kanchenjunga", href: "/destinations/kanchenjunga" },
  { label: "Makalu", href: "/destinations/makalu" },
  { label: "Hidden Himalayas", href: "/destinations/hidden-himalayas" },
];

const trekking = [
  { label: "Everest Base Camp", href: "/treks/everest-base-camp" },
  { label: "Annapurna Base Camp", href: "/treks/annapurna-base-camp" },
  { label: "Manaslu Circuit", href: "/treks/manaslu-circuit" },
  { label: "Langtang Valley", href: "/treks/langtang-valley" },
  { label: "Upper Mustang", href: "/treks/upper-mustang" },
  { label: "Peak Climbing", href: "/peak-climbing" },
  { label: "Luxury Trek", href: "/luxury-trek" },
  { label: "Travel Guide", href: "/travel-guide" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/about#team" },
  { label: "Why Summit Seek", href: "/#why-choose" },
  { label: "Travel Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Booking Policy", href: "/booking-policy" },
];

const socials = [
  { href: SOCIAL.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SOCIAL.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SOCIAL.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: SOCIAL.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: SOCIAL.tripadvisor, label: "Tripadvisor", Icon: TripadvisorIcon },
];

const payments = ["Visa", "Mastercard", "Amex", "UnionPay", "PayPal", "Khalti", "eSewa"];

const ease = [0.22, 1, 0.36, 1] as const;

function MountainLayers() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -top-[1px] z-0 h-[120px] overflow-hidden sm:h-[140px] lg:h-[160px]">
      <motion.svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        initial={{ y: 8 }}
        animate={{ y: [8, 0, 8] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        {/* Far snow peaks */}
        <path
          d="M0 160 L0 95 L80 70 L140 100 L220 45 L300 90 L380 55 L480 100 L560 40 L650 85 L740 50 L820 95 L900 60 L980 100 L1080 48 L1180 90 L1280 55 L1360 85 L1440 70 L1440 160 Z"
          fill="#0d2135"
          opacity="0.9"
        />
        {/* Mid green hills */}
        <path
          d="M0 160 L0 115 L90 100 L180 120 L280 95 L400 118 L520 98 L640 122 L760 100 L900 120 L1040 102 L1180 118 L1300 105 L1440 120 L1440 160 Z"
          fill="#1a3d32"
          opacity="0.55"
        />
        {/* Near dark ridges */}
        <path
          d="M0 160 L0 128 L120 118 L240 135 L360 120 L500 138 L640 122 L800 140 L960 125 L1120 142 L1280 128 L1440 138 L1440 160 Z"
          fill="#061018"
        />
        {/* Snow highlight accents */}
        <path
          d="M220 45 L235 58 L250 48 L265 62 L280 50 L260 70 L240 65 Z"
          fill="#e8eef5"
          opacity="0.35"
        />
        <path
          d="M560 40 L575 55 L595 45 L610 60 L630 48 L605 72 L580 65 Z"
          fill="#e8eef5"
          opacity="0.32"
        />
        <path
          d="M1080 48 L1095 62 L1115 52 L1130 68 L1150 55 L1125 78 L1100 70 Z"
          fill="#e8eef5"
          opacity="0.3"
        />
        {/* Tiny trekker silhouettes on ridge */}
        <g fill="#040d14" opacity="0.85">
          <circle cx="620" cy="118" r="1.6" />
          <path d="M620 119.5 L618.5 126 L621.5 126 Z" />
          <circle cx="632" cy="117" r="1.5" />
          <path d="M632 118.5 L630.5 125 L633.5 125 Z" />
          <circle cx="645" cy="119" r="1.4" />
          <path d="M645 120.5 L643.6 126.5 L646.4 126.5 Z" />
        </g>
      </motion.svg>

      {/* Soft fade into footer body */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-[#071522]" />
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block text-[13px] text-white/65 transition-colors duration-300 hover:text-[#D8A73C]"
    >
      {children}
      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#D8A73C] transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D8A73C]">
        {title}
      </h3>
      <div className="mt-3 mb-5 h-px w-9 bg-gradient-to-r from-[#D8A73C] to-transparent" />
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative mt-8 overflow-hidden bg-[#071522] text-white">
      <MountainLayers />

      {/* Top CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="relative z-10 mx-auto max-w-[1320px] px-5 pt-[100px] sm:px-8 sm:pt-[120px] lg:px-10"
      >
        <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] border border-white/10 bg-white/[0.06] px-6 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-8 sm:py-7 lg:flex-row lg:items-center">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold leading-snug text-white sm:text-[1.6rem]">
              Ready to Plan Your Himalayan Adventure?
            </p>
            <p className="mt-1.5 text-[13px] text-white/65 sm:text-[14px]">
              Speak with our travel experts today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan-your-trip"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#D8A73C] px-6 text-[12px] font-bold uppercase tracking-[0.1em] text-[#08121E] shadow-[0_12px_32px_rgba(216,167,60,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c49630] hover:shadow-[0_16px_40px_rgba(216,167,60,0.5)]"
            >
              Plan Your Trip
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-full border border-white/35 bg-white/5 px-6 text-[12px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#D8A73C] hover:text-[#D8A73C]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main columns */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, delay: 0.08, ease }}
        className="relative z-10 mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16"
      >
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo className="[&_img]:brightness-110" />
            <p className="mt-5 max-w-[300px] text-[13px] leading-[1.75] text-white/60">
              Summit Seek creates unforgettable trekking, climbing and cultural experiences
              across Nepal with expert local guides and personalized adventures.
            </p>

            <ul className="mt-6 space-y-3 text-[13px] text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#D8A73C]" />
                {SITE.address}
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-[#D8A73C]"
                >
                  <Mail className="size-4 text-[#D8A73C]" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-[#D8A73C]"
                >
                  <Phone className="size-4 text-[#D8A73C]" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-[#D8A73C]"
                >
                  <MessageCircle className="size-4 text-[#D8A73C]" />
                  WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/75 backdrop-blur-sm transition-all duration-300 hover:-rotate-6 hover:border-[#D8A73C] hover:bg-[#D8A73C]/15 hover:text-[#D8A73C]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Destinations" links={destinations} />
          <FooterCol title="Trekking" links={trekking} />
          <FooterCol title="Company" links={company} />

          {/* Newsletter */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D8A73C]">
              Newsletter
            </h3>
            <div className="mt-3 mb-5 h-px w-9 bg-gradient-to-r from-[#D8A73C] to-transparent" />
            <p className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-white">
              Join Our Newsletter
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-white/60">
              Subscribe to receive trekking deals, travel inspiration and seasonal
              expedition updates.
            </p>

            <form
              className="mt-5 flex flex-col gap-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
            >
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="h-11 w-full rounded-full border border-white/15 bg-white/[0.06] px-4 text-[13px] text-white outline-none placeholder:text-white/40 backdrop-blur-sm transition-colors focus:border-[#D8A73C]/60"
              />
              <button
                type="submit"
                className="h-11 rounded-full bg-[#D8A73C] text-[12px] font-bold uppercase tracking-[0.12em] text-[#08121E] shadow-[0_10px_28px_rgba(216,167,60,0.3)] transition-all duration-300 hover:bg-[#c49630] hover:shadow-[0_14px_36px_rgba(216,167,60,0.5)]"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-6 space-y-3">
              <a
                href={SOCIAL.google}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 transition-colors hover:border-[#D8A73C]/40"
              >
                <div className="flex text-[#D8A73C]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-current" />
                  ))}
                </div>
                <span className="text-[12px] font-semibold text-white/80">
                  {SITE.googleRating}/5 Google
                </span>
              </a>
              <div className="flex flex-wrap gap-2">
                {["Tripadvisor Choice", "Bookmundi", "TourRadar"].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/50"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency floating card */}
        <a
          href={`tel:${SITE.emergency}`}
          className="group mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#D8A73C]/30 bg-[rgba(8,18,30,0.65)] px-5 py-4 shadow-[0_18px_48px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D8A73C]/55 hover:shadow-[0_22px_56px_rgba(216,167,60,0.15)] sm:flex-row sm:items-center sm:px-6 sm:py-5"
        >
          <div className="flex items-center gap-3.5">
            <span className="flex size-11 items-center justify-center rounded-full bg-[#D8A73C]/15 text-[#D8A73C] transition-transform duration-300 group-hover:scale-105">
              <PhoneCall className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D8A73C]">
                Emergency Support
              </p>
              <p className="mt-0.5 text-[13px] text-white/70">24/7 Trek Assistance</p>
            </div>
          </div>
          <span className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold text-[#D8A73C] sm:text-[1.4rem]">
            {SITE.emergency}
          </span>
        </a>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-5 px-5 py-6 text-center sm:px-8 lg:flex-row lg:px-10 lg:text-left">
          <p className="text-[12px] leading-relaxed text-white/45">
            © {new Date().getFullYear()} {SITE.legalName}
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
              Payments
            </span>
            {payments.map((p) => (
              <span
                key={p}
                className={cn(
                  "rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-semibold tracking-wide text-white/50",
                )}
              >
                {p}
              </span>
            ))}
          </div>

          <p className="text-[12px] text-white/45">
            Developed by{" "}
            <span className="font-bold tracking-[0.06em] text-[#D8A73C]">
              THE GLOBAL ORBIT
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
