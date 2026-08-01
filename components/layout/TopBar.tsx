"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MessageCircle,
  Globe,
  User,
} from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { SITE, SOCIAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TopBarProps {
  overHero: boolean;
}

export function TopBar({ overHero }: TopBarProps) {
  const muted = overHero ? "text-midnight/80" : "text-slate";
  const hover = "hover:text-gold-dark";

  return (
    <div
      className={cn(
        "hidden border-b transition-colors duration-300 xl:block",
        overHero ? "border-midnight/5" : "border-border",
      )}
    >
      <Container className="flex h-10 items-center justify-between text-[12px] font-semibold">
        <div className={cn("flex items-center gap-5", muted)}>
          <a href={`mailto:${SITE.email}`} className={cn("inline-flex items-center gap-1.5", hover)}>
            <Mail className="size-3.5 text-gold-dark" />
            {SITE.email}
          </a>
          <a href={`tel:${SITE.phone}`} className={cn("inline-flex items-center gap-1.5", hover)}>
            <Phone className="size-3.5 text-gold-dark" />
            {SITE.phoneDisplay}
          </a>
          <a
            href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("inline-flex items-center gap-1.5", hover)}
          >
            <MessageCircle className="size-3.5 text-gold-dark" />
            WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <a
              href={SOCIAL.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(muted, hover)}
            >
              <FacebookIcon className="size-3.5" />
            </a>
            <a
              href={SOCIAL.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(muted, hover)}
            >
              <InstagramIcon className="size-3.5" />
            </a>
            <a
              href={SOCIAL.youtube}
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(muted, hover)}
            >
              <YoutubeIcon className="size-3.5" />
            </a>
          </div>
          <span className="h-3 w-px bg-border" />
          <button
            type="button"
            className={cn("inline-flex items-center gap-1.5", muted, hover)}
            aria-label="Select language"
          >
            <Globe className="size-3.5 text-gold-dark" />
            EN
          </button>
          <Link href="/login" className={cn("inline-flex items-center gap-1.5", muted, hover)}>
            <User className="size-3.5 text-gold-dark" />
            Login
          </Link>
        </div>
      </Container>
    </div>
  );
}
