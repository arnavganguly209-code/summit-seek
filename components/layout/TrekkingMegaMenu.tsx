"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { trekkingColumns } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

interface TrekkingMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

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
      className="group flex items-baseline justify-between gap-3 rounded-lg py-1.5 transition-all duration-200 ease-out hover:-translate-y-0.5"
    >
      <span className="min-w-0">
        <span className="block text-[15px] font-medium leading-snug tracking-[-0.01em] text-[#1A1A1A] transition-colors duration-200 group-hover:text-[#111111] xl:text-[16px]">
          {title}
        </span>
        <span className="mt-0.5 inline-flex items-center gap-1 text-[13px] text-[#6B7280]">
          {duration}
          <ArrowRight
            className="size-3 text-[#C5CAD3] transition-all duration-200 ease-out group-hover:translate-x-[5px] group-hover:text-[#D8A34A]"
            strokeWidth={2}
          />
        </span>
      </span>
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
        className="group inline-flex flex-col"
      >
        <span className="text-[18px] font-bold leading-tight tracking-[-0.02em] text-[#1A1A1A] transition-colors duration-200 group-hover:text-[#111111] xl:text-[20px] 2xl:text-[22px]">
          {heading}
        </span>
        <span className="mt-2 h-px w-8 bg-[#D8A34A] transition-all duration-200 group-hover:w-11" />
      </Link>
      <ul className="mt-3.5 space-y-1">
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="pointer-events-auto fixed left-1/2 top-[72px] z-[60] hidden w-[min(1100px,calc(100vw-2rem))] -translate-x-1/2 pt-2 xl:block"
          onMouseLeave={onClose}
        >
          <div
            className={cn(
              "destinations-scroll max-h-[min(520px,calc(100vh-96px))] overflow-y-auto overscroll-contain rounded-[24px] px-7 py-6",
              "border border-[rgba(255,255,255,0.45)] bg-[rgba(255,255,255,0.94)]",
              "shadow-[0_30px_80px_rgba(0,0,0,0.16)] backdrop-blur-[24px]",
            )}
          >
            <div className="grid grid-cols-4 gap-x-8 gap-y-8">
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

/** Compact mobile accordion — same quiet list language */
export function TrekkingMobileAccordion({ onClose }: { onClose: () => void }) {
  const [openId, setOpenId] = useState<string | null>(trekkingColumns[0]?.id ?? null);

  return (
    <div className="mb-2 space-y-1">
      {trekkingColumns.map((col) => {
        const open = openId === col.id;
        return (
          <div
            key={col.id}
            className="overflow-hidden rounded-[14px] border border-black/[0.06] bg-white"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left"
              onClick={() => setOpenId((v) => (v === col.id ? null : col.id))}
              aria-expanded={open}
            >
              <span className="text-[15px] font-bold text-[#1A1A1A]">{col.heading}</span>
              <ChevronDown
                className={cn(
                  "size-4 text-[#9CA3AF] transition-transform duration-200",
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
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-0.5 border-t border-black/[0.05] px-3.5 pb-3 pt-2">
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
