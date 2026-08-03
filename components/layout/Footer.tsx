"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import {
  TikTokIcon,
  FacebookIcon,
  InstagramIcon,
} from "@/components/ui/SocialIcons";
import { SITE, SOCIAL } from "@/lib/constants";
import type { FooterContent, FooterPayment } from "@/types/footer-cms";

const ORANGE = "#F58220";
const NAVY = "#071526";
const TEXT = "#E8EDF5";
const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { href: SOCIAL.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: SOCIAL.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SOCIAL.instagram, label: "Instagram", Icon: InstagramIcon },
];

function PaymentRow({
  label,
  payments,
}: {
  label: string;
  payments: FooterPayment[];
}) {
  const visible = payments.filter((p) => p.visible !== false);
  if (visible.length === 0) return null;

  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-3">
      <div className="text-center">
        <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-bold uppercase tracking-[0.2em] text-white sm:text-[13px]">
          {label}
        </h3>
        <div className="mx-auto mt-2.5 h-[2px] w-9 rounded-full" style={{ background: ORANGE }} />
      </div>
      <div
        className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        role="list"
        aria-label="Accepted payment methods"
      >
        {visible.map((pay) => (
          <div
            key={pay.id}
            role="listitem"
            title={pay.label}
            className="flex h-10 w-[60px] items-center justify-center overflow-hidden rounded-[6px] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.22)] ring-1 ring-white/20 sm:h-11 sm:w-[66px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pay.imageUrl}
              alt={pay.label}
              className="h-full w-full object-contain p-0.5"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function HimalayanLandscape() {
  return (
    <div
      className="relative z-0 mt-3 w-full overflow-hidden leading-none sm:mt-4"
      aria-hidden
    >
      <div className="relative h-[180px] w-full sm:h-[220px] lg:h-[250px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer-himalayan-premium.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_62%]"
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-10 bg-gradient-to-b from-white to-transparent sm:h-12" />
        {/* Navy ground line — trekkers stand on this */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[18%] sm:h-[15%]"
          style={{ background: NAVY }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[15%] z-[2] h-10 sm:bottom-[13%] sm:h-12"
          style={{ background: `linear-gradient(to bottom, transparent, ${NAVY})` }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer-trekkers.png"
          alt=""
          className="pointer-events-none absolute bottom-0 left-[1.5%] z-[4] h-auto w-[52%] max-w-[540px] translate-y-[1%] object-contain object-left-bottom drop-shadow-[0_6px_14px_rgba(0,0,0,0.4)] sm:left-[2%] sm:w-[44%] lg:w-[38%] lg:max-w-[500px]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block text-[14px] font-semibold leading-6 tracking-[0.01em] transition-all duration-300 hover:translate-x-1 hover:text-[#F58220] sm:text-[15px]"
      style={{ color: TEXT }}
    >
      {children}
    </Link>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease }}
      className="min-w-0"
    >
      <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-bold uppercase tracking-[0.18em] text-white sm:text-[13px]">
        {title}
      </h3>
      <div className="mt-2.5 mb-3.5 h-[2px] w-full" style={{ background: ORANGE }} />
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href + link.label} className="leading-none">
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Footer({ content }: { content: FooterContent }) {
  const [email, setEmail] = useState("");
  const partners = content.partners.filter((p) => p.visible !== false);

  return (
    <footer className="relative w-full bg-white">
      <div className="relative z-20 bg-white px-5 pb-6 pt-5 sm:px-8 sm:pb-7 sm:pt-6 lg:px-10 lg:pb-8 lg:pt-7">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center">
          <Link href="/" aria-label="Summit Seek — Home" className="bg-transparent">
            <Image
              src={content.topLogoUrl}
              alt="Summit Seek Travels & Tours"
              width={1024}
              height={576}
              unoptimized
              className="h-auto w-[220px] bg-transparent object-contain sm:w-[260px] lg:w-[290px]"
              sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 290px"
            />
          </Link>

          <div className="relative z-20 mt-1.5 flex flex-wrap items-center justify-center gap-2.5 sm:mt-2 sm:gap-3.5 lg:gap-4">
            {partners.map((partner, i) => (
              <motion.a
                key={partner.id}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
                className="box-border flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-[12px] border border-[#e8ebf0] bg-white p-2 shadow-[0_8px_22px_rgba(8,18,30,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(8,18,30,0.11)] sm:h-[100px] sm:w-[100px] sm:p-2.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logoUrl}
                  alt={partner.label}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <HimalayanLandscape />

      <div
        className="relative -mt-px px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-8 lg:px-10 lg:pt-9"
        style={{ background: NAVY }}
      >
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 items-start gap-x-5 gap-y-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-5 lg:gap-y-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="col-span-2 min-w-0 sm:col-span-1"
          >
            <Link href="/" aria-label="Summit Seek — Home" className="inline-block bg-transparent leading-none">
              <Image
                src={content.brandLogoUrl}
                alt="Summit Seek Travels & Tours"
                width={480}
                height={180}
                unoptimized
                className="h-auto w-[160px] bg-transparent object-contain object-left sm:w-[176px]"
                sizes="176px"
              />
            </Link>
            <p className="mt-2.5 max-w-[240px] text-[12.5px] font-medium leading-[1.55] sm:text-[13px]" style={{ color: TEXT }}>
              {content.brandTagline}
            </p>

            <ul className="mt-4 space-y-2 text-[12.5px] font-semibold sm:text-[13px]" style={{ color: TEXT }}>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" style={{ color: ORANGE }} />
                <span className="leading-6">{SITE.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 leading-6 transition-all duration-300 hover:translate-x-1 hover:text-[#F58220]"
                >
                  <Mail className="size-4 shrink-0" style={{ color: ORANGE }} />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2.5 leading-6 transition-all duration-300 hover:translate-x-1 hover:text-[#F58220]"
                >
                  <Phone className="size-4 shrink-0" style={{ color: ORANGE }} />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 leading-6 transition-all duration-300 hover:translate-x-1 hover:text-[#F58220]"
                >
                  <MessageCircle className="size-4 shrink-0" style={{ color: ORANGE }} />
                  WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:rotate-[-6deg] hover:border-[#F58220] hover:text-[#F58220]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <FooterCol title="Destinations" links={content.destinations} />
          <FooterCol title="Trekking" links={content.trekking} />
          <FooterCol title="Company" links={content.company} />
          <FooterCol title="Useful Links" links={content.useful} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="min-w-0"
          >
            <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-bold uppercase tracking-[0.18em] text-white sm:text-[13px]">
              {content.newsletterHeading}
            </h3>
            <div className="mt-2.5 mb-3.5 h-[2px] w-full" style={{ background: ORANGE }} />
            <p className="text-[13px] font-medium leading-relaxed sm:text-[14px]" style={{ color: TEXT }}>
              {content.newsletterDescription}
            </p>

            <form
              className="mt-4 flex overflow-hidden rounded-full border border-white/15 bg-[#0a1a2c]"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
            >
              <label className="sr-only" htmlFor="footer-newsletter-email">
                Email
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[13px] font-medium text-white outline-none placeholder:text-white/45"
              />
              <button
                type="submit"
                className="shrink-0 px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide text-[#071526] transition-all duration-300 hover:brightness-110"
                style={{ background: ORANGE }}
              >
                Subscribe
              </button>
            </form>

            <a
              href={content.travelersChoiceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block bg-transparent transition-opacity hover:opacity-90"
              aria-label="Tripadvisor Travelers' Choice Awards"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.travelersChoiceBadgeUrl}
                alt="Tripadvisor Travelers' Choice"
                className="mx-auto h-auto w-full max-w-[220px] bg-transparent object-contain lg:mx-0"
                loading="lazy"
                decoding="async"
              />
            </a>
          </motion.div>
        </div>

        {/* We Accept — full-width centered row, no scroll */}
        <div className="mx-auto mt-5 max-w-[1320px] border-t border-white/10 pt-5 sm:mt-6">
          <PaymentRow label={content.weAcceptLabel} payments={content.payments} />
        </div>

        <div className="mx-auto mt-4 max-w-[1320px] border-t border-white/10 pt-3.5 sm:mt-5 sm:pt-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] font-semibold tracking-[0.02em] sm:text-[13px]" style={{ color: TEXT }}>
              {content.copyrightText}
            </p>
            <p className="text-[12px] font-medium sm:text-[13px]" style={{ color: TEXT }}>
              {content.developedByLabel}{" "}
              <a
                href={content.developedByHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white underline-offset-4 transition-all duration-300 hover:text-[#F58220] hover:underline"
              >
                {content.developedByName}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

