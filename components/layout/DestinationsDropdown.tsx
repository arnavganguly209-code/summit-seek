"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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

/** Slim dark destinations list — all items fit, no scroll */
export function DestinationsList({ onNavigate, className }: DestinationsListProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex flex-col", className)}>
      {destinationNavItems.map((item, index) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-9 items-center px-3 text-[13.5px] font-bold tracking-[0.01em] text-white transition-all duration-[180ms] ease-out hover:bg-white/[0.08]",
                active && "bg-white/[0.1] text-white",
                index < destinationNavItems.length - 1 &&
                  "border-b border-white/[0.08]",
              )}
            >
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Dark frosted panel — matches hero-adjacent offer frame mood */
const panelDark =
  "overflow-hidden rounded-[14px] border border-white/25 bg-[rgba(8,18,30,0.32)] shadow-[0_22px_55px_rgba(0,0,0,0.18)] backdrop-blur-[28px] supports-[backdrop-filter]:bg-[rgba(8,18,30,0.28)]";

export function DestinationsDropdown({ open, onClose }: DestinationsDropdownProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute left-0 top-full z-50 mt-0 w-max"
        >
          <div className={cn(panelDark, "py-1.5")}>
            <DestinationsList onNavigate={onClose} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Mobile panel — same dark slim list, no inner scroll trap */
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
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className={cn(panelDark, "mb-2 w-full py-1.5")}>
            <DestinationsList onNavigate={onClose} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
