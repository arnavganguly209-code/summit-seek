"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { TopBar } from "@/components/layout/TopBar";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { CategoryIcon } from "@/components/layout/CategoryIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav, megaCategories } from "@/lib/data/navigation";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMega, setMobileMega] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  const overHero = !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        overHero ? "header-glass" : "header-solid",
      )}
    >
      <TopBar overHero={overHero} />

      <Container className="relative">
        <div className="flex h-[72px] items-center justify-between gap-4 lg:h-[88px]">
          <Logo priority />

          {/* Desktop nav */}
          <nav
            className="hidden items-center lg:flex"
            aria-label="Primary"
            onMouseLeave={() => setMegaOpen(false)}
          >
            <ul className="flex items-center">
              {mainNav.map((item) => {
                const hasMega = Boolean(item.mega);
                return (
                  <li key={item.href} className="relative">
                    {hasMega ? (
                      <button
                        type="button"
                        onMouseEnter={() => setMegaOpen(true)}
                        onFocus={() => setMegaOpen(true)}
                        className={cn(
                          "inline-flex items-center gap-1 px-3 py-6 text-[13px] font-extrabold tracking-wide text-midnight",
                          "transition-colors hover:text-gold-dark xl:px-3.5",
                        )}
                        aria-expanded={megaOpen}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform duration-300",
                            megaOpen && "rotate-180",
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="inline-flex items-center px-3 py-6 text-[13px] font-extrabold tracking-wide text-midnight transition-colors hover:text-gold-dark xl:px-3.5"
                        onMouseEnter={() => setMegaOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href="/plan-your-trip"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Plan Your Trip
            </Button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-sm border border-border text-midnight transition-colors hover:border-gold/50 hover:text-gold-dark lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[72px] z-40 bg-midnight/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-snow shadow-2xl"
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
                            className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-base font-extrabold text-midnight"
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
                                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate hover:bg-mist hover:text-midnight"
                                    >
                                      <CategoryIcon
                                        name={cat.icon}
                                        className="size-4 text-gold-dark"
                                      />
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
                          className="block rounded-xl px-3 py-3.5 text-base font-extrabold text-midnight hover:bg-mist"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-2 text-slate hover:text-midnight"
                  >
                    <Mail className="size-4 text-gold-dark" />
                    {SITE.email}
                  </a>
                  <a
                    href={`tel:${SITE.phone}`}
                    className="flex items-center gap-2 text-slate hover:text-midnight"
                  >
                    <Phone className="size-4 text-gold-dark" />
                    {SITE.phoneDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 text-slate hover:text-midnight"
                  >
                    <MessageCircle className="size-4 text-gold-dark" />
                    WhatsApp
                  </a>
                </div>
              </div>
              <div className="border-t border-border p-5">
                <Button href="/plan-your-trip" className="w-full" size="lg">
                  Plan Your Trip
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
