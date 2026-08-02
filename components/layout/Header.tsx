"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Heart,
  UserRound,
  Sparkles,
} from "lucide-react";
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
            src={activeLogo}
            alt="Summit Seek Travels & Tours"
            width={980}
            height={322}
            unoptimized
            priority
            className="h-[44px] w-auto max-w-[168px] bg-transparent object-contain object-left sm:h-[52px] sm:max-w-[200px] lg:h-[56px] lg:max-w-[220px]"
          />
        </Link>

        {/* Nav shifted slightly left so Contact Us never touches wishlist */}
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

        {/* Actions — right, with clear breathing room from nav */}
        <div className="ml-auto hidden items-center gap-2 pl-6 lg:flex xl:pl-10">
          <button
            type="button"
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-full border transition",
              scrolled
                ? "border-[#2563eb]/35 text-[#2563eb] hover:bg-[#2563eb]/8"
                : "border-white/35 text-white hover:bg-white/10",
            )}
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-full transition",
              scrolled ? "text-[#0b1524] hover:bg-black/5" : "text-white hover:bg-white/10",
            )}
            aria-label="Wishlist"
          >
            <Heart className="size-4" />
          </button>
          <span
            className={cn("mx-1.5 h-4 w-px", scrolled ? "bg-black/15" : "bg-white/30")}
            aria-hidden
          />
          <Link
            href="/sign-in"
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] font-semibold transition",
              navText,
            )}
          >
            <UserRound className="size-4" />
            Sign In
          </Link>
          <span
            className={cn("mx-0.5 h-4 w-px", scrolled ? "bg-black/15" : "bg-white/30")}
            aria-hidden
          />
          <Link
            href="/sign-up"
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] font-semibold transition",
              navText,
            )}
          >
            <span className="relative">
              <UserRound className="size-4" />
              <Sparkles className="absolute -right-1.5 -top-1 size-2.5 text-[#F58220]" />
            </span>
            Sign Up
          </Link>
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
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-black/10 pt-3">
                <Link
                  href="/sign-in"
                  className="rounded-lg bg-[#0b1524] px-3 py-3 text-center text-[13px] font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-lg border border-[#0b1524]/20 px-3 py-3 text-center text-[13px] font-semibold text-[#0b1524]"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
