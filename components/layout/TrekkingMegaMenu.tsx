"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Mountain } from "lucide-react";
import { trekkingColumns, type TrekkingColumn } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

interface TrekkingMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

function RegionCard({
  col,
  index,
  onClose,
}: {
  col: TrekkingColumn;
  index: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut", delay: index * 0.04 }}
      className="min-w-0"
    >
      <Link
        href={col.href}
        onClick={onClose}
        className="group inline-flex flex-col"
      >
        <span className="text-[13px] font-bold tracking-[0.02em] text-[#0b1524] transition-colors duration-[220ms] group-hover:text-[#F58220]">
          {col.heading}
        </span>
        <span className="mt-1.5 h-px w-9 bg-[#F58220] transition-all duration-[220ms] group-hover:w-14" />
      </Link>

      <ul className="mt-3.5 space-y-0.5">
        {col.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              className="group flex items-center gap-2 rounded-[10px] px-2 py-1.5 transition-all duration-[220ms] ease-out hover:bg-[rgba(255,170,40,0.08)]"
            >
              <Mountain
                className="size-3.5 shrink-0 text-[#C5CDD8] transition-colors duration-[220ms] group-hover:text-[#F58220]"
                strokeWidth={1.75}
              />
              <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium leading-snug text-[#3a4556] transition-colors duration-[220ms] group-hover:text-[#F58220]">
                {link.title}
              </span>
              <span className="shrink-0 rounded-full bg-[rgba(216,167,60,0.16)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.02em] text-[#9a6f18]">
                {link.duration}
              </span>
              <ArrowRight
                className="size-3 shrink-0 text-[#D0D7E2] transition-all duration-[220ms] ease-out group-hover:translate-x-1 group-hover:text-[#F58220]"
                strokeWidth={2.25}
              />
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function TrekkingMegaMenu({ open, onClose }: TrekkingMegaMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="pointer-events-auto fixed left-1/2 top-[72px] z-[60] hidden w-[min(1220px,calc(100vw-2rem))] -translate-x-1/2 pt-2 xl:block"
          onMouseLeave={onClose}
        >
          <div
            className={cn(
              "overflow-hidden rounded-[22px] border border-[rgba(255,255,255,0.45)]",
              "bg-[rgba(255,255,255,0.96)] shadow-[0_30px_80px_rgba(0,0,0,0.16)] backdrop-blur-[22px]",
            )}
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-6 border-b border-black/[0.05] p-10 pb-6">
              <div className="min-w-0 max-w-xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F58220]">
                  Trekking In Nepal
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[26px] font-semibold leading-tight tracking-[-0.02em] text-[#0b1524]">
                  Choose Your Himalayan Adventure
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#5a6577]">
                  Find the perfect trek based on region, duration and difficulty.
                </p>
              </div>
              <Link
                href="/trekking"
                onClick={onClose}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#F58220] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_28px_rgba(245,130,32,0.32)] transition-all duration-[220ms] hover:brightness-110"
              >
                View All Treks
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Grid — 3 cols laptop / 4 cols desktop */}
            <div className="grid max-h-[min(62vh,560px)] grid-cols-3 gap-x-8 gap-y-9 overflow-y-auto overscroll-contain px-10 py-8 2xl:grid-cols-4">
              {trekkingColumns.map((col, index) => (
                <RegionCard key={col.id} col={col} index={index} onClose={onClose} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="flex items-center justify-between gap-4 border-t border-black/[0.05] bg-[rgba(247,248,250,0.72)] px-10 py-4 backdrop-blur-md">
              <p className="text-[13px] font-medium text-[#3a4556]">
                Need help choosing the right trek?
              </p>
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F58220] transition-all duration-[220ms] hover:gap-2.5"
              >
                Talk to our trekking expert
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Accordion layout for tablet / mobile menu */
export function TrekkingMobileAccordion({ onClose }: { onClose: () => void }) {
  const [openId, setOpenId] = useState<string | null>(trekkingColumns[0]?.id ?? null);

  return (
    <div className="mb-2 space-y-1.5">
      {trekkingColumns.map((col) => {
        const open = openId === col.id;
        return (
          <div
            key={col.id}
            className="overflow-hidden rounded-[14px] border border-black/[0.06] bg-[rgba(255,255,255,0.96)]"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left"
              onClick={() => setOpenId((v) => (v === col.id ? null : col.id))}
              aria-expanded={open}
            >
              <span className="text-[13px] font-bold text-[#0b1524]">{col.heading}</span>
              <ChevronDown
                className={cn(
                  "size-4 text-[#94A3B8] transition-transform duration-[220ms]",
                  open && "rotate-180 text-[#F58220]",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-black/[0.04] px-2 pb-2 pt-1">
                    <span className="mb-2 ml-1.5 block h-px w-8 bg-[#F58220]" />
                    <ul className="space-y-0.5">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="group flex items-center gap-2 rounded-[10px] px-2 py-2 transition-colors hover:bg-[rgba(255,170,40,0.08)]"
                          >
                            <Mountain className="size-3.5 shrink-0 text-[#C5CDD8] group-hover:text-[#F58220]" />
                            <span className="min-w-0 flex-1 text-[12.5px] font-medium text-[#3a4556] group-hover:text-[#F58220]">
                              {link.title}
                            </span>
                            <span className="shrink-0 rounded-full bg-[rgba(216,167,60,0.16)] px-2 py-0.5 text-[10px] font-semibold text-[#9a6f18]">
                              {link.duration}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
      <Link
        href="/trekking"
        onClick={onClose}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#F58220] px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white"
      >
        View All Treks
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}
