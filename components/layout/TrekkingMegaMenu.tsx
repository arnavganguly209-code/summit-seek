"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trekkingColumns } from "@/lib/data/navigation";

interface TrekkingMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function TrekkingMegaMenu({ open, onClose }: TrekkingMegaMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease }}
          className="absolute left-1/2 top-full z-50 mt-3 hidden w-[min(1300px,calc(100vw-2rem))] -translate-x-1/2 xl:block"
          onMouseLeave={onClose}
        >
          <div className="overflow-hidden rounded-2xl border border-[#e8ebf0] bg-white shadow-[0_28px_80px_rgba(8,18,30,0.16)]">
            <div className="border-b border-[#eef0f4] bg-[#F7F8FA] px-8 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D8A73C]">
                    Trekking In Nepal
                  </p>
                  <p className="mt-0.5 text-[13px] text-[#5c6575]">
                    Handpicked routes across every Himalayan region
                  </p>
                </div>
                <Link
                  href="/trekking"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D8A73C] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#08121E] transition-all duration-300 hover:bg-[#c49630]"
                >
                  All Treks
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-x-6 gap-y-8 px-8 py-7">
              {trekkingColumns.map((col) => (
                <div key={col.id} className="min-w-0">
                  <Link
                    href={col.href}
                    onClick={onClose}
                    className="group inline-flex items-center gap-1.5 text-[13px] font-bold text-[#08121E] transition-colors hover:text-[#D8A73C]"
                  >
                    {col.heading}
                    <ArrowRight className="size-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-[#D8A73C]" />
                  </Link>
                  <div className="mt-2.5 mb-3 h-px w-10 bg-gradient-to-r from-[#D8A73C] to-transparent" />
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="group flex items-start gap-1.5 text-[12.5px] leading-snug text-[#4a5260] transition-all duration-300 hover:translate-x-0.5 hover:text-[#D8A73C]"
                        >
                          <span className="mt-[0.35em] size-1 shrink-0 rounded-full bg-[#D8A73C]/0 transition-colors group-hover:bg-[#D8A73C]" />
                          <span>{link.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
