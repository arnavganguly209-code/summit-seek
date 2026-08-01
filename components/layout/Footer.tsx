import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Star,
  AlertTriangle,
} from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE, SOCIAL } from "@/lib/constants";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/about#team" },
  { label: "Why Summit Seek", href: "/#why" },
  { label: "Sustainability", href: "/about#sustainability" },
  { label: "Careers", href: "/careers" },
];

const destinations = [
  { label: "Everest Region", href: "/destinations/everest" },
  { label: "Annapurna", href: "/destinations/annapurna" },
  { label: "Manaslu", href: "/destinations/manaslu" },
  { label: "Mustang", href: "/destinations/mustang" },
  { label: "Langtang", href: "/destinations/langtang" },
  { label: "Hidden Himalayas", href: "/destinations/hidden-himalayas" },
];

const useful = [
  { label: "Trekking", href: "/trekking" },
  { label: "Peak Climbing", href: "/peak-climbing" },
  { label: "Expeditions", href: "/expeditions" },
  { label: "Luxury Trek", href: "/luxury-trek" },
  { label: "Travel Guide", href: "/travel-guide" },
  { label: "Blog", href: "/blog" },
];

const support = [
  { label: "Contact", href: "/contact" },
  { label: "Plan Your Trip", href: "/plan-your-trip" },
  { label: "FAQs", href: "/faqs" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Booking Policy", href: "/booking-policy" },
];

export function Footer() {
  return (
    <footer className="bg-midnight-deep text-snow">
      {/* Quick inquiry strip */}
      <div className="border-b border-snow/10 bg-midnight">
        <Container className="flex flex-col items-start justify-between gap-5 py-8 md:flex-row md:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              Quick Inquiry
            </p>
            <p className="mt-1 font-display text-2xl font-semibold md:text-3xl">
              Ready to begin? We respond within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/plan-your-trip" size="md">
              Plan Your Trip
            </Button>
            <Button href="/contact" variant="outlineLight" size="md">
              Contact Us
            </Button>
          </div>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_repeat(4,1fr)] lg:gap-8">
          {/* Brand column */}
          <div className="max-w-sm">
            {/* Light plate only in dark footer so navy logo mark stays readable */}
            <div className="inline-block rounded-xl bg-snow px-3 py-2">
              <Logo />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-snow/65">
              {SITE.tagline} Premium trekking, peak climbing, and Himalayan
              expeditions for discerning travelers.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-snow/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                {SITE.address}
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 hover:text-gold"
                >
                  <Mail className="size-4 text-gold" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2.5 hover:text-gold"
                >
                  <Phone className="size-4 text-gold" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-2.5 hover:text-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4 text-gold" />
                  WhatsApp {SITE.whatsappDisplay}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={SOCIAL.facebook}
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-snow/15 text-snow/80 transition-colors hover:border-gold hover:text-gold"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={SOCIAL.instagram}
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-snow/15 text-snow/80 transition-colors hover:border-gold hover:text-gold"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={SOCIAL.youtube}
                aria-label="YouTube"
                className="flex size-10 items-center justify-center rounded-full border border-snow/15 text-snow/80 transition-colors hover:border-gold hover:text-gold"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeIcon className="size-4" />
              </a>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href={SOCIAL.google}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-snow/10 bg-snow/5 px-3 py-2.5 text-sm transition-colors hover:border-gold/40"
              >
                <Star className="size-4 fill-gold text-gold" />
                <span>
                  Google {SITE.googleRating}/5 · {SITE.googleReviews}+ reviews
                </span>
              </a>
              <a
                href={SOCIAL.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-snow/10 bg-snow/5 px-3 py-2.5 text-sm transition-colors hover:border-gold/40"
              >
                <span className="font-bold text-gold">TA</span>
                <span>TripAdvisor Travellers&apos; Choice</span>
              </a>
            </div>
          </div>

          <FooterCol title="Company" links={company} />
          <FooterCol title="Destinations" links={destinations} />
          <FooterCol title="Useful Links" links={useful} />
          <FooterCol title="Support" links={support} />
        </div>

        {/* Emergency */}
        <div className="mt-14 flex flex-col gap-3 rounded-xl border border-gold/25 bg-gold/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 text-gold" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                Emergency Contact
              </p>
              <p className="text-sm text-snow/80">
                24/7 field support for guests on trek
              </p>
            </div>
          </div>
          <a
            href={`tel:${SITE.emergency}`}
            className="text-lg font-bold text-gold hover:text-gold-light"
          >
            {SITE.emergency}
          </a>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-sm text-snow/50 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            Developed by{" "}
            <span className="font-semibold text-snow/70">Global Orbit</span>
          </p>
        </div>
      </Container>
    </footer>
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
      <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
        {title}
      </h3>
      <div className="mt-3 mb-5 h-px w-10 bg-gold/40" />
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm text-snow/70 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
