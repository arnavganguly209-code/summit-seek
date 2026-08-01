"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Mountain, Calendar, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Difficulty = "Easy" | "Moderate" | "Challenging" | "Hard" | "Extreme";

interface PopularPackage {
  id: string;
  slug: string;
  title: string;
  duration: string;
  region: string;
  difficulty: Difficulty;
  price: number;
  image: string;
  popular?: boolean;
}

const packages: PopularPackage[] = [
  {
    id: "ptp-1",
    slug: "everest-base-camp",
    title: "Everest Base Camp Trek",
    duration: "14 Days",
    region: "Everest Region",
    difficulty: "Moderate",
    price: 1590,
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    popular: true,
  },
  {
    id: "ptp-2",
    slug: "annapurna-base-camp",
    title: "Annapurna Base Camp Trek",
    duration: "10 Days",
    region: "Annapurna",
    difficulty: "Moderate",
    price: 890,
    image:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=900&q=80",
    popular: true,
  },
  {
    id: "ptp-3",
    slug: "manaslu-circuit",
    title: "Manaslu Circuit Trek",
    duration: "16 Days",
    region: "Manaslu",
    difficulty: "Challenging",
    price: 1650,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ptp-4",
    slug: "langtang-valley",
    title: "Langtang Valley Trek",
    duration: "8 Days",
    region: "Langtang",
    difficulty: "Easy",
    price: 690,
    image:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ptp-5",
    slug: "three-passes",
    title: "Everest Three Pass Trek",
    duration: "18 Days",
    region: "Everest",
    difficulty: "Hard",
    price: 2050,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    popular: true,
  },
  {
    id: "ptp-6",
    slug: "gokyo-lakes",
    title: "Gokyo Lakes Trek",
    duration: "13 Days",
    region: "Everest",
    difficulty: "Moderate",
    price: 1350,
    image:
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ptp-7",
    slug: "annapurna-circuit",
    title: "Annapurna Circuit Trek",
    duration: "15 Days",
    region: "Annapurna",
    difficulty: "Moderate",
    price: 1250,
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ptp-8",
    slug: "upper-mustang",
    title: "Upper Mustang Trek",
    duration: "17 Days",
    region: "Mustang",
    difficulty: "Moderate",
    price: 2290,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ptp-9",
    slug: "upper-dolpo",
    title: "Upper Dolpo Trek",
    duration: "23 Days",
    region: "Dolpo",
    difficulty: "Extreme",
    price: 3990,
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ptp-10",
    slug: "kanchenjunga-bc",
    title: "Kanchenjunga Trek",
    duration: "21 Days",
    region: "Kanchenjunga",
    difficulty: "Hard",
    price: 2850,
    image:
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ptp-11",
    slug: "mardi-himal",
    title: "Mardi Himal Trek",
    duration: "5 Days",
    region: "Annapurna",
    difficulty: "Easy",
    price: 520,
    image:
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ptp-12",
    slug: "island-peak",
    title: "Island Peak Climbing",
    duration: "18 Days",
    region: "Everest",
    difficulty: "Extreme",
    price: 2950,
    image:
      "https://images.unsplash.com/photo-1434394354979-a235cd36269d?auto=format&fit=crop&w=900&q=80",
    popular: true,
  },
];

const difficultyStyle: Record<Difficulty, string> = {
  Easy: "text-[#2f9e5f]",
  Moderate: "text-[#e0892a]",
  Challenging: "text-[#d64545]",
  Hard: "text-[#d64545]",
  Extreme: "text-[#8b1e1e]",
};

function formatUsd(price: number) {
  return `US$ ${price.toLocaleString("en-US")}`;
}

function PopularPackageCard({ pkg }: { pkg: PopularPackage }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#e8ebf0] bg-white shadow-[0_14px_40px_rgba(8,18,30,0.06)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(8,18,30,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {pkg.popular ? (
          <span className="absolute left-3.5 top-3.5 rounded-full bg-[#D8A73C] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#08121E] shadow-[0_6px_16px_rgba(216,167,60,0.4)]">
            Popular
          </span>
        ) : null}

        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          onClick={() => setSaved((v) => !v)}
          className="absolute right-3.5 top-3.5 flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/90 text-[#08121E] shadow-[0_6px_16px_rgba(8,18,30,0.12)] backdrop-blur-sm transition-colors duration-300 hover:bg-white"
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              saved ? "fill-[#d64545] text-[#d64545]" : "text-[#08121E]",
            )}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-0.5 text-[#D8A73C]" aria-label="5 star rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
        </div>

        <h3 className="mt-2.5 font-[family-name:var(--font-display)] text-[1.15rem] font-bold leading-snug tracking-[-0.01em] text-[#08121E]">
          <Link
            href={`/treks/${pkg.slug}`}
            className="transition-colors duration-300 hover:text-[#D8A73C]"
          >
            {pkg.title}
          </Link>
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[12px] font-medium text-[#5a6577]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-[#D8A73C]" />
            {pkg.region}
          </span>
          <span className={cn("inline-flex items-center gap-1.5", difficultyStyle[pkg.difficulty])}>
            <Mountain className="size-3.5" />
            {pkg.difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5 text-[#D8A73C]" />
            {pkg.duration}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-[#D8A73C]">
            {formatUsd(pkg.price)}
          </p>
          <Link
            href={`/treks/${pkg.slug}`}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#D8A73C] px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#08121E] shadow-[0_8px_20px_rgba(216,167,60,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c49630] hover:shadow-[0_12px_28px_rgba(216,167,60,0.45)]"
          >
            View Details
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PopularTrekkingPackages() {
  return (
    <section
      id="popular-trekking"
      className="relative overflow-hidden bg-white py-[80px] sm:py-[100px] lg:py-[120px]"
      aria-labelledby="popular-trekking-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[700px] text-center">
          <p className="inline-flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#D8A73C]">
            <Mountain className="size-3.5" aria-hidden />
            Popular Trekking Packages
          </p>
          <h2
            id="popular-trekking-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-[1.85rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#08121E] sm:text-[2.35rem] lg:text-[2.65rem]"
          >
            Discover Nepal&apos;s Most Popular Adventures
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-[15px] leading-[1.75] text-[#5a6577] sm:text-[16px]">
            Our handpicked trekking experiences designed for unforgettable Himalayan journeys.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => (
            <PopularPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-14">
          <Link
            href="/trekking"
            className="inline-flex h-[54px] items-center gap-2.5 rounded-full bg-[#D8A73C] px-8 text-[13px] font-bold uppercase tracking-[0.12em] text-[#08121E] shadow-[0_14px_36px_rgba(216,167,60,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c49630] hover:shadow-[0_18px_44px_rgba(216,167,60,0.5)]"
          >
            View All Trekking Packages
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
