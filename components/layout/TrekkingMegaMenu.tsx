"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { trekkingColumns } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

interface TrekkingMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Same dark glass language as Destinations dropdown */
const panelDark =
  "overflow-hidden rounded-[14px] border border-white/25 bg-[rgba(8,18,30,0.47)] shadow-[0_22px_55px_rgba(0,0,0,0.22)] backdrop-blur-[28px] supports-[backdrop-filter]:bg-[rgba(8,18,30,0.43)]";

function PackageRow({
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
      className="group flex items-center justify-between gap-2 rounded-md px-2 py-1.5 transition-all duration-[180ms] ease-out hover:bg-white/[0.08]"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-bold tracking-[0.01em] text-white">
          {title}
        </span>
        <span className="mt-0.5 block text-[11.5px] font-medium text-white/45">
          {duration}
        </span>
      </span>
      <ChevronRight
        className="size-3.5 shrink-0 text-white/30 transition-all duration-[180ms] ease-out group-hover:translate-x-[3px] group-hover:text-[#D8A34A]"
        strokeWidth={2.25}
      />
    </Link>
  );
}

function RegionColumn({
  heading,
  href,
  links,
  onClose,
}: {
  heading: string;
  href: string;
  links: { title: string; href: string; duration: string }[];
  onClose: () => void;
}) {
  return (
    <div className="min-w-0">
      <Link
        href={href}
        onClick={onClose}
        className="group inline-flex items-center gap-1.5 px-2 pb-1"
      >
        <span className="text-[13.5px] font-bold tracking-[0.01em] text-[#D8A34A] transition-colors duration-[180ms] group-hover:text-[#E8C06A]">
          {heading}
        </span>
      </Link>
      <div className="mb-1 ml-2 h-px w-7 bg-[#D8A34A]/80" />
      <ul className="space-y-0.5">
        {links.map((link) => (
          <li key={link.href}>
            <PackageRow
              title={link.title}
              href={link.href}
              duration={link.duration}
              onClose={onClose}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrekkingMegaMenu({ open, onClose }: TrekkingMegaMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="pointer-events-auto fixed left-1/2 top-[48px] z-[60] hidden w-[min(980px,calc(100vw-2rem))] -translate-x-1/2 xl:block"
          onMouseLeave={onClose}
        >
          <div className={cn(panelDark, "px-4 py-2")}>
            <div className="grid grid-cols-4 gap-x-5 gap-y-2.5">
              {trekkingColumns.map((col) => (
                <RegionColumn
                  key={col.id}
                  heading={col.heading}
                  href={col.href}
                  links={col.links}
                  onClose={onClose}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Mobile accordion — Destinations dark style */
export function TrekkingMobileAccordion({ onClose }: { onClose: () => void }) {
  const [openId, setOpenId] = useState<string | null>(trekkingColumns[0]?.id ?? null);

  return (
    <div className={cn(panelDark, "mb-2")}>
      {trekkingColumns.map((col, index) => {
        const open = openId === col.id;
        return (
          <div
            key={col.id}
            className={cn(
              index < trekkingColumns.length - 1 && "border-b border-white/[0.08]",
            )}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-left"
              onClick={() => setOpenId((v) => (v === col.id ? null : col.id))}
              aria-expanded={open}
            >
              <span className="text-[13.5px] font-bold text-[#D8A34A]">
                {col.heading}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 text-white/40 transition-transform duration-[180ms]",
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
                  <ul className="space-y-0.5 px-2 pb-2.5">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <PackageRow
                          title={link.title}
                          href={link.href}
                          duration={link.duration}
                          onClose={onClose}
                        />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
