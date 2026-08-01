"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Mail, Phone, MessageCircle } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { TopBar } from "@/components/layout/TopBar";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { CategoryIcon } from "@/components/layout/CategoryIcon";
import { Container } from "@/components/ui/Container";
import { mainNav, megaCategories } from "@/lib/data/navigation";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ease = "duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        ease,
        scrolled
          ? "border-b border-white/[0.08] bg-[rgba(5,12,20,0.92)] backdrop-blur-[18px]"
          : "bg-transparent",
      )}
    >
      <TopBar />

      <Container className="relative">
        {/* 3-column flex — prevents nav from sliding under phone CTA */}
        <div className="grid h-[110px] grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-[120px] lg:gap-6">
          <Logo priority />

          <nav
            className="relative hidden min-w-0 justify-center xl:flex"
            aria-label="Primary"
            onMouseLeave={() => setMegaOpen(false)}
          >
            <ul className="flex flex-nowrap items-center justify-center gap-x-3.5 2xl:gap-x-6">
              {mainNav.map((item) => {
                const showChevron = Boolean(item.dropdown || item.mega);
                const opensMega = Boolean(item.mega);

                if (opensMega) {
                  return (
                    <li key={item.href} className="shrink-0">
                      <button
                        type="button"
                        onMouseEnter={() => setMegaOpen(true)}
                        onFocus={() => setMegaOpen(true)}
                        className={cn(
                          "nav-link inline-flex items-center gap-1 whitespace-nowrap py-3 text-[11px] font-bold text-white xl:text-[12px] 2xl:text-[13px]",
                          "transition-colors hover:text-[#D8A73C]",
                          ease,
                        )}
                        aria-expanded={megaOpen}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn("size-3 transition-transform 2xl:size-3.5", ease, megaOpen && "rotate-180")}
                        />
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.href} className="shrink-0">
                    <Link
                      href={item.href}
                      onMouseEnter={() => setMegaOpen(false)}
                      className={cn(
                        "nav-link inline-flex items-center gap-1 whitespace-nowrap py-3 text-[11px] font-bold text-white xl:text-[12px] 2xl:text-[13px]",
                        "transition-colors hover:text-[#D8A73C]",
                        ease,
                      )}
                    >
                      {item.label}
                      {showChevron ? <ChevronDown className="size-3 2xl:size-3.5" /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2.5 lg:gap-3">
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden items-center gap-2 rounded-full border border-white/20 bg-[#0a1018]/60 px-3.5 py-2.5 text-[12px] font-semibold text-white backdrop-blur-md xl:inline-flex",
                "transition-all hover:border-[#D8A73C]/50",
                ease,
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
                "inline-flex size-11 items-center justify-center rounded-[12px] border border-white/25 text-white xl:hidden",
                "transition-colors hover:border-[#D8A73C] hover:text-[#D8A73C]",
                ease,
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
            className="fixed inset-0 top-[110px] z-40 bg-[#08121E]/60 backdrop-blur-sm xl:hidden"
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
                  {mainNav.map((item) => (
                    <li key={item.href}>
                      {item.mega ? (
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
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-2"
                              >
                                {megaCategories.map((cat) => (
                                  <li key={cat.id}>
                                    <Link
                                      href={cat.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#D5D8DD] hover:text-[#D8A73C]"
                                    >
                                      <CategoryIcon name={cat.icon} className="size-4 text-[#D8A73C]" />
                                      {cat.label}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
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
                  ))}
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
