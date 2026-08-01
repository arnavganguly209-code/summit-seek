"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { TopBar } from "@/components/layout/TopBar";
import { DestinationsMegaMenu } from "@/components/layout/DestinationsMegaMenu";
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        ease,
        scrolled
          ? "border-b border-black/[0.06] bg-[rgba(255,255,255,0.78)] shadow-[0_8px_32px_rgba(8,18,30,0.08)] backdrop-blur-[20px]"
          : "bg-transparent",
      )}
    >
      <TopBar scrolled={scrolled} />

      <Container className="relative">
        <div className="grid h-[100px] grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-[108px] lg:gap-6">
          <Logo priority onLight={scrolled} />

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

                if (opensMega && kind) {
                  return (
                    <li key={item.href} className="shrink-0">
                      <button
                        type="button"
                        onMouseEnter={() => setMegaKind(kind)}
                        onFocus={() => setMegaKind(kind)}
                        className={cn(
                          "nav-link inline-flex items-center gap-1 whitespace-nowrap py-3 text-[13.5px] font-bold xl:text-[14.5px] 2xl:text-[15px]",
                          "transition-colors",
                          ease,
                          navText,
                          megaKind === kind && "text-[#D8A73C]",
                        )}
                        aria-expanded={megaKind === kind}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform",
                            ease,
                            megaKind === kind && "rotate-180",
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
                        "nav-link inline-flex items-center gap-1 whitespace-nowrap py-3 text-[13.5px] font-bold xl:text-[14.5px] 2xl:text-[15px]",
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

            <DestinationsMegaMenu
              open={megaKind === "destinations"}
              onClose={() => setMegaKind(null)}
            />
            <TrekkingMegaMenu
              open={megaKind === "trekking"}
              onClose={() => setMegaKind(null)}
            />
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2.5 lg:gap-3">
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden items-center gap-2 rounded-full px-3.5 py-2.5 text-[12px] font-semibold backdrop-blur-md xl:inline-flex",
                "transition-all hover:border-[#D8A73C]/50",
                ease,
                scrolled
                  ? "border border-black/10 bg-white/70 text-[#08121E]"
                  : "border border-white/20 bg-[#0a1018]/60 text-white",
              )}
            >
              <MessageCircle className="size-3.5 text-[#25D366]" />
              {SITE.phoneDisplay}
            </a>
            <Link
              href="/plan-your-trip"
              className={cn(
                "hidden h-[46px] items-center justify-center rounded-[12px] bg-[#D8A73C] px-5 text-[12px] font-semibold tracking-wide text-[#08121E] sm:inline-flex lg:h-[50px] lg:rounded-[14px] lg:px-6",
                "shadow-[0_10px_28px_rgba(216,167,60,0.4)]",
                "transition-all hover:-translate-y-0.5 hover:bg-[#c49630]",
                ease,
              )}
            >
              PLAN YOUR TRIP →
            </Link>
            <button
              type="button"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-[12px] xl:hidden",
                "transition-colors hover:border-[#D8A73C] hover:text-[#D8A73C]",
                ease,
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
            className="fixed inset-0 top-[100px] z-40 bg-[#08121E]/60 backdrop-blur-sm xl:hidden"
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
