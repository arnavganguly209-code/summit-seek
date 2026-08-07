"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { companyNavItems } from "@/lib/data/company-nav";
import { cn } from "@/lib/utils";

interface CompanyDropdownProps {
  open: boolean;
  onClose: () => void;
}

const panelDark =
  "overflow-hidden rounded-[14px] border border-white/25 bg-[rgba(8,18,30,0.47)] shadow-[0_22px_55px_rgba(0,0,0,0.22)] backdrop-blur-[28px] supports-[backdrop-filter]:bg-[rgba(8,18,30,0.43)]";

function CompanyList({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col">
      {companyNavItems.map((item, index) => {
        const pathOnly = item.href.split("#")[0];
        const active =
          pathname === pathOnly ||
          (pathOnly !== "/" && pathname.startsWith(`${pathOnly}/`));

        return (
          <li key={item.id}>
            <Link
              href={item.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex h-9 items-center justify-between gap-2 px-3.5 text-[13.5px] font-bold tracking-[0.01em] text-white transition-all duration-[180ms] ease-out hover:bg-white/[0.08]",
                active && "bg-white/[0.1]",
                index < companyNavItems.length - 1 &&
                  "border-b border-white/[0.08]",
              )}
            >
              <span className="min-w-0 flex-1 truncate">{item.title}</span>
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

export function CompanyDropdown({ open, onClose }: CompanyDropdownProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute left-0 top-full z-50 mt-0 w-[268px]"
        >
          <div className={cn(panelDark, "py-2")}>
            <CompanyList onClose={onClose} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function CompanyMobilePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className={cn(panelDark, "mb-2 w-full py-1.5")}>
      <CompanyList onClose={onClose} />
    </div>
  );
}
