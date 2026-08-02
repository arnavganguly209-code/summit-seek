"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  Mountain,
  Compass,
  Headphones,
  Star,
} from "lucide-react";
import type { HeroContent, HeroFeatureIcon } from "@/types/hero";

const ease = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<HeroFeatureIcon, typeof Shield> = {
  shield: Shield,
  mountain: Mountain,
  compass: Compass,
  headset: Headphones,
};

type Props = {
  content: HeroContent;
  preview?: boolean;
};

export function Hero({ content, preview = false }: Props) {
  const [query, setQuery] = useState("");

  if (!content.visible) return null;

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  const lineAnim = content.headlineAnimation && !preview;

  return (
    <section
      className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#050b14]"
      aria-label="Hero"
    >
      <video
        key={content.videoUrl}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster=""
        disablePictureInPicture
        disableRemotePlayback
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        <source
          src={
            content.videoUrl.includes("?")
              ? content.videoUrl
              : `${content.videoUrl}?v=1`
          }
          type="video/mp4"
        />
      </video>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `rgba(0,0,0,${content.overlayOpacity})` }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center px-5 pb-36 pt-24 text-center sm:px-8 sm:pb-40">
          <p className="text-[12px] font-medium tracking-[0.08em] text-white/90 sm:text-[13px]">
            {content.eyebrow}
          </p>

          <h1 className="mt-4 font-sans text-[2.35rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem]">
            {lineAnim ? (
              <>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease }}
                >
                  {content.headingLine1}
                </motion.span>
                <motion.span
                  className="mt-1 block"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease, delay: 0.22 }}
                >
                  {content.headingLine2}
                </motion.span>
              </>
            ) : (
              <>
                <span className="block">{content.headingLine1}</span>
                <span className="mt-1 block">{content.headingLine2}</span>
              </>
            )}
          </h1>

          {content.description ? (
            <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
              {content.description}
            </p>
          ) : null}

          <form
            onSubmit={onSearch}
            className="mt-8 flex w-full max-w-[640px] items-center gap-2 rounded-full border border-white/25 bg-white/95 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-2"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 pl-3 sm:pl-4">
              <Search className="size-4 shrink-0 text-[#6b7280] sm:size-5" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={content.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent py-2.5 text-[14px] text-[#111827] outline-none placeholder:text-[#9ca3af] sm:text-[15px]"
                aria-label={content.searchPlaceholder}
              />
            </div>
            <button
              type="submit"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#2f9e44] text-white shadow-[0_8px_20px_rgba(47,158,68,0.35)] transition hover:brightness-110 sm:size-12"
              aria-label={content.searchButtonLabel}
            >
              <Search className="size-5" />
            </button>
          </form>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="border-t border-white/15 bg-white/[0.08] backdrop-blur-xl">
            <div className="mx-auto grid max-w-[1280px] grid-cols-1 divide-y divide-white/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {content.features.map((feature) => {
                const Icon = iconMap[feature.icon] || Shield;
                return (
                  <div
                    key={feature.id}
                    className="flex items-start gap-3 px-5 py-5 sm:px-6 sm:py-6"
                  >
                    <motion.div
                      className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10"
                      animate={preview ? undefined : { y: [0, -3, 0] }}
                      transition={
                        preview
                          ? undefined
                          : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                      }
                    >
                      <Icon className="size-5 text-white" strokeWidth={1.75} />
                    </motion.div>
                    <div className="min-w-0 text-left">
                      <p className="text-[14px] font-semibold text-white sm:text-[15px]">
                        {feature.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-snug text-white/75 sm:text-[13px]">
                        {feature.subtitle}
                      </p>
                      {feature.showStars ? (
                        <div className="mt-2 flex gap-0.5" aria-hidden>
                          {Array.from({ length: 4 }).map((_, i) => (
                            <Star
                              key={i}
                              className="size-3 fill-[#F4A623] text-[#F4A623]"
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
