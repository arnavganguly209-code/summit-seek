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
import { DestinationsDropdown } from "@/components/layout/DestinationsDropdown";
import { TrekkingMegaMenu } from "@/components/layout/TrekkingMegaMenu";
import { destinationNavItems } from "@/lib/data/destinations-nav";
import { mainNav, trekkingColumns, type MegaKind } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

const HEADER_H = 72;

function megaKindForLabel(label: string): MegaKind | null {
  if (label === "Destinations") return "destinations";
  if (label === "Trekking In Nepal") return "trekking";
  return null;
}

type Props = {
  logoUrl?: string;
  logoUrlLight?: string;
};

export function Header({
  logoUrl = "/logo-summit-seek-transparent.png",
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
    ? "text-[#0b1524] hover:text-[#F58220]"
    : "text-white hover:text-[#F58220]";

  const activeLogo = scrolled ? logoUrl : logoUrlLight;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-black/[0.06] bg-white/85 shadow-[0_8px_28px_rgba(8,18,30,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent shadow-none",
      )}
      style={{ height: HEADER_H }}
    >
      <div className="relative mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Summit Seek — Home" className="shrink-0">
          <Image
            src={activeLogo}
            alt="Summit Seek Travels & Tours"
            width={220}
            height={66}
            unoptimized
            priority
            className="h-[42px] w-auto object-contain sm:h-[55px]"
          />
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 xl:flex"
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
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-[14px] font-semibold transition-colors",
                      navText,
                    )}
                    aria-expanded={open}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 opacity-80" />
                  </button>
                  {kind === "destinations" ? (
                    <DestinationsDropdown
                      open={open}
                      onClose={() => setMegaKind(null)}
                    />
                  ) : (
                    <TrekkingMegaMenu
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
                  "rounded-md px-3 py-2 text-[14px] font-semibold transition-colors",
                  navText,
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border transition",
              scrolled
                ? "border-[#2f9e44]/40 text-[#2f9e44] hover:bg-[#2f9e44]/10"
                : "border-[#2f9e44]/70 text-[#7ddea0] hover:bg-white/10",
            )}
            aria-label="Search"
          >
            <Search className="size-[18px]" />
          </button>
          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full transition",
              scrolled ? "text-[#0b1524] hover:bg-black/5" : "text-white hover:bg-white/10",
            )}
            aria-label="Wishlist"
          >
            <Heart className="size-[18px]" />
          </button>
          <span
            className={cn("mx-1 h-5 w-px", scrolled ? "bg-black/15" : "bg-white/30")}
            aria-hidden
          />
          <Link
            href="/orbit"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[13px] font-semibold transition",
              navText,
            )}
          >
            <UserRound className="size-4" />
            Sign In
          </Link>
          <span
            className={cn("mx-0.5 h-5 w-px", scrolled ? "bg-black/15" : "bg-white/30")}
            aria-hidden
          />
          <Link
            href="/orbit"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[13px] font-semibold transition",
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
            "inline-flex size-10 items-center justify-center rounded-md xl:hidden",
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
                      {open && kind === "destinations" ? (
                        <ul className="space-y-1 pb-2 pl-3">
                          {destinationNavItems.map((d) => (
                            <li key={d.href}>
                              <Link
                                href={d.href}
                                className="block rounded-md px-3 py-2 text-[14px] text-[#334155]"
                                onClick={() => setMobileOpen(false)}
                              >
                                {d.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {open && kind === "trekking" ? (
                        <div className="space-y-3 pb-2 pl-3">
                          {trekkingColumns.map((col) => (
                            <div key={col.id}>
                              <p className="px-3 text-[12px] font-bold uppercase tracking-wide text-[#64748b]">
                                {col.heading}
                              </p>
                              <ul>
                                {col.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className="block rounded-md px-3 py-2 text-[14px] text-[#334155]"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {link.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
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
                  href="/orbit"
                  className="rounded-lg bg-[#0b1524] px-3 py-3 text-center text-[13px] font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/orbit"
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
