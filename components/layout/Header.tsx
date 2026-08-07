"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { SITE } from "@/lib/constants";
import {
  DestinationsDropdown,
  DestinationsMobilePanel,
} from "@/components/layout/DestinationsDropdown";
import {
  TrekkingMegaMenu,
  TrekkingMobileAccordion,
} from "@/components/layout/TrekkingMegaMenu";
import {
  TravelInfoMegaMenu,
  TravelInfoMobilePanel,
} from "@/components/layout/TravelInfoMegaMenu";
import {
  CompanyDropdown,
  CompanyMobilePanel,
} from "@/components/layout/CompanyDropdown";
import { mainNav, type MegaKind } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

const HEADER_H = 72;

function megaKindForLabel(label: string): MegaKind | null {
  if (label === "Destinations") return "destinations";
  if (label === "Trekking In Nepal") return "trekking";
  if (label === "Travel Info") return "travel-info";
  if (label === "Company") return "company";
  return null;
}

type Props = {
  logoUrl?: string;
  logoUrlLight?: string;
};

export function Header({
  logoUrl = "/logo-summit-seek-blue.png",
  logoUrlLight = "/logo-summit-seek-white.png",
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [megaKind, setMegaKind] = useState<MegaKind | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMega, setMobileMega] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Preload both logos so scroll swap never flashes a missing/old asset
  useEffect(() => {
    if (typeof window === "undefined") return;
    const a = new window.Image();
    a.src = logoUrl;
    const b = new window.Image();
    b.src = logoUrlLight;
  }, [logoUrl, logoUrlLight]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navText = scrolled
    ? "text-[#0b1524] hover:text-[#1d4ed8]"
    : "text-white hover:text-[#93c5fd]";

  // Transparent header → white logo; scrolled glass header → blue logo
  const activeLogo = scrolled ? logoUrl : logoUrlLight;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-black/[0.06] bg-white/90 shadow-[0_8px_28px_rgba(8,18,30,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent shadow-none",
      )}
      style={{ height: HEADER_H }}
    >
      <div className="relative mx-auto flex h-full max-w-[1440px] items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">
        {/* Logo — left, transparent, same size */}
        <Link
          href="/"
          aria-label="Summit Seek — Home"
          className="relative z-10 flex h-full shrink-0 items-center bg-transparent"
        >
          <Image
            key={activeLogo}
            src={activeLogo}
            alt="Summit Seek Travels & Tours"
            width={980}
            height={322}
            unoptimized
            priority
            className="h-[44px] w-auto max-w-[168px] bg-transparent object-contain object-left sm:h-[52px] sm:max-w-[200px] lg:h-[56px] lg:max-w-[220px]"
          />
        </Link>

        <nav
          className="absolute left-[46%] hidden -translate-x-1/2 items-center gap-0.5 xl:flex"
          aria-label="Primary"
          onMouseLeave={() => setMegaKind(null)}
        >
          {mainNav.map((item) => {
            const kind = megaKindForLabel(item.label);
            const open = kind !== null && megaKind === kind;
            if (kind) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMegaKind(kind)}
                >
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors lg:px-3.5 lg:text-[14px]",
                      navText,
                    )}
                    aria-expanded={open}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 shrink-0 opacity-75" />
                  </button>
                  {kind === "destinations" ? (
                    <DestinationsDropdown
                      open={open}
                      onClose={() => setMegaKind(null)}
                    />
                  ) : kind === "trekking" ? (
                    <TrekkingMegaMenu
                      open={open}
                      onClose={() => setMegaKind(null)}
                    />
                  ) : kind === "travel-info" ? (
                    <TravelInfoMegaMenu
                      open={open}
                      onClose={() => setMegaKind(null)}
                    />
                  ) : (
                    <CompanyDropdown
                      open={open}
                      onClose={() => setMegaKind(null)}
                    />
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors lg:px-3.5 lg:text-[14px]",
                  navText,
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Need Help? Call Us — replaces search/heart/sign-in/sign-up */}
        <div className="ml-auto hidden items-center gap-2.5 pl-4 lg:flex xl:gap-3 xl:pl-8">
          <Link
            href="/blog"
            className={cn(
              "inline-flex size-9 shrink-0 items-center justify-center transition",
              scrolled ? "text-[#0b1524] hover:text-[#1d4ed8]" : "text-white hover:text-[#93c5fd]",
            )}
            aria-label="Search travel blogs"
          >
            <Search className="size-[18px] stroke-[1.75]" />
          </Link>
          <a
            href={`tel:${SITE.phone}`}
            className="group flex min-w-0 flex-col leading-tight"
            aria-label={`Call us at ${SITE.phoneDisplay}`}
          >
            <span
              className={cn(
                "font-[family-name:var(--font-ui)] text-[11px] font-medium sm:text-[12px]",
                scrolled ? "text-[#5a9a3a]" : "text-[#9dcc7a]",
              )}
            >
              Need Help? Call Us
            </span>
            <span
              className={cn(
                "font-[family-name:var(--font-ui)] text-[14px] font-bold tracking-tight sm:text-[15px]",
                scrolled ? "text-[#0b1524]" : "text-white",
              )}
            >
              {SITE.phoneDisplay}
            </span>
          </a>
        </div>

        <button
          type="button"
          className={cn(
            "ml-auto inline-flex size-10 items-center justify-center rounded-md xl:hidden",
            scrolled ? "text-[#0b1524]" : "text-white",
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-0 top-[72px] max-h-[calc(100svh-72px)] overflow-y-auto border-b border-black/10 bg-white shadow-xl xl:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {mainNav.map((item) => {
                const kind = megaKindForLabel(item.label);
                if (kind) {
                  const open = mobileMega === item.label;
                  return (
                    <div key={item.label}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[15px] font-semibold text-[#0b1524]"
                        onClick={() =>
                          setMobileMega((v) => (v === item.label ? null : item.label))
                        }
                      >
                        {item.label}
                        <ChevronDown
                          className={cn("size-4 transition", open ? "rotate-180" : "")}
                        />
                      </button>
                      {kind === "destinations" ? (
                        <DestinationsMobilePanel
                          open={open}
                          onClose={() => {
                            setMobileOpen(false);
                            setMobileMega(null);
                          }}
                        />
                      ) : null}
                      {open && kind === "trekking" ? (
                        <TrekkingMobileAccordion
                          onClose={() => {
                            setMobileOpen(false);
                            setMobileMega(null);
                          }}
                        />
                      ) : null}
                      {open && kind === "travel-info" ? (
                        <TravelInfoMobilePanel
                          onClose={() => {
                            setMobileOpen(false);
                            setMobileMega(null);
                          }}
                        />
                      ) : null}
                      {open && kind === "company" ? (
                        <CompanyMobilePanel
                          onClose={() => {
                            setMobileOpen(false);
                            setMobileMega(null);
                          }}
                        />
                      ) : null}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-3 text-[15px] font-semibold text-[#0b1524]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-3 flex items-center gap-3 border-t border-black/10 pt-4">
                <Search className="size-5 shrink-0 text-[#0b1524]" strokeWidth={1.75} />
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex min-w-0 flex-col leading-tight"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-[12px] font-medium text-[#5a9a3a]">
                    Need Help? Call Us
                  </span>
                  <span className="text-[15px] font-bold text-[#0b1524]">
                    {SITE.phoneDisplay}
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
