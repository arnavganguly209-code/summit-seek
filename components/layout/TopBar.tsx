"use client";

import Link from "next/link";
import { Mail, Phone, MessageCircle, Globe, User } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { SITE, SOCIAL } from "@/lib/constants";

const ease = "transition-colors duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export function TopBar() {
  return (
    <div className="hidden border-b border-white/[0.08] bg-[rgba(5,12,20,0.35)] backdrop-blur-md xl:block">
      <Container className="flex h-10 items-center justify-between text-[12px] font-medium text-white/85">
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${SITE.email}`}
            className={`inline-flex items-center gap-1.5 hover:text-[#D8A73C] ${ease}`}
          >
            <Mail className="size-3.5 text-[#D8A73C]" />
            {SITE.email}
          </a>
          <a
            href={`tel:${SITE.phone}`}
            className={`inline-flex items-center gap-1.5 hover:text-[#D8A73C] ${ease}`}
          >
            <Phone className="size-3.5 text-[#D8A73C]" />
            {SITE.phoneDisplay}
          </a>
          <a
            href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 hover:text-[#D8A73C] ${ease}`}
          >
            <MessageCircle className="size-3.5 text-[#D8A73C]" />
            WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-[#D8A73C] ${ease}`}
            >
              <FacebookIcon className="size-3.5" />
            </a>
            <a
              href={SOCIAL.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-[#D8A73C] ${ease}`}
            >
              <InstagramIcon className="size-3.5" />
            </a>
            <a
              href={SOCIAL.youtube}
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-[#D8A73C] ${ease}`}
            >
              <YoutubeIcon className="size-3.5" />
            </a>
          </div>
          <span className="h-3 w-px bg-white/20" />
          <button
            type="button"
            className={`inline-flex items-center gap-1.5 hover:text-[#D8A73C] ${ease}`}
            aria-label="Select language"
          >
            <Globe className="size-3.5 text-[#D8A73C]" />
            EN
          </button>
          <Link
            href="/login"
            className={`inline-flex items-center gap-1.5 hover:text-[#D8A73C] ${ease}`}
          >
            <User className="size-3.5 text-[#D8A73C]" />
            Login
          </Link>
        </div>
      </Container>
    </div>
  );
}
