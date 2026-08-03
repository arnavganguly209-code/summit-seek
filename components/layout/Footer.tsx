"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, ChevronRight } from "lucide-react";
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

function NepalFlag({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const w = 34 * scale;
  const h = 42 * scale;
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* pole */}
      <rect x={-2} y={-2} width={3.2} height={h + 18} rx={1} fill={NAVY} />
      {/* double-pennant Nepal flag */}
      <g transform="translate(2 0)">
        <path
          fill="#003893"
          d={`M0 0 L${w} ${h * 0.42} L${w * 0.38} ${h * 0.42} L${w} ${h} L0 ${h} Z`}
        />
        <path
          fill="#DC143C"
          d={`M1.6 1.8 L${w * 0.88} ${h * 0.4} L${w * 0.34} ${h * 0.4} L${w * 0.88} ${h * 0.94} L1.6 ${h * 0.94} Z`}
        />
        {/* moon */}
        <circle cx={w * 0.22} cy={h * 0.22} r={3.1 * scale} fill="#fff" />
        <circle cx={w * 0.22} cy={h * 0.2} r={2.4 * scale} fill="#DC143C" />
        {/* sun */}
        <circle cx={w * 0.28} cy={h * 0.68} r={3.4 * scale} fill="#fff" />
      </g>
    </g>
  );
}

function HimalayanLandscape() {
  return (
    <div className="relative z-0 mt-4 w-full overflow-hidden leading-none sm:mt-5" aria-hidden>
      <svg
        viewBox="0 20 1440 340"
        preserveAspectRatio="xMidYMax slice"
        className="block h-[170px] w-full sm:h-[210px] lg:h-[240px]"
      >
        <defs>
          <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4F8FC" />
            <stop offset="45%" stopColor="#E8F0F8" />
            <stop offset="100%" stopColor="#D5E4F0" />
          </linearGradient>
          <linearGradient id="farPeak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DCE8F2" />
            <stop offset="55%" stopColor="#B7CBDD" />
            <stop offset="100%" stopColor="#8FAABC" />
          </linearGradient>
          <linearGradient id="ebcPeak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7FBFF" />
            <stop offset="18%" stopColor="#D7E6F2" />
            <stop offset="55%" stopColor="#8FB0C8" />
            <stop offset="100%" stopColor="#5E849E" />
          </linearGradient>
          <linearGradient id="midPeak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B7D0E4" />
            <stop offset="35%" stopColor="#8FB4D0" />
            <stop offset="100%" stopColor="#6A98B8" />
          </linearGradient>
          <linearGradient id="greenHill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8BBB82" />
            <stop offset="45%" stopColor="#5F9A62" />
            <stop offset="100%" stopColor="#42784C" />
          </linearGradient>
          <linearGradient id="greenHillFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#74A870" />
            <stop offset="50%" stopColor="#508955" />
            <stop offset="100%" stopColor="#356848" />
          </linearGradient>
          <linearGradient id="navyRidge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D243C" />
            <stop offset="100%" stopColor={NAVY} />
          </linearGradient>
        </defs>

        <rect width="1440" height="380" fill="url(#skyFade)" />

        {/* Distant Everest / EBC massif — tall, dominant sky peaks */}
        <path
          fill="url(#farPeak)"
          d="M0 210
             C80 190 140 150 210 170
             C280 110 360 55 450 115
             C520 40 610 8 720 70
             C800 15 880 5 970 65
             C1060 20 1160 45 1260 110
             C1340 75 1400 95 1440 120
             L1440 380 L0 380 Z"
        />

        {/* Main Everest pyramid — sharp professional silhouette */}
        <path
          fill="url(#ebcPeak)"
          d="M520 220
             L640 28
             L700 95
             L760 18
             L900 210
             L860 230
             L760 140
             L700 170
             L640 120
             L580 230 Z"
        />
        {/* Snow face / glacier highlights */}
        <path fill="#FFFFFF" opacity="0.92" d="M640 28 L700 95 L675 108 L640 55 Z" />
        <path fill="#FFFFFF" opacity="0.88" d="M760 18 L820 110 L790 120 L745 70 Z" />
        <path fill="#F3F8FC" opacity="0.75" d="M700 95 L760 140 L730 150 L700 120 Z" />
        <path fill="#EAF2F8" opacity="0.55" d="M640 120 L700 170 L670 180 L620 145 Z" />

        {/* Secondary high peaks flanking Everest */}
        <path
          fill="url(#midPeak)"
          d="M0 245
             C100 220 180 165 270 195
             C350 140 440 120 530 175
             C600 145 680 155 760 185
             C860 140 980 145 1100 190
             C1200 155 1320 170 1440 200
             L1440 380 L0 380 Z"
        />
        <path fill="#F8FCFF" opacity="0.7" d="M300 175 C330 125 365 132 390 185 C360 170 325 168 300 175 Z" />
        <path fill="#F8FCFF" opacity="0.65" d="M1020 175 C1050 125 1090 132 1120 185 C1090 170 1045 168 1020 175 Z" />

        {/* Soft birds */}
        <g fill="none" stroke="#7A93AB" strokeWidth="1.35" strokeLinecap="round" opacity="0.55">
          <path d="M1080 52 Q1085 46 1090 52 Q1095 46 1100 52" />
          <path d="M1120 66 Q1124 61 1128 66 Q1132 61 1136 66" />
          <path d="M1155 44 Q1159 39 1163 44 Q1167 39 1171 44" />
        </g>

        <path
          fill="url(#greenHill)"
          opacity="0.92"
          d="M0 285
             C140 265 250 258 380 275
             C520 255 660 262 820 278
             C980 262 1140 268 1280 282
             C1360 275 1410 278 1440 285
             L1440 380 L0 380 Z"
        />

        <path
          fill="url(#greenHillFront)"
          d="M0 310
             C110 295 200 288 310 302
             C440 282 580 290 720 305
             C860 288 1010 295 1160 308
             C1280 298 1380 302 1440 310
             L1440 380 L0 380 Z"
        />

        <path
          fill="#2A5538"
          opacity="0.16"
          d="M0 330 C160 318 320 322 480 332 C700 318 920 325 1140 338 C1300 328 1400 330 1440 332 L1440 380 L0 380 Z"
        />

        <path
          fill="url(#navyRidge)"
          d="M0 338
             C85 326 165 320 255 332
             C370 318 490 324 610 336
             C760 320 920 328 1070 340
             C1200 328 1330 332 1440 344
             L1440 380 L0 380 Z"
        />
        <rect x="0" y="358" width="1440" height="22" fill={NAVY} />

        <image
          href="/footer-trekkers.png"
          x="40"
          y="185"
          width="480"
          height="175"
          preserveAspectRatio="xMidYMax meet"
        />

        {/* Nepal flag on right ridge */}
        <NepalFlag x={1295} y={268} scale={1.15} />
        {/* small stone cairn under pole */}
        <ellipse cx="1296" cy="348" rx="14" ry="5" fill={NAVY} opacity="0.85" />
        <rect x="1286" y="336" width="20" height="12" rx="2" fill={NAVY} />
      </svg>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-[14px] font-semibold leading-6 tracking-[0.01em] transition-all duration-300 hover:translate-x-1.5 hover:text-[#F58220] sm:text-[15px]"
      style={{ color: TEXT }}
    >
      <ChevronRight
        className="size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        style={{ color: ORANGE }}
      />
      <span className="transition-colors duration-300">{children}</span>
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
      <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-bold uppercase tracking-[0.2em] text-white sm:text-[13px]">
        {title}
      </h3>
      <div className="mt-2.5 mb-3.5 h-[2px] w-9 rounded-full" style={{ background: ORANGE }} />
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
        className="relative -mt-px px-5 pb-6 pt-8 sm:px-8 sm:pb-7 sm:pt-10 lg:px-10 lg:pt-11"
        style={{ background: NAVY }}
      >
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 items-start gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6 lg:gap-y-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="col-span-2 min-w-0 sm:col-span-1"
          >
            <Link href="/" aria-label="Summit Seek — Home" className="inline-block bg-transparent">
              <Image
                src={content.brandLogoUrl}
                alt="Summit Seek Travels & Tours"
                width={480}
                height={180}
                unoptimized
                className="h-auto w-[168px] bg-transparent object-contain object-left sm:w-[188px]"
                sizes="188px"
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
            <h3 className="font-[family-name:var(--font-ui)] text-[12px] font-bold uppercase tracking-[0.2em] text-white sm:text-[13px]">
              {content.newsletterHeading}
            </h3>
            <div className="mt-2.5 mb-4 h-[2px] w-9 rounded-full" style={{ background: ORANGE }} />
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
        <div className="mx-auto mt-8 max-w-[1320px] border-t border-white/10 pt-6 sm:mt-9">
          <PaymentRow label={content.weAcceptLabel} payments={content.payments} />
        </div>

        <div className="mx-auto mt-6 max-w-[1320px] border-t border-white/10 pt-4 sm:mt-7 sm:pt-5">
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

