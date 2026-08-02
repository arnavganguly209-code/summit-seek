"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { trekkingColumns } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

interface TrekkingMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

function PackageLink({
  title,
  href,
  duration,
  onClose,
}: {
  title: string;
  href: string;
  duration: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="group flex items-center gap-3 rounded-[18px] border border-black/[0.06] bg-white px-4 py-3.5 shadow-[0_4px_14px_rgba(8,18,30,0.04)] transition-all duration-[180ms] ease-out hover:border-[rgba(216,163,74,0.35)] hover:shadow-[0_8px_22px_rgba(8,18,30,0.07)]"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[16px] font-bold leading-snug tracking-[-0.01em] text-[#1A1A1A] xl:text-[18px]">
          {title}
        </p>
        <p className="mt-1 text-[14px] font-medium text-[#6B7280]">{duration}</p>
      </div>
      <ArrowRight
        className="size-4 shrink-0 text-[#C5CAD3] transition-all duration-[180ms] ease-out group-hover:translate-x-1 group-hover:text-[#D8A34A]"
        strokeWidth={2}
      />
    </Link>
  );
}

export function TrekkingMegaMenu({ open, onClose }: TrekkingMegaMenuProps) {
  const [activeId, setActiveId] = useState(trekkingColumns[0]?.id ?? "everest");
  const active =
    trekkingColumns.find((c) => c.id === activeId) ?? trekkingColumns[0];

  useEffect(() => {
    if (open) setActiveId(trekkingColumns[0]?.id ?? "everest");
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="pointer-events-auto fixed left-1/2 top-[72px] z-[60] hidden w-[min(1020px,calc(100vw-2rem))] -translate-x-1/2 pt-2 xl:block"
          onMouseLeave={onClose}
        >
          <div
            className={cn(
              "flex max-h-[min(540px,calc(100vh-96px))] overflow-hidden rounded-[24px]",
              "border border-[rgba(255,255,255,0.45)] bg-[rgba(255,255,255,0.93)]",
              "shadow-[0_35px_80px_rgba(0,0,0,0.18)] backdrop-blur-[22px]",
            )}
          >
            {/* Left — clean region list */}
            <nav
              className="w-[248px] shrink-0 overflow-y-auto overscroll-contain border-r border-black/[0.06] py-3 pl-3 pr-2"
              aria-label="Trek regions"
            >
              <ul className="space-y-0.5">
                {trekkingColumns.map((col) => {
                  const isActive = col.id === activeId;
                  return (
                    <li key={col.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveId(col.id)}
                        onFocus={() => setActiveId(col.id)}
                        className={cn(
                          "group relative flex w-full items-center rounded-xl py-2.5 pl-4 pr-3 text-left text-[16px] font-semibold tracking-[-0.01em] transition-all duration-[180ms] ease-out xl:text-[18px]",
                          isActive
                            ? "bg-black/[0.035] text-[#111111]"
                            : "text-[#1A1A1A] hover:bg-black/[0.03] hover:text-[#111111]",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-[#D8A34A] transition-opacity duration-[180ms]",
                            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                          )}
                          aria-hidden
                        />
                        <span className="truncate">{col.heading}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right — packages */}
            <div className="flex min-w-0 flex-1 flex-col px-5 py-4 sm:px-6">
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <div className="shrink-0">
                      <h3 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-[#1A1A1A] xl:text-[24px]">
                        {active.heading}
                      </h3>
                      <span
                        className="mt-2 block h-px w-10 bg-[#D8A34A]"
                        aria-hidden
                      />
                      <p className="mt-2 text-[14px] leading-relaxed text-[#6B7280] xl:text-[15px]">
                        {active.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-0.5">
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {active.links.map((link) => (
                          <PackageLink
                            key={link.href}
                            title={link.title}
                            href={link.href}
                            duration={link.duration}
                            onClose={onClose}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-black/[0.07] pt-3.5">
                      <p className="text-[14px] font-medium text-[#4B5563]">
                        Need help choosing the right trek?
                      </p>
                      <Link
                        href="/contact"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#D8A34A] bg-white px-4 py-2 text-[12px] font-semibold tracking-[0.02em] text-[#1A1A1A] transition-all duration-[180ms] ease-out hover:bg-[#D8A34A] hover:text-white"
                      >
                        Talk with our Trek Experts
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Accordion for tablet / mobile — same quiet luxury language */
export function TrekkingMobileAccordion({ onClose }: { onClose: () => void }) {
  const [openId, setOpenId] = useState<string | null>(trekkingColumns[0]?.id ?? null);

  return (
    <div className="mb-2 space-y-1">
      {trekkingColumns.map((col) => {
        const open = openId === col.id;
        return (
          <div
            key={col.id}
            className="overflow-hidden rounded-[16px] border border-black/[0.06] bg-white"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left"
              onClick={() => setOpenId((v) => (v === col.id ? null : col.id))}
              aria-expanded={open}
            >
              <span className="text-[15px] font-semibold text-[#1A1A1A]">
                {col.heading}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 text-[#9CA3AF] transition-transform duration-[180ms]",
                  open && "rotate-180 text-[#D8A34A]",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 border-t border-black/[0.05] px-2.5 pb-2.5 pt-2">
                    <p className="px-1 text-[13px] text-[#6B7280]">{col.subtitle}</p>
                    {col.links.map((link) => (
                      <PackageLink
                        key={link.href}
                        title={link.title}
                        href={link.href}
                        duration={link.duration}
                        onClose={onClose}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
      <Link
        href="/contact"
        onClick={onClose}
        className="mt-2 flex items-center justify-center gap-2 rounded-full border border-[#D8A34A] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#1A1A1A] transition-colors hover:bg-[#D8A34A] hover:text-white"
      >
        Talk with our Trek Experts
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}
