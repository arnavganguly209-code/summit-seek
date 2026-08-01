"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { destinationRegions } from "@/lib/data/navigation";
import { CategoryIcon } from "@/components/layout/CategoryIcon";
import { cn } from "@/lib/utils";

interface DestinationsMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function DestinationsMegaMenu({ open, onClose }: DestinationsMegaMenuProps) {
  const [activeId, setActiveId] = useState(destinationRegions[0]?.id ?? "everest");
  const active =
    destinationRegions.find((c) => c.id === activeId) ?? destinationRegions[0];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease }}
          className="absolute left-1/2 top-full z-50 mt-3 hidden w-[min(1180px,calc(100vw-2rem))] -translate-x-1/2 xl:block"
          onMouseLeave={onClose}
        >
          <div className="overflow-hidden rounded-2xl border border-[#e8ebf0] bg-white shadow-[0_28px_80px_rgba(8,18,30,0.16)]">
            <div className="grid grid-cols-[260px_1fr]">
              {/* Left — vertical region list */}
              <aside className="border-r border-[#eef0f4] bg-[#F7F8FA] py-5">
                <p className="px-5 pb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B93A3]">
                  Destinations
                </p>
                <ul className="luxury-scroll max-h-[min(520px,70vh)] space-y-0.5 overflow-y-auto px-2.5">
                  {destinationRegions.map((cat) => {
                    const isActive = cat.id === activeId;
                    return (
                      <li key={cat.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveId(cat.id)}
                          onFocus={() => setActiveId(cat.id)}
                          className={cn(
                            "group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isActive
                              ? "bg-[#D8A73C]/12 text-[#08121E] shadow-[inset_0_0_0_1px_rgba(216,167,60,0.35)]"
                              : "text-[#3d4554] hover:bg-white hover:text-[#08121E] hover:shadow-[0_4px_14px_rgba(8,18,30,0.05)]",
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300",
                              isActive
                                ? "bg-[#D8A73C]/20 text-[#B8892A]"
                                : "bg-white text-[#08121E] shadow-[0_1px_0_rgba(8,18,30,0.04)] group-hover:text-[#D8A73C]",
                            )}
                          >
                            <CategoryIcon name={cat.icon} className="size-3.5" />
                          </span>
                          <span className="text-[13px] font-semibold tracking-[-0.01em]">
                            {cat.label}
                          </span>
                          {isActive ? (
                            <ArrowRight className="ml-auto size-3.5 text-[#D8A73C]" />
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </aside>

              {/* Right — premium destination cards */}
              <div className="p-7 xl:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.28, ease }}
                  >
                    <div className="mb-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D8A73C]">
                          {active.label}
                        </p>
                        <h3 className="mt-1 font-[family-name:var(--font-display)] text-[1.65rem] font-semibold leading-tight text-[#08121E]">
                          {active.label} Journeys
                        </h3>
                        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[#5c6575]">
                          {active.description}
                        </p>
                      </div>
                      <Link
                        href={active.href}
                        onClick={onClose}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#D8A73C]/45 bg-[#D8A73C]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#08121E] transition-all duration-300 hover:bg-[#D8A73C] hover:text-[#08121E]"
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
                          className="group flex items-center justify-between gap-3 rounded-xl border border-[#e8ebf0] bg-[#F9FAFB] px-4 py-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#D8A73C]/45 hover:bg-white hover:shadow-[0_14px_36px_rgba(8,18,30,0.08)]"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-[14px] font-semibold text-[#08121E] transition-colors group-hover:text-[#B8892A]">
                              {pkg.title}
                            </p>
                            <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-[#6b7382]">
                              <Clock className="size-3 text-[#D8A73C]" />
                              {pkg.duration}
                            </p>
                          </div>
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[#9aa3b2] shadow-[0_2px_8px_rgba(8,18,30,0.06)] transition-all duration-300 group-hover:bg-[#D8A73C] group-hover:text-[#08121E]">
                            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
