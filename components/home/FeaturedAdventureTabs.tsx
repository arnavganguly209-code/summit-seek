"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gem, Medal, Mountain } from "lucide-react";
import { FeaturedPackageCard } from "@/components/packages/FeaturedPackageCard";
import type {
  FeaturedCategory,
  FeaturedPackagesContent,
  FeaturedTabIcon,
} from "@/types/featured-packages";
import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

/** Monochrome Nepal flag — uses currentColor to match tab text */
function NepalFlagIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      {/* Double-pennant Nepal flag silhouette */}
      <path d="M3.5 2.5v19h2.1v-8.2L19 13.3 8.8 8.2h9.5L5.6 2.5H3.5z" />
      {/* Moon + sun dots (lighter via cutout holes using evenodd) */}
      <circle cx="8.1" cy="5.8" r="1.05" fill="#f5f7fb" />
      <circle cx="8.1" cy="5.35" r="0.85" fill="currentColor" />
      <circle cx="9" cy="10.4" r="1.15" fill="#f5f7fb" />
    </svg>
  );
}

const iconMap: Record<FeaturedTabIcon, typeof Medal | typeof NepalFlagIcon> = {
  medal: Medal,
  mountain: Mountain,
  stupa: NepalFlagIcon,
  diamond: Gem,
};

type Props = {
  content: FeaturedPackagesContent;
};

export function FeaturedAdventureTabs({ content }: Props) {
  const categories = content.categories.filter((c) =>
    c.packages.some((p) => p.visible !== false),
  );
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const active: FeaturedCategory | undefined =
    categories.find((c) => c.id === activeId) ?? categories[0];

  const packages = (active?.packages ?? [])
    .filter((p) => p.visible !== false)
    .slice(0, 4);

  return (
    <section
      id="featured-adventures"
      className="relative overflow-hidden bg-[#f5f7fb] py-7 sm:py-8 lg:py-9"
      aria-labelledby="featured-adventures-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0b1524]/10 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-4 font-[family-name:var(--font-ui)] sm:px-6 lg:px-8">
        <div className="sr-only">
          <h2 id="featured-adventures-heading">Featured Adventures</h2>
        </div>

        <div
          role="tablist"
          aria-label="Adventure categories"
          className="flex gap-1 overflow-x-auto border-b border-[#dce2ec] pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Medal;
            const selected = cat.id === active?.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(cat.id)}
                className={cn(
                  "relative inline-flex shrink-0 items-center gap-2 px-3.5 py-3.5 text-[15px] font-extrabold tracking-[-0.015em] transition-colors sm:px-5 sm:text-[17px]",
                  selected
                    ? "text-[#0b1524]"
                    : "text-[#6b7587] hover:text-[#0b1524]",
                )}
              >
                <Icon
                  className={cn(
                    "size-[1.15rem] transition-colors sm:size-5",
                    cat.icon === "stupa"
                      ? selected
                        ? "text-[#0b1524]"
                        : "text-[#6b7587]"
                      : selected
                        ? "text-[#1d4ed8]"
                        : "text-[#9aa3b2]",
                  )}
                  strokeWidth={2.4}
                />
                <span className="whitespace-nowrap">{cat.label}</span>
                {selected ? (
                  <motion.span
                    layoutId="featured-tab-underline"
                    className="absolute inset-x-2 -bottom-px h-[2.5px] rounded-full bg-[#0b1524]"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id ?? "empty"}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mt-8 grid grid-cols-1 gap-5 sm:mt-9 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4"
          >
            {packages.map((pkg) => (
              <FeaturedPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
