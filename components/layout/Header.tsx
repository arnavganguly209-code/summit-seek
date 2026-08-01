"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Mail, Phone, ArrowRight } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { TopBar } from "@/components/layout/TopBar";
import { DestinationsDropdown } from "@/components/layout/DestinationsDropdown";
import { TrekkingMegaMenu } from "@/components/layout/TrekkingMegaMenu";
import { CategoryIcon } from "@/components/layout/CategoryIcon";
import { Container } from "@/components/ui/Container";
import {
  mainNav,
  destinationRegions,
  trekkingColumns,
  type MegaKind,
} from "@/lib/data/navigation";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ease = "duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

function megaKindForLabel(label: string): MegaKind | null {
  if (label === "Destinations") return "destinations";
  if (label === "Trekking In Nepal") return "trekking";
  return null;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaKind, setMegaKind] = useState<MegaKind | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMega, setMobileMega] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    ? "text-[#08121E] hover:text-[#D8A73C]"
    : "text-white hover:text-[#D8A73C]";

  const headerH = scrolled ? "h-[62px]" : "h-[72px]";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        ease,
        scrolled
          ? "border-b border-black/[0.06] bg-white shadow-[0_6px_24px_rgba(8,18,30,0.08)]"
          : "bg-transparent",
      )}
    >
      {/* TopBar collapses after scroll for compact sticky header */}
      <div
        className={cn(
          "overflow-hidden transition-all",
          ease,
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
        )}
      >
        <TopBar scrolled={scrolled} />
      </div>

      <Container className="relative">
        <div
          className={cn(
            "grid grid-cols-[auto_1fr_auto] items-center gap-3 transition-all lg:gap-5",
            ease,
            headerH,
          )}
        >
          <Logo priority compact={scrolled} />

          <nav
            className="relative hidden min-w-0 justify-center xl:flex"
            aria-label="Primary"
            onMouseLeave={() => setMegaKind(null)}
          >
            <ul className="flex flex-nowrap items-center justify-center gap-x-5 2xl:gap-x-7">
              {mainNav.map((item) => {
                const showChevron = Boolean(item.dropdown || item.mega);
                const kind = megaKindForLabel(item.label);
                const opensMega = Boolean(kind);

                if (opensMega && kind === "destinations") {
                  return (
                    <li
                      key={item.href}
                      className="relative shrink-0"
                      onMouseEnter={() => setMegaKind("destinations")}
                      onFocus={() => setMegaKind("destinations")}
                    >
                      <button
                        type="button"
                        className={cn(
                          "nav-link inline-flex items-center gap-1 whitespace-nowrap py-2 text-[16px] font-bold tracking-[-0.01em] xl:text-[17px]",
                          "transition-colors",
                          ease,
                          navText,
                          megaKind === "destinations" && "text-[#D8A73C]",
                        )}
                        aria-expanded={megaKind === "destinations"}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform",
                            ease,
                            megaKind === "destinations" && "rotate-180",
                          )}
                        />
                      </button>
                      <DestinationsDropdown
                        open={megaKind === "destinations"}
                        onClose={() => setMegaKind(null)}
                      />
                    </li>
                  );
                }

                if (opensMega && kind === "trekking") {
                  return (
                    <li key={item.href} className="shrink-0">
                      <button
                        type="button"
                        onMouseEnter={() => setMegaKind("trekking")}
                        onFocus={() => setMegaKind("trekking")}
                        className={cn(
                          "nav-link inline-flex items-center gap-1 whitespace-nowrap py-2 text-[16px] font-bold tracking-[-0.01em] xl:text-[17px]",
                          "transition-colors",
                          ease,
                          navText,
                          megaKind === "trekking" && "text-[#D8A73C]",
                        )}
                        aria-expanded={megaKind === "trekking"}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform",
                            ease,
                            megaKind === "trekking" && "rotate-180",
                          )}
                        />
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.href} className="shrink-0">
                    <Link
                      href={item.href}
                      onMouseEnter={() => setMegaKind(null)}
                      className={cn(
                        "nav-link inline-flex items-center gap-1 whitespace-nowrap py-2 text-[16px] font-bold tracking-[-0.01em] xl:text-[17px]",
                        "transition-colors",
                        ease,
                        navText,
                      )}
                    >
                      {item.label}
                      {showChevron ? <ChevronDown className="size-3.5" /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <TrekkingMegaMenu
              open={megaKind === "trekking"}
              onClose={() => setMegaKind(null)}
            />
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2 lg:gap-3">
            <Link
              href="/plan-your-trip"
              className={cn(
                "hidden items-center justify-center rounded-[10px] bg-[#D8A73C] px-4 text-[11px] font-semibold tracking-wide text-[#08121E] sm:inline-flex lg:rounded-[12px] lg:px-5 lg:text-[12px]",
                "shadow-[0_8px_22px_rgba(216,167,60,0.35)]",
                "transition-all hover:-translate-y-0.5 hover:bg-[#c49630]",
                ease,
                scrolled ? "h-9 lg:h-10" : "h-10 lg:h-11",
              )}
            >
              PLAN YOUR TRIP →
            </Link>
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center rounded-[10px] xl:hidden",
                "transition-colors hover:border-[#D8A73C] hover:text-[#D8A73C]",
                ease,
                scrolled ? "size-9" : "size-10",
                scrolled
                  ? "border border-black/15 text-[#08121E]"
                  : "border border-white/25 text-white",
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "fixed inset-0 z-40 bg-[#08121E]/60 backdrop-blur-sm xl:hidden",
              scrolled ? "top-[62px]" : "top-[72px]",
            )}
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-[#08121E]"
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile"
            >
              <div className="luxury-scroll flex-1 overflow-y-auto px-5 py-6">
                <ul className="space-y-1">
                  {mainNav.map((item) => {
                    const kind = megaKindForLabel(item.label);
                    return (
                      <li key={item.href}>
                        {kind ? (
                          <div>
                            <button
                              type="button"
                              className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-base font-bold text-white"
                              onClick={() =>
                                setMobileMega((v) => (v === item.label ? null : item.label))
                              }
                            >
                              {item.label}
                              <ChevronDown
                                className={cn(
                                  "size-4 transition-transform",
                                  mobileMega === item.label && "rotate-180",
                                )}
                              />
                            </button>
                            <AnimatePresence>
                              {mobileMega === item.label ? (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden pl-1"
                                >
                                  {kind === "destinations" ? (
                                    <ul className="space-y-0.5 pb-3">
                                      {destinationRegions.map((cat) => (
                                        <li key={cat.id}>
                                          <Link
                                            href={cat.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#D5D8DD] transition-colors hover:bg-white/5 hover:text-[#D8A73C]"
                                          >
                                            <CategoryIcon
                                              name={cat.icon}
                                              className="size-4 text-[#D8A73C]"
                                            />
                                            {cat.label}
                                            <ArrowRight className="ml-auto size-3.5 opacity-40" />
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <div className="space-y-4 pb-4 pl-2">
                                      {trekkingColumns.map((col) => (
                                        <div key={col.id}>
                                          <Link
                                            href={col.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#D8A73C]"
                                          >
                                            {col.heading}
                                          </Link>
                                          <ul className="mt-2 space-y-1">
                                            {col.links.map((link) => (
                                              <li key={link.href}>
                                                <Link
                                                  href={link.href}
                                                  onClick={() => setMobileOpen(false)}
                                                  className="block rounded-lg px-2 py-1.5 text-sm text-[#D5D8DD] hover:text-[#D8A73C]"
                                                >
                                                  {link.title}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-xl px-3 py-3.5 text-base font-bold text-white hover:text-[#D8A73C]"
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm text-[#D5D8DD]">
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-[#D8A73C]">
                    <Mail className="size-4 text-[#D8A73C]" />
                    {SITE.email}
                  </a>
                  <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 hover:text-[#D8A73C]">
                    <Phone className="size-4 text-[#D8A73C]" />
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="border-t border-white/10 p-5">
                <Link
                  href="/plan-your-trip"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[#D8A73C] text-sm font-semibold text-[#08121E]"
                >
                  PLAN YOUR TRIP →
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
