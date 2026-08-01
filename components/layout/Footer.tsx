"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Star, ChevronRight } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedInIcon,
  TripadvisorIcon,
} from "@/components/ui/SocialIcons";
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
    <div className="relative w-full overflow-hidden leading-none" aria-hidden>
      <svg
        viewBox="0 0 1440 280"
        preserveAspectRatio="xMidYMax slice"
        className="block h-[160px] w-full sm:h-[200px] lg:h-[240px]"
      >
        {/* Sky wash */}
        <rect width="1440" height="280" fill="#FFFFFF" />

        {/* Far snow peaks — very light blue */}
        <path
          d="M0 180 C80 150 140 120 200 140 C260 90 320 70 380 110 C450 50 520 40 590 95 C660 45 740 55 800 100 C870 60 940 50 1010 95 C1080 55 1160 70 1220 110 C1300 80 1380 100 1440 120 L1440 280 L0 280 Z"
          fill="#C5D8EA"
          opacity="0.55"
        />

        {/* Middle mountains — light blue */}
        <path
          d="M0 200 C100 175 180 145 260 165 C340 130 420 120 500 155 C580 115 670 125 750 160 C840 125 930 130 1020 165 C1110 135 1210 145 1300 170 C1370 155 1410 160 1440 175 L1440 280 L0 280 Z"
          fill="#8FB4D4"
          opacity="0.7"
        />

        {/* Front green hills */}
        <path
          d="M0 220 C120 205 220 195 340 210 C460 190 580 200 700 215 C820 198 940 205 1060 218 C1180 205 1300 210 1440 222 L1440 280 L0 280 Z"
          fill="#5A8F6E"
          opacity="0.65"
        />

        {/* Foreground dark navy ridge — blends into footer */}
        <path
          d="M0 245 C90 235 180 228 280 238 C400 225 520 232 640 242 C780 230 920 238 1060 248 C1180 238 1300 242 1440 250 L1440 280 L0 280 Z"
          fill={NAVY}
        />

        {/* Snow caps accents */}
        <path d="M360 95 L380 115 L400 100 L420 120 L445 105 L415 135 L385 125 Z" fill="#FFFFFF" opacity="0.45" />
        <path d="M720 100 L740 118 L765 105 L785 125 L810 108 L780 140 L745 130 Z" fill="#FFFFFF" opacity="0.4" />

        {/* 3 trekker silhouettes — left hill */}
        <g fill={NAVY}>
          {/* Trekker 1 */}
          <circle cx="210" cy="228" r="3.2" />
          <path d="M210 231 L206 245 L214 245 Z" />
          <path d="M207 238 L201 242 M213 238 L218 235" stroke={NAVY} strokeWidth="1.4" fill="none" />
          {/* Trekker 2 */}
          <circle cx="232" cy="226" r="3" />
          <path d="M232 229 L228.5 244 L235.5 244 Z" />
          <path d="M229 236 L224 241 M235 236 L240 233" stroke={NAVY} strokeWidth="1.3" fill="none" />
          {/* Trekker 3 */}
          <circle cx="252" cy="229" r="2.8" />
          <path d="M252 232 L249 245 L255 245 Z" />
          <path d="M249.5 239 L245 243 M254.5 239 L259 236" stroke={NAVY} strokeWidth="1.2" fill="none" />
        </g>

        {/* Tiny birds */}
        <g fill="none" stroke="#7A90A8" strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
          <path d="M1180 95 Q1185 90 1190 95 Q1195 90 1200 95" />
          <path d="M1220 110 Q1224 106 1228 110 Q1232 106 1236 110" />
          <path d="M1260 88 Q1264 84 1268 88 Q1272 84 1276 88" />
        </g>

        {/* Prayer flags + tiny stupa — right */}
        <g>
          <rect x="1325" y="200" width="3" height="42" fill={NAVY} rx="1" />
          <path d="M1318 200 L1335 200 L1326.5 192 Z" fill={NAVY} />
          <path d="M1328 205 L1395 218" stroke="#E85D4C" strokeWidth="2" />
          <path d="M1328 210 L1390 225" stroke="#F4A623" strokeWidth="2" />
          <path d="M1328 215 L1385 232" stroke="#4A90D9" strokeWidth="2" />
          <path d="M1328 220 L1380 238" stroke="#FFFFFF" strokeWidth="1.8" />
          <path d="M1328 225 L1375 242" stroke="#3D9B6E" strokeWidth="2" />
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
      <div className="bg-white px-5 pb-6 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center">
          <Link href="/" aria-label="Summit Seek — Home" className="bg-transparent">
            <Image
              src="/logo-summit-seek-transparent.png"
              alt="Summit Seek Travels & Tours"
              width={1024}
              height={576}
              unoptimized
              className="h-auto w-[300px] bg-transparent object-contain sm:w-[340px] lg:w-[370px]"
              sizes="370px"
            />
          </Link>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
            {footerPartners.map((partner, i) => (
              <motion.a
                key={partner.id}
                href={partner.href}
                aria-label={partner.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
                className="flex size-[78px] flex-col items-center justify-center rounded-2xl border border-[#e8ebf0] bg-white shadow-[0_8px_24px_rgba(8,18,30,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(8,18,30,0.1)] sm:size-[90px]"
              >
                {/* Editable placeholder — replace with partner logo images later */}
                <span
                  className="text-[11px] font-bold tracking-wide sm:text-[12px]"
                  style={{ color: NAVY }}
                >
                  {partner.abbr}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SVG mountain landscape ===== */}
      <HimalayanLandscape />

      {/* ===== LOWER NAVY: 6 columns ===== */}
      <div style={{ background: NAVY }} className="relative -mt-px px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12 lg:px-10">
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

            <div className="mt-5 space-y-3">
              <a
                href={SOCIAL.google}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 transition-colors hover:border-[#F4A623]/40"
              >
                <span className="text-[18px] font-bold text-[#4285F4]">G</span>
                <div>
                  <div className="flex" style={{ color: ORANGE }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3 fill-current" />
                    ))}
                  </div>
                  <p className="mt-0.5 text-[12px] font-semibold text-white">
                    {SITE.googleRating}/5
                  </p>
                </div>
              </a>
              <a
                href={SOCIAL.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 transition-colors hover:border-[#F4A623]/40"
              >
                <TripadvisorIcon className="size-5 text-[#00aa6c]" />
                <div>
                  <p className="text-[12px] font-bold text-white">Tripadvisor</p>
                  <p className="text-[11px]" style={{ color: TEXT }}>
                    Travelers Choice
                  </p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
