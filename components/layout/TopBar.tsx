"use client";

import Link from "next/link";
import { Mail, Phone, MessageCircle, Globe, User, ChevronDown } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { SITE, SOCIAL } from "@/lib/constants";

const link =
  "inline-flex items-center gap-1.5 text-white/90 transition-colors duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#D8A73C]";

export function TopBar() {
  return (
    <div className="hidden border-b border-white/10 bg-[#0a1018]/90 xl:block">
      <Container className="flex h-10 items-center justify-between text-[12px] font-medium">
        <div className="flex items-center gap-4">
          <a href={`mailto:${SITE.email}`} className={link}>
            <Mail className="size-3.5 text-[#D8A73C]" />
            {SITE.email}
          </a>
          <span className="h-3 w-px bg-white/20" aria-hidden />
          <a href={`tel:${SITE.phone}`} className={link}>
            <Phone className="size-3.5 text-[#D8A73C]" />
            {SITE.phoneDisplay}
          </a>
          <span className="h-3 w-px bg-white/20" aria-hidden />
          <a
            href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            <MessageCircle className="size-3.5 text-[#D8A73C]" />
            WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-white/90">
            <a
              href={SOCIAL.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#D8A73C]"
            >
              <FacebookIcon className="size-3.5" />
            </a>
            <a
              href={SOCIAL.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#D8A73C]"
            >
              <InstagramIcon className="size-3.5" />
            </a>
            <a
              href={SOCIAL.youtube}
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#D8A73C]"
            >
              <YoutubeIcon className="size-3.5" />
            </a>
          </div>
          <span className="h-3 w-px bg-white/20" aria-hidden />
          <button type="button" className={link} aria-label="Select language">
            <Globe className="size-3.5 text-[#D8A73C]" />
            EN
            <ChevronDown className="size-3 opacity-70" />
          </button>
          <span className="h-3 w-px bg-white/20" aria-hidden />
          <Link href="/login" className={link}>
            <User className="size-3.5 text-[#D8A73C]" />
            Login
          </Link>
        </div>
      </Container>
    </div>
  );
}
