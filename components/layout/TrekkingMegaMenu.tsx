"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { trekkingColumns, type TrekkingColumn } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

interface TrekkingMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

const difficultyTone: Record<
  TrekkingColumn["links"][number]["difficulty"],
  string
> = {
  Easy: "bg-emerald-50 text-emerald-700",
  Moderate: "bg-sky-50 text-sky-700",
  Challenging: "bg-amber-50 text-amber-800",
  Strenuous: "bg-rose-50 text-rose-700",
};

function PackageCard({
  title,
  href,
  duration,
  difficulty,
  onClose,
}: {
  title: string;
  href: string;
  duration: string;
  difficulty: TrekkingColumn["links"][number]["difficulty"];
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="group flex items-center gap-3 rounded-[14px] border border-black/[0.05] bg-white/80 px-3.5 py-3 shadow-[0_1px_0_rgba(255,255,255,0.8)] transition-all duration-[220ms] ease-out hover:-translate-y-0.5 hover:border-[rgba(245,130,32,0.28)] hover:bg-white hover:shadow-[0_10px_28px_rgba(8,18,30,0.08)]"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold tracking-[0.01em] text-[#1a2433] transition-colors duration-[220ms] group-hover:text-[#F58220]">
          {title}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-[rgba(216,167,60,0.16)] px-2 py-0.5 text-[10px] font-semibold text-[#9a6f18]">
            {duration}
          </span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold",
              difficultyTone[difficulty],
            )}
          >
            {difficulty}
          </span>
        </div>
      </div>
      <ArrowRight
        className="size-3.5 shrink-0 text-[#D0D7E2] transition-all duration-[220ms] ease-out group-hover:translate-x-1 group-hover:text-[#F58220]"
        strokeWidth={2.25}
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="pointer-events-auto fixed left-1/2 top-[72px] z-[60] hidden w-[min(1040px,calc(100vw-2rem))] -translate-x-1/2 pt-2 xl:block"
          onMouseLeave={onClose}
        >
          <div
            className={cn(
              "flex h-[520px] max-h-[min(520px,calc(100vh-96px))] overflow-hidden rounded-[22px] p-6",
              "border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.95)]",
              "shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-[20px]",
            )}
          >
            {/* Left sidebar */}
            <aside className="flex w-[250px] shrink-0 flex-col overflow-hidden rounded-[16px] bg-[#0b1524]/[0.96] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="border-b border-white/10 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F58220]/90">
                  Regions
                </p>
                <p className="mt-0.5 text-[12px] font-medium text-white/55">
                  Trekking In Nepal
                </p>
              </div>
              <nav
                className="destinations-scroll flex-1 space-y-0.5 overflow-y-auto overscroll-contain px-2 py-2"
                aria-label="Trek regions"
              >
                {trekkingColumns.map((col) => {
                  const isActive = col.id === activeId;
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onMouseEnter={() => setActiveId(col.id)}
                      onFocus={() => setActiveId(col.id)}
                      className={cn(
                        "flex h-11 w-full items-center justify-between gap-2 rounded-[10px] px-3 text-left text-[13px] font-semibold tracking-[0.01em] transition-all duration-[220ms] ease-out",
                        isActive
                          ? "bg-gradient-to-r from-[#F58220] to-[#e07012] text-white shadow-[0_8px_20px_rgba(245,130,32,0.35)]"
                          : "text-white/75 hover:bg-[#F58220] hover:text-white",
                      )}
                    >
                      <span className="truncate">{col.heading}</span>
                      <ChevronRight
                        className={cn(
                          "size-3.5 shrink-0 transition-transform duration-[220ms]",
                          isActive ? "translate-x-0.5 opacity-100" : "opacity-40",
                        )}
                      />
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Right content */}
            <div className="flex min-w-0 flex-1 flex-col pl-5">
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <div className="mb-3.5 shrink-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F58220]">
                        {active.heading}
                      </p>
                      <p className="mt-1 text-[13px] text-[#5a6577]">
                        {active.subtitle}
                      </p>
                    </div>

                    <div className="destinations-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
                      <div className="grid grid-cols-2 gap-2.5">
                        {active.links.map((link) => (
                          <PackageCard
                            key={link.href}
                            title={link.title}
                            href={link.href}
                            duration={link.duration}
                            difficulty={link.difficulty}
                            onClose={onClose}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-3.5 flex shrink-0 items-center justify-between gap-3 border-t border-black/[0.06] pt-3.5">
                      <p className="text-[12.5px] font-medium text-[#4a5568]">
                        Need help choosing your trek?
                      </p>
                      <Link
                        href="/contact"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#F58220] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_20px_rgba(245,130,32,0.3)] transition-all duration-[220ms] hover:brightness-110"
                      >
                        Talk to our Trek Expert
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
                  <div className="space-y-1.5 border-t border-black/[0.04] px-2.5 pb-2.5 pt-2">
                    <p className="px-1 text-[11px] text-[#64748b]">{col.subtitle}</p>
                    {col.links.map((link) => (
                      <PackageCard
                        key={link.href}
                        title={link.title}
                        href={link.href}
                        duration={link.duration}
                        difficulty={link.difficulty}
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
