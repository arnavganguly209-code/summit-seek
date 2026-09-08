"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  Mountain,
  Compass,
  Headphones,
  Star,
  MapPin,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { HeroContent, HeroFeatureIcon } from "@/types/hero";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<HeroFeatureIcon, typeof Shield> = {
  shield: Shield,
  mountain: Mountain,
  compass: Compass,
  headset: Headphones,
};

type SearchResult = {
  href: string;
  label: string;
  group: string;
  price: number | null;
  durationLabel: string;
  imageUrl: string;
};

type Props = {
  content: HeroContent;
  preview?: boolean;
};

export function Hero({ content, preview = false }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [panelStyle, setPanelStyle] = useState<CSSProperties | null>(null);
  const [mounted, setMounted] = useState(false);

  const showPanel = open && query.trim().length > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        const t = e.target as HTMLElement | null;
        if (t?.closest?.("[data-hero-search-panel]")) return;
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (!showPanel) {
      setPanelStyle(null);
      return;
    }
    const place = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setPanelStyle({
        position: "fixed",
        left: Math.max(12, r.left),
        width: Math.min(r.width, window.innerWidth - 24),
        top: r.bottom + 8,
        zIndex: 9999,
      });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [showPanel, query, results.length, loading]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 1) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const res = await fetch(`/api/packages/search?q=${encodeURIComponent(q)}`);
          const data = (await res.json()) as {
            ok?: boolean;
            results?: SearchResult[];
          };
          setResults(data.results || []);
          setOpen(true);
        } catch {
          setResults([]);
        } finally {
          setLoading(false);
        }
      })();
    }, 220);

    return () => window.clearTimeout(timer);
  }, [query]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const first = results[0];
    if (first) {
      router.push(first.href);
      setOpen(false);
      return;
    }
    if (query.trim()) {
      router.push(`/packages?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const lineAnim = content.headlineAnimation && !preview;

  const emptyHint = useMemo(
    () => (loading ? "Searching packages…" : "No matching packages found."),
    [loading],
  );

  if (!content.visible) return null;

  return (
    <section
      className={cn(
        "relative isolate h-[100svh] min-h-[640px] w-full overflow-x-hidden bg-[#050b14]",
        showPanel ? "z-[70]" : "z-0",
      )}
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

          <div ref={wrapRef} className="relative mt-8 w-full max-w-[640px]">
            <form
              onSubmit={onSearch}
              className="flex w-full items-center gap-2 rounded-full border border-white/25 bg-white/95 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-2"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 pl-3 sm:pl-4">
                <Search className="size-4 shrink-0 text-[#6b7280] sm:size-5" aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => query.trim() && setOpen(true)}
                  placeholder={content.searchPlaceholder}
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-[14px] text-[#111827] outline-none placeholder:text-[#9ca3af] sm:text-[15px]"
                  aria-label={content.searchPlaceholder}
                  autoComplete="off"
                />
                {loading ? <Loader2 className="size-4 animate-spin text-[#6b7280]" /> : null}
              </div>
              <button
                type="submit"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#2f9e44] text-white shadow-[0_8px_20px_rgba(47,158,68,0.35)] transition hover:brightness-110 sm:size-12"
                aria-label={content.searchButtonLabel}
              >
                <Search className="size-5" />
              </button>
            </form>

            {mounted && showPanel && panelStyle
              ? createPortal(
                  <div
                    data-hero-search-panel
                    style={panelStyle}
                    className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_28px_70px_rgba(8,18,30,0.35)]"
                  >
                    <div className="max-h-[min(420px,52vh)] overflow-auto overscroll-contain">
                      {results.length === 0 ? (
                        <p className="px-4 py-5 text-left text-[13px] text-[#6b7585]">
                          {emptyHint}
                        </p>
                      ) : (
                        <ul className="divide-y divide-[#eef2f7]">
                          {results.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-left transition hover:bg-[#f5f8fc]"
                              >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0b1524]/06 text-[#0b1524]">
                                  <MapPin className="size-4" />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-[14px] font-bold text-[#0b1524]">
                                    {item.label}
                                  </span>
                                  <span className="mt-0.5 block text-[12px] text-[#6b7585]">
                                    {item.group}
                                    {item.durationLabel ? ` · ${item.durationLabel}` : ""}
                                  </span>
                                </span>
                                {item.price != null ? (
                                  <span className="shrink-0 text-[13px] font-extrabold text-[#16a34a]">
                                    US${item.price.toLocaleString("en-US")}
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>,
                  document.body,
                )
              : null}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-[1] hidden sm:block">
          <div className="border-t border-white/15 bg-white/[0.08] backdrop-blur-xl">
            <div className="mx-auto grid max-w-[1280px] grid-cols-1 divide-y divide-white/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {content.features.map((feature) => {
                const Icon = iconMap[feature.icon] || Shield;
                return (
                  <div
                    key={feature.id}
                    className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5"
                  >
                    <motion.div
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10"
                      animate={preview ? undefined : { y: [0, -2, 0] }}
                      transition={
                        preview
                          ? undefined
                          : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                      }
                    >
                      <Icon className="size-4 text-white" strokeWidth={1.75} />
                    </motion.div>
                    <div className="min-w-0 text-left">
                      <p className="text-[13px] font-semibold leading-tight text-white sm:text-[14px]">
                        {feature.title}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-white/75 sm:text-[12px]">
                        {feature.subtitle}
                      </p>
                      {feature.showStars ? (
                        <div className="mt-1 flex gap-0.5" aria-hidden>
                          {Array.from({ length: 4 }).map((_, i) => (
                            <Star
                              key={i}
                              className="size-2.5 fill-[#F4A623] text-[#F4A623]"
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
