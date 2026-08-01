"use client";

import Link from "next/link";
import { Mail, Phone, MessageCircle, Globe, User, ChevronDown } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { SITE, SOCIAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TopBarProps = {
  scrolled?: boolean;
};

export function TopBar({ scrolled = false }: TopBarProps) {
  const link = cn(
    "inline-flex items-center gap-1.5 transition-colors duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#D8A73C]",
    scrolled ? "text-[#08121E]/80" : "text-white/90",
  );

  return (
    <div
      className={cn(
        "hidden border-b xl:block",
        scrolled
          ? "border-black/[0.06] bg-white/40"
          : "border-white/10 bg-[#0a1018]/90",
      )}
    >
      <Container className="flex h-8 items-center justify-between text-[11px] font-medium">
        <div className="flex items-center gap-4">
          <a href={`mailto:${SITE.email}`} className={link}>
            <Mail className="size-3.5 text-[#D8A73C]" />
            {SITE.email}
          </a>
          <span
            className={cn("h-3 w-px", scrolled ? "bg-black/15" : "bg-white/20")}
            aria-hidden
          />
          <a href={`tel:${SITE.phone}`} className={link}>
            <Phone className="size-3.5 text-[#D8A73C]" />
            {SITE.phoneDisplay}
          </a>
          <span
            className={cn("h-3 w-px", scrolled ? "bg-black/15" : "bg-white/20")}
            aria-hidden
          />
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
          <div
            className={cn(
              "flex items-center gap-3",
              scrolled ? "text-[#08121E]/80" : "text-white/90",
            )}
          >
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
          <span
            className={cn("h-3 w-px", scrolled ? "bg-black/15" : "bg-white/20")}
            aria-hidden
          />
          <button type="button" className={link} aria-label="Select language">
            <Globe className="size-3.5 text-[#D8A73C]" />
            EN
            <ChevronDown className="size-3 opacity-70" />
          </button>
          <span
            className={cn("h-3 w-px", scrolled ? "bg-black/15" : "bg-white/20")}
            aria-hidden
          />
          <Link href="/login" className={link}>
            <User className="size-3.5 text-[#D8A73C]" />
            Login
          </Link>
        </div>
      </Container>
    </div>
  );
}
