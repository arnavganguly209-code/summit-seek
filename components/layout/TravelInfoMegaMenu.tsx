"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { travelInfoGuides } from "@/lib/data/travel-info-nav";
import { cn } from "@/lib/utils";

interface TravelInfoMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Same dark glass language as Destinations */
const panelDark =
  "overflow-hidden rounded-[14px] border border-white/25 bg-[rgba(8,18,30,0.47)] shadow-[0_22px_55px_rgba(0,0,0,0.22)] backdrop-blur-[28px] supports-[backdrop-filter]:bg-[rgba(8,18,30,0.43)]";

function TravelInfoList({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col">
      {travelInfoGuides.map((guide, index) => {
        const active =
          pathname === guide.href || pathname.startsWith(`${guide.href}/`);

        return (
          <li key={guide.id}>
            <Link
              href={guide.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex h-9 items-center justify-between gap-2 px-3.5 text-[13.5px] font-bold tracking-[0.01em] text-white transition-all duration-[180ms] ease-out hover:bg-white/[0.08]",
                active && "bg-white/[0.1] text-white",
                index < travelInfoGuides.length - 1 &&
                  "border-b border-white/[0.08]",
              )}
            >
              <span className="min-w-0 flex-1 truncate">{guide.title}</span>
              <ChevronRight
                className={cn(
                  "size-3.5 shrink-0 text-white/35 transition-all duration-[180ms] ease-out group-hover:translate-x-[3px] group-hover:text-[#D8A34A]",
                  active && "text-[#D8A34A]",
                )}
                strokeWidth={2.25}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Compact dropdown under Travel Info — Destinations style */
export function TravelInfoMegaMenu({ open, onClose }: TravelInfoMegaMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute left-0 top-full z-50 mt-0 w-[280px]"
        >
          <div className={cn(panelDark, "py-1.5")}>
            <TravelInfoList onClose={onClose} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Mobile panel — same Destinations dark list */
export function TravelInfoMobilePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className={cn(panelDark, "mb-2 w-full py-1.5")}>
      <TravelInfoList onClose={onClose} />
    </div>
  );
}
