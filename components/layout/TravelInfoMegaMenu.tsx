"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Backpack,
  Bus,
  CalendarDays,
  FileText,
  HeartPulse,
  PhoneCall,
  ScrollText,
  ShieldCheck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  travelInfoGuides,
  type TravelInfoGuide,
} from "@/lib/data/travel-info-nav";
import { cn } from "@/lib/utils";

interface TravelInfoMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

const iconMap: Record<TravelInfoGuide["icon"], LucideIcon> = {
  visa: FileText,
  season: CalendarDays,
  permits: ScrollText,
  insurance: ShieldCheck,
  money: Wallet,
  health: HeartPulse,
  culture: Users,
  transport: Bus,
  packing: Backpack,
  emergency: PhoneCall,
};

function GuideRow({
  guide,
  index,
  onClose,
}: {
  guide: TravelInfoGuide;
  index: number;
  onClose: () => void;
}) {
  const Icon = iconMap[guide.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut", delay: index * 0.025 }}
    >
      <Link
        href={guide.href}
        onClick={onClose}
        className="group flex items-start gap-3.5 rounded-[16px] px-3 py-3 transition-all duration-[180ms] ease-out hover:-translate-y-0.5 hover:bg-black/[0.03] hover:shadow-[0_10px_28px_rgba(8,18,30,0.06)]"
      >
        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-white text-[#1A1A1A] shadow-[0_1px_0_rgba(255,255,255,0.8)] transition-colors duration-[180ms] group-hover:border-[rgba(216,163,74,0.35)] group-hover:text-[#D8A34A]">
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[16px] font-bold leading-snug tracking-[-0.01em] text-[#1A1A1A] xl:text-[18px]">
            {guide.title}
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-[#6B7280] xl:text-[14px]">
            {guide.description}
          </span>
        </span>
        <ArrowRight
          className="mt-1.5 size-4 shrink-0 text-[#C5CAD3] transition-all duration-[180ms] ease-out group-hover:translate-x-1 group-hover:text-[#D8A34A]"
          strokeWidth={2}
        />
      </Link>
    </motion.div>
  );
}

export function TravelInfoMegaMenu({ open, onClose }: TravelInfoMegaMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="pointer-events-auto fixed left-1/2 top-[72px] z-[60] hidden w-[min(980px,calc(100vw-2rem))] -translate-x-1/2 pt-2 xl:block"
          onMouseLeave={onClose}
        >
          <div
            className={cn(
              "max-h-[min(480px,calc(100vh-96px))] overflow-hidden rounded-[24px]",
              "border border-[rgba(255,255,255,0.45)] bg-[rgba(255,255,255,0.94)]",
              "shadow-[0_30px_80px_rgba(0,0,0,0.16)] backdrop-blur-[22px]",
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-6 border-b border-black/[0.06] px-7 py-5">
              <div className="min-w-0 max-w-2xl">
                <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#D8A34A]">
                  Travel Info
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[26px] font-bold leading-tight tracking-[-0.02em] text-[#1A1A1A] xl:text-[30px]">
                  Everything You Need Before Visiting Nepal
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#6B7280] xl:text-[16px]">
                  Important travel information, permits, culture, safety and
                  practical guides for your Nepal adventure.
                </p>
              </div>
              <Link
                href="/travel-guide"
                onClick={onClose}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#D8A34A] bg-white px-4 py-2.5 text-[12px] font-semibold tracking-[0.04em] text-[#1A1A1A] transition-all duration-[180ms] ease-out hover:bg-[#D8A34A] hover:text-white"
              >
                View All Guides
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Guides grid */}
            <div className="max-h-[min(320px,calc(100vh-260px))] overflow-y-auto overscroll-contain px-4 py-3 sm:px-5">
              <div className="grid grid-cols-1 gap-x-2 gap-y-0.5 sm:grid-cols-2">
                {travelInfoGuides.map((guide, index) => (
                  <GuideRow
                    key={guide.id}
                    guide={guide}
                    index={index}
                    onClose={onClose}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Mobile / tablet list for Travel Info */
export function TravelInfoMobilePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="mb-2 space-y-0.5 overflow-hidden rounded-[16px] border border-black/[0.06] bg-white px-2 py-2">
      {travelInfoGuides.map((guide, index) => (
        <GuideRow
          key={guide.id}
          guide={guide}
          index={index}
          onClose={onClose}
        />
      ))}
      <Link
        href="/travel-guide"
        onClick={onClose}
        className="mt-2 flex items-center justify-center gap-2 rounded-full border border-[#D8A34A] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#1A1A1A] transition-colors hover:bg-[#D8A34A] hover:text-white"
      >
        View All Guides
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}
