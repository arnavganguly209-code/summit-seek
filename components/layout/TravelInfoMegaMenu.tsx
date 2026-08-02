"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { travelInfoGuides } from "@/lib/data/travel-info-nav";
import { cn } from "@/lib/utils";

interface TravelInfoMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

function TravelInfoList({ onClose }: { onClose: () => void }) {
  return (
    <ul>
      {travelInfoGuides.map((guide, index) => (
        <li key={guide.id}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: "easeOut", delay: index * 0.02 }}
          >
            <Link
              href={guide.href}
              onClick={onClose}
              className={cn(
                "group flex items-center justify-between gap-3 px-[18px] py-[14px] text-[16px] font-semibold tracking-[-0.01em] text-[#1A1A1A]",
                "transition-all duration-[180ms] ease-out hover:-translate-y-0.5 hover:bg-black/[0.035]",
                index < travelInfoGuides.length - 1 &&
                  "border-b border-[rgba(0,0,0,0.06)]",
              )}
            >
              <span className="min-w-0 flex-1 truncate">{guide.title}</span>
              <ArrowRight
                className="size-3.5 shrink-0 text-[#C5CAD3] transition-all duration-[180ms] ease-out group-hover:translate-x-[5px] group-hover:text-[#D8A34A]"
                strokeWidth={2}
              />
            </Link>
          </motion.div>
        </li>
      ))}
    </ul>
  );
}

/** Simple premium dropdown under Travel Info — not a mega menu */
export function TravelInfoMegaMenu({ open, onClose }: TravelInfoMegaMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute left-0 top-full z-50 mt-1.5 w-[300px]"
        >
          <div
            className={cn(
              "overflow-hidden rounded-[16px]",
              "border border-[rgba(255,255,255,0.45)] bg-[rgba(255,255,255,0.90)]",
              "shadow-[0_20px_50px_rgba(0,0,0,0.14)] backdrop-blur-[18px]",
            )}
          >
            <TravelInfoList onClose={onClose} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Mobile panel — same 7 clean rows */
export function TravelInfoMobilePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="mb-2 overflow-hidden rounded-[16px] border border-black/[0.06] bg-[rgba(255,255,255,0.96)]">
      <TravelInfoList onClose={onClose} />
    </div>
  );
}
