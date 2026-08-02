"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Mountain } from "lucide-react";
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

/** Shared compact destinations list — used by desktop dropdown + mobile panel */
export function DestinationsList({ onNavigate, className }: DestinationsListProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("py-1.5", className)}>
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
                "group flex h-[50px] items-center gap-3 px-[22px] text-[16px] font-semibold tracking-[-0.01em] transition-all duration-[250ms] ease-out",
                active
                  ? "bg-[rgba(245,130,32,0.12)] text-[#F58220]"
                  : "text-[#1E293B] hover:bg-[rgba(245,130,32,0.08)] hover:text-[#F58220]",
              )}
            >
              <Mountain
                className={cn(
                  "size-[18px] shrink-0 transition-colors duration-[250ms]",
                  active
                    ? "text-[#F58220]"
                    : "text-[#94A3B8] group-hover:text-[#F58220]",
                )}
                strokeWidth={1.75}
              />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              <ChevronRight
                className={cn(
                  "size-4 shrink-0 transition-all duration-[250ms] ease-out",
                  active
                    ? "translate-x-0.5 text-[#F58220]"
                    : "text-[#CBD5E1] group-hover:translate-x-0.5 group-hover:text-[#F58220]",
                )}
                strokeWidth={2}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function DestinationsDropdown({ open, onClose }: DestinationsDropdownProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute left-0 top-full z-50 mt-1.5 w-[300px] lg:w-[320px]"
        >
          <div
            className={cn(
              "destinations-scroll overflow-y-auto overscroll-contain rounded-[18px] border border-black/[0.06]",
              "bg-[rgba(255,255,255,0.96)] shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-[18px]",
              "max-h-[300px] xl:max-h-[360px] 2xl:max-h-[420px]",
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
              "destinations-scroll mx-0 mb-2 max-h-[300px] overflow-y-auto overscroll-contain rounded-[18px] border border-black/[0.06]",
              "bg-[rgba(255,255,255,0.96)] shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-[18px]",
              "w-full sm:max-h-[360px]",
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
