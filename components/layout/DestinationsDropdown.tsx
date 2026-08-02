"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { destinationNavItems } from "@/lib/data/destinations-nav";
import { cn } from "@/lib/utils";

interface DestinationsDropdownProps {
  open: boolean;
  onClose: () => void;
}

type DestinationsListProps = {
  onNavigate?: () => void;
  className?: string;
};

/** Shared slim destinations list — desktop dropdown + mobile panel */
export function DestinationsList({ onNavigate, className }: DestinationsListProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex flex-col gap-0.5", className)}>
      {destinationNavItems.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex h-[45px] items-center justify-between gap-2 rounded-[10px] px-2.5 text-[15px] font-semibold tracking-[0.2px] transition-all duration-[220ms] ease-out",
                active
                  ? "bg-[rgba(255,170,40,0.12)] text-[#F58220]"
                  : "text-[#243042] hover:bg-[rgba(255,170,40,0.08)] hover:text-[#F58220]",
              )}
            >
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              <ChevronRight
                className={cn(
                  "size-3.5 shrink-0 transition-transform duration-[220ms] ease-out",
                  active
                    ? "translate-x-1 text-[#F58220]"
                    : "text-[#C5CDD8] group-hover:translate-x-1 group-hover:text-[#F58220]",
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

const panelGlass =
  "destinations-scroll overflow-y-auto overscroll-contain rounded-[18px] border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.88)] shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-[22px]";

export function DestinationsDropdown({ open, onClose }: DestinationsDropdownProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute left-0 top-full z-50 mt-1 w-[260px] xl:w-[270px] 2xl:w-[290px]"
        >
          <div
            className={cn(
              panelGlass,
              "max-h-[300px] px-[14px] py-[10px] xl:max-h-[340px] 2xl:max-h-[380px]",
            )}
            style={{ scrollBehavior: "smooth" }}
          >
            <DestinationsList onNavigate={onClose} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Full-width slide-down panel for tablet / mobile menu */
export function DestinationsMobilePanel({
  open,
  onClose,
}: DestinationsDropdownProps) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div
            className={cn(
              panelGlass,
              "mb-2 w-full max-h-[300px] px-[14px] py-[10px] sm:max-h-[340px]",
            )}
            style={{ scrollBehavior: "smooth" }}
          >
            <DestinationsList onNavigate={onClose} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
