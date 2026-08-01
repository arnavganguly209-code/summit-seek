"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { megaCategories } from "@/lib/data/navigation";
import { CategoryIcon } from "@/components/layout/CategoryIcon";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const [activeId, setActiveId] = useState(megaCategories[0]?.id ?? "");
  const active = megaCategories.find((c) => c.id === activeId) ?? megaCategories[0];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-full z-50 hidden lg:block"
          onMouseLeave={onClose}
        >
          <div className="mx-4 mt-2 overflow-hidden rounded-2xl border border-border bg-snow shadow-[0_30px_80px_rgba(11,29,54,0.14)] xl:mx-auto xl:max-w-[1400px]">
            <Container className="grid grid-cols-[280px_1fr] gap-0 px-0!">
              {/* Category rail */}
              <aside className="border-r border-border bg-mist/60 py-4">
                <p className="px-6 pb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-light">
                  Explore Regions
                </p>
                <ul className="luxury-scroll max-h-[420px] overflow-y-auto px-2">
                  {megaCategories.map((cat) => {
                    const isActive = cat.id === activeId;
                    return (
                      <li key={cat.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveId(cat.id)}
                          onFocus={() => setActiveId(cat.id)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200",
                            isActive
                              ? "bg-snow text-midnight shadow-[0_8px_24px_rgba(11,29,54,0.06)]"
                              : "text-slate hover:bg-snow/70 hover:text-midnight",
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-9 items-center justify-center rounded-lg border",
                              isActive
                                ? "border-gold/40 bg-gold/10 text-gold-dark"
                                : "border-border bg-snow text-midnight",
                            )}
                          >
                            <CategoryIcon name={cat.icon} className="size-4" />
                          </span>
                          <span className="text-sm font-bold">{cat.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </aside>

              {/* Packages panel */}
              <div className="p-7 xl:p-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-2 inline-flex items-center gap-2 text-gold-dark">
                          <CategoryIcon name={active.icon} className="size-5" />
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                            {active.label}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-midnight xl:text-3xl">
                          {active.label} Journeys
                        </h3>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate">
                          {active.description}
                        </p>
                      </div>
                      <Link
                        href={active.href}
                        onClick={onClose}
                        className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-gold/40 bg-gold/10 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-midnight transition-colors hover:bg-gold hover:text-midnight"
                      >
                        View All
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {active.packages.map((pkg) => (
                        <Link
                          key={pkg.href}
                          href={pkg.href}
                          onClick={onClose}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-mist/40 px-4 py-4 transition-all duration-250 hover:border-gold/40 hover:bg-snow hover:shadow-[0_10px_28px_rgba(11,29,54,0.07)]"
                        >
                          <div>
                            <p className="text-sm font-bold text-midnight transition-colors group-hover:text-gold-dark">
                              {pkg.title}
                            </p>
                            <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate">
                              <Clock className="size-3 text-gold-dark" />
                              {pkg.duration}
                            </p>
                          </div>
                          <ArrowRight className="size-4 shrink-0 text-slate-light transition-transform group-hover:translate-x-0.5 group-hover:text-gold-dark" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
                      <p className="text-xs text-slate">
                        Need a custom itinerary?{" "}
                        <Link
                          href="/contact"
                          onClick={onClose}
                          className="font-bold text-midnight underline decoration-gold/50 underline-offset-4 hover:text-gold-dark"
                        >
                          Plan with our experts
                        </Link>
                      </p>
                      <Link
                        href="/trekking"
                        onClick={onClose}
                        className="text-[11px] font-bold uppercase tracking-[0.16em] text-midnight hover:text-gold-dark"
                      >
                        All Treks →
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Container>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
