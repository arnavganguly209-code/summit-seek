"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, ChevronRight } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedInIcon,
  TripadvisorIcon,
} from "@/components/ui/SocialIcons";
import { TravelersChoiceBadges } from "@/components/layout/TravelersChoiceBadges";
import { SITE, SOCIAL } from "@/lib/constants";
import {
  footerPartners,
  footerDestinations,
  footerTrekking,
  footerCompany,
  footerUseful,
} from "@/lib/data/footer";

const ORANGE = "#F4A623";
const NAVY = "#071526";
const TEXT = "#D6DCE8";
const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { href: SOCIAL.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SOCIAL.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SOCIAL.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: SOCIAL.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: SOCIAL.tripadvisor, label: "Tripadvisor", Icon: TripadvisorIcon },
];

function HimalayanLandscape() {
  return (
    <div className="relative -mt-4 w-full overflow-hidden leading-none sm:-mt-6" aria-hidden>
      <svg
        viewBox="0 0 1440 360"
        preserveAspectRatio="xMidYMax slice"
        className="block h-[220px] w-full sm:h-[280px] lg:h-[340px]"
      >
        <defs>
          <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="40%" stopColor="#F7FAFD" stopOpacity="1" />
            <stop offset="100%" stopColor="#EAF1F8" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="farPeak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E4EEF6" />
            <stop offset="55%" stopColor="#C5D8EA" />
            <stop offset="100%" stopColor="#A9C2D8" />
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

        <rect width="1440" height="360" fill="url(#skyFade)" />

        {/* Birds — right sky */}
        <g fill="none" stroke="#8A9EB4" strokeWidth="1.35" strokeLinecap="round" opacity="0.6">
          <path d="M1040 58 Q1045 52 1050 58 Q1055 52 1060 58" />
          <path d="M1078 72 Q1082 67 1086 72 Q1090 67 1094 72" />
          <path d="M1105 48 Q1109 43 1113 48 Q1117 43 1121 48" />
          <path d="M1135 66 Q1138 62 1141 66 Q1144 62 1147 66" />
          <path d="M1160 54 Q1164 49 1168 54 Q1172 49 1176 54" />
        </g>

        {/* Back layer — tall distant pale peaks */}
        <path
          fill="url(#farPeak)"
          d="M0 195
             C55 175 100 120 155 145
             C210 85 270 40 340 95
             C400 35 470 15 545 80
             C610 25 690 20 765 85
             C835 35 915 25 990 90
             C1060 45 1135 55 1205 110
             C1280 70 1355 85 1440 125
             L1440 360 L0 360 Z"
        />

        {/* Soft snow on far peaks */}
        <path fill="#FFFFFF" opacity="0.55" d="M320 98 C340 55 365 62 385 100 C360 90 338 92 320 98 Z" />
        <path fill="#FFFFFF" opacity="0.5" d="M520 82 C545 30 575 38 600 88 C570 76 542 78 520 82 Z" />
        <path fill="#FFFFFF" opacity="0.48" d="M740 88 C765 35 800 42 825 92 C795 80 762 82 740 88 Z" />
        <path fill="#FFFFFF" opacity="0.42" d="M960 92 C980 52 1005 58 1025 95 C1000 88 978 88 960 92 Z" />

        {/* Middle layer — defined snow mountains */}
        <path
          fill="url(#midPeak)"
          d="M0 230
             C90 210 155 155 240 185
             C310 130 395 110 485 165
             C560 115 650 105 740 160
             C825 115 920 120 1010 170
             C1100 130 1200 140 1300 185
             C1365 165 1410 175 1440 190
             L1440 360 L0 360 Z"
        />

        {/* Snow caps mid */}
        <path fill="#F8FCFF" opacity="0.72" d="M460 168 C480 125 505 132 525 170 C500 160 475 162 460 168 Z" />
        <path fill="#F8FCFF" opacity="0.68" d="M715 162 C738 115 768 122 790 168 C760 156 732 158 715 162 Z" />
        <path fill="#F8FCFF" opacity="0.62" d="M980 172 C998 135 1020 140 1040 174 C1015 166 995 166 980 172 Z" />

        {/* Soft green hills — atmospheric mid-ground */}
        <path
          fill="url(#greenHill)"
          opacity="0.92"
          d="M0 275
             C140 255 250 248 380 265
             C520 245 660 252 820 268
             C980 252 1140 258 1280 272
             C1360 265 1410 268 1440 275
             L1440 360 L0 360 Z"
        />

        {/* Front green hills — richer organic curves */}
        <path
          fill="url(#greenHillFront)"
          d="M0 300
             C110 285 200 278 310 292
             C440 272 580 280 720 295
             C860 278 1010 285 1160 298
             C1280 288 1380 292 1440 300
             L1440 360 L0 360 Z"
        />

        {/* Soft shade on green for depth */}
        <path
          fill="#2A5538"
          opacity="0.16"
          d="M0 320 C160 308 320 312 480 322 C700 308 920 315 1140 328 C1300 318 1400 320 1440 322 L1440 360 L0 360 Z"
        />

        {/* Foreground dark navy hills */}
        <path
          fill="url(#navyRidge)"
          d="M0 328
             C85 316 165 310 255 322
             C370 308 490 314 610 326
             C760 310 920 318 1070 330
             C1200 318 1330 322 1440 334
             L1440 360 L0 360 Z"
        />
        <rect x="0" y="348" width="1440" height="12" fill={NAVY} />

        {/* Human trekkers — realistic silhouettes walking RIGHT */}
        <image
          href="/footer-trekkers.png"
          x="40"
          y="175"
          width="480"
          height="175"
          preserveAspectRatio="xMidYMax meet"
        />

        {/* Prayer flags on right hilltop */}
        <g>
          <rect x="1275" y={278} width="3.5" height="54" rx="1" fill={NAVY} />
          <path d="M1267 278 L1286 278 L1276.5 267 Z" fill={NAVY} />
          <path d="M1279 285 C1310 290 1350 300 1395 308" fill="none" stroke="#E85D4C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M1279 292 C1308 298 1345 309 1388 318" fill="none" stroke="#F4A623" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M1279 299 C1305 306 1340 317 1380 327" fill="none" stroke="#4A90D9" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M1279 306 C1302 313 1334 324 1372 335" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M1279 313 C1298 320 1328 331 1362 342" fill="none" stroke="#3D9B6E" strokeWidth="2.3" strokeLinecap="round" />
          <ellipse cx="1408" cy="338" rx="11" ry="4.5" fill={NAVY} opacity="0.9" />
          <rect x="1400" y="324" width="16" height="12" rx="2" fill={NAVY} />
          <rect x="1404" y="314" width="9" height="10" rx="1.5" fill={NAVY} />
        </g>
      </svg>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-[15px] font-medium transition-all duration-300 hover:translate-x-1 sm:text-[17px]"
      style={{ color: TEXT }}
    >
      <ChevronRight
        className="size-3.5 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ color: ORANGE }}
      />
      <span className="group-hover:text-white">{children}</span>
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
    >
      <h3 className="text-[13px] font-bold uppercase tracking-[0.18em] text-white sm:text-[14px]">
        {title}
      </h3>
      <div className="mt-3 mb-5 h-px w-10" style={{ background: ORANGE }} />
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative w-full overflow-hidden bg-white">
      {/* ===== TOP WHITE: logo + partners ===== */}
      <div className="bg-white px-5 pb-0 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pt-12">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center">
          <Link href="/" aria-label="Summit Seek — Home" className="bg-transparent">
            <Image
              src="/logo-summit-seek-transparent.png"
              alt="Summit Seek Travels & Tours"
              width={1024}
              height={576}
              unoptimized
              className="h-auto w-[320px] bg-transparent object-contain sm:w-[400px] lg:w-[440px]"
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 440px"
            />
          </Link>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6 sm:gap-4 lg:gap-5">
            {footerPartners.map((partner, i) => (
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
                className="box-border flex h-[100px] w-[100px] items-center justify-center rounded-[14px] border border-[#e8ebf0] bg-white p-2.5 shadow-[0_10px_28px_rgba(8,18,30,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(8,18,30,0.12)] sm:h-[112px] sm:w-[112px] sm:p-3"
              >
                <Image
                  src={partner.logo}
                  alt={partner.label}
                  width={160}
                  height={160}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SVG mountain landscape ===== */}
      <HimalayanLandscape />

      {/* ===== LOWER NAVY: 6 columns ===== */}
      <div style={{ background: NAVY }} className="relative -mt-px px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10 lg:pt-16">
        <div className="mx-auto grid max-w-[1320px] gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-7">
          {/* Col 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="sm:col-span-2 xl:col-span-1"
          >
            <p className="font-[family-name:var(--font-display)] text-[20px] font-bold text-white sm:text-[24px]">
              Summit <span style={{ color: ORANGE }}>Seek</span>
            </p>
            <p className="mt-3 max-w-[280px] text-[14px] leading-[1.7]" style={{ color: TEXT }}>
              Unforgettable Himalayan adventures with expert local guides, personalized
              itineraries, and trusted care across Nepal.
            </p>

            <ul className="mt-5 space-y-3 text-[14px]" style={{ color: TEXT }}>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" style={{ color: ORANGE }} />
                {SITE.address}
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Mail className="size-4 shrink-0" style={{ color: ORANGE }} />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
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
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <MessageCircle className="size-4 shrink-0" style={{ color: ORANGE }} />
                  WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/75 transition-all duration-300 hover:-rotate-6 hover:border-[#F4A623] hover:text-[#F4A623]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <FooterCol title="Destinations" links={footerDestinations} />
          <FooterCol title="Trekking" links={footerTrekking} />
          <FooterCol title="Company" links={footerCompany} />
          <FooterCol title="Useful Links" links={footerUseful} />

          {/* Col 6 — Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <h3 className="text-[13px] font-bold uppercase tracking-[0.18em] text-white sm:text-[14px]">
              Join Our Newsletter
            </h3>
            <div className="mt-3 mb-5 h-px w-10" style={{ background: ORANGE }} />
            <p className="text-[14px] leading-relaxed" style={{ color: TEXT }}>
              Trekking deals, travel inspiration and seasonal updates.
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
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[13px] text-white outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                className="shrink-0 px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide text-[#071526] transition-all duration-300 hover:brightness-110"
                style={{
                  background: ORANGE,
                  boxShadow: "0 0 0 rgba(244,166,35,0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 22px rgba(244,166,35,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 rgba(244,166,35,0)";
                }}
              >
                Subscribe
              </button>
            </form>

            <TravelersChoiceBadges />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
