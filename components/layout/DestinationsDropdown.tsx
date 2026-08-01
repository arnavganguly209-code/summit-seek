"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { destinationNavItems } from "@/lib/data/destinations-nav";

interface DestinationsDropdownProps {
  open: boolean;
  onClose: () => void;
}

export function DestinationsDropdown({ open, onClose }: DestinationsDropdownProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-full z-50 mt-2 w-[320px]"
        >
          <div className="overflow-hidden rounded-[18px] border border-[#e8ebf0] bg-white p-5 shadow-[0_24px_60px_rgba(8,18,30,0.14)]">
            <ul className="space-y-1">
              {destinationNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group relative flex h-[52px] items-center rounded-xl pl-5 pr-4 text-[17px] font-semibold text-[#1E293B] transition-all duration-300 hover:bg-[#FFF8E7] hover:text-[#D4A017]"
                  >
                    <span className="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-[#D4A017] transition-all duration-300 group-hover:h-7" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
