"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mountain, Clock, Gauge, Star } from "lucide-react";
import type { Package } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface PackageCardProps {
  pkg: Package;
  variant?: "standard" | "editorial" | "compact" | "overlay";
  className?: string;
}

export function PackageCard({
  pkg,
  variant = "standard",
  className,
}: PackageCardProps) {
  if (variant === "editorial") {
    return (
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "group grid overflow-hidden rounded-2xl border border-border bg-snow shadow-[0_18px_50px_rgba(11,29,54,0.06)] lg:grid-cols-2",
          className,
        )}
      >
        <div className="relative min-h-[260px] overflow-hidden lg:min-h-[340px]">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 to-transparent" />
          <span className="absolute left-5 top-5 rounded-sm bg-snow/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-midnight">
            {pkg.region}
          </span>
        </div>
        <div className="flex flex-col justify-center p-7 md:p-10">
          <div className="mb-4 flex items-center gap-2 text-gold-dark">
            <Star className="size-4 fill-current" />
            <span className="text-sm font-bold">{pkg.rating}</span>
            <span className="text-sm text-slate">({pkg.reviews} reviews)</span>
          </div>
          <h3 className="font-display text-2xl font-semibold text-midnight md:text-3xl">
            <Link href={`/treks/${pkg.slug}`} className="hover:text-gold-dark transition-colors">
              {pkg.title}
            </Link>
          </h3>
          <p className="mt-3 text-slate leading-relaxed">{pkg.shortDescription}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-border py-4 text-center">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-light">Duration</dt>
              <dd className="mt-1 text-sm font-semibold text-midnight">{pkg.duration}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-light">Difficulty</dt>
              <dd className="mt-1 text-sm font-semibold text-midnight">{pkg.difficulty}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-light">Altitude</dt>
              <dd className="mt-1 text-sm font-semibold text-midnight">{pkg.altitude}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-2xl font-semibold text-midnight">
              {formatPrice(pkg.price, pkg.currency)}
              <span className="ml-1 text-sm font-sans font-medium text-slate">/ person</span>
            </p>
            <div className="flex gap-3">
              <Button href={`/treks/${pkg.slug}`} variant="outline" size="sm">
                View Details
              </Button>
              <Button href={`/contact?book=${pkg.slug}`} size="sm">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === "overlay") {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "group relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(6,16,24,0.35)]",
          className,
        )}
      >
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-deep via-midnight/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            {pkg.region}
          </span>
          <h3 className="mt-2 font-display text-2xl font-semibold text-snow">
            <Link href={`/treks/${pkg.slug}`}>{pkg.title}</Link>
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-snow/80">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-gold" /> {pkg.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Gauge className="size-3.5 text-gold" /> {pkg.difficulty}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mountain className="size-3.5 text-gold" /> {pkg.altitude}
            </span>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-snow/15 pt-4">
            <p className="font-display text-xl text-snow">
              {formatPrice(pkg.price, pkg.currency)}
            </p>
            <Button href={`/contact?book=${pkg.slug}`} size="sm">
              Book Now
            </Button>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/treks/${pkg.slug}`}
        className={cn(
          "group flex gap-4 rounded-xl border border-border bg-snow p-3 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_12px_30px_rgba(11,29,54,0.08)]",
          className,
        )}
      >
        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="112px"
          />
        </div>
        <div className="flex min-w-0 flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-dark">
            {pkg.region}
          </p>
          <h3 className="mt-1 truncate font-display text-lg font-semibold text-midnight">
            {pkg.title}
          </h3>
          <p className="mt-1 text-sm text-slate">
            {pkg.duration} · {formatPrice(pkg.price, pkg.currency)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-snow",
        "shadow-[0_14px_40px_rgba(11,29,54,0.05)]",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-gold/35 hover:shadow-[0_22px_55px_rgba(11,29,54,0.1)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-sm bg-midnight/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-snow">
            {pkg.region}
          </span>
          {pkg.luxury ? (
            <span className="rounded-sm bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-midnight">
              Luxury
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-sm bg-snow/95 px-2.5 py-1 text-xs font-bold text-midnight">
          <Star className="size-3.5 fill-gold text-gold" />
          {pkg.rating}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-xl font-semibold leading-snug text-midnight md:text-2xl">
          <Link href={`/treks/${pkg.slug}`} className="transition-colors hover:text-gold-dark">
            {pkg.title}
          </Link>
        </h3>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate">
          <li className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-gold-dark" />
            {pkg.duration}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Gauge className="size-3.5 text-gold-dark" />
            {pkg.difficulty}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Mountain className="size-3.5 text-gold-dark" />
            {pkg.altitude}
          </li>
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-5 mt-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-light">
              From
            </p>
            <p className="font-display text-2xl font-semibold text-midnight">
              {formatPrice(pkg.price, pkg.currency)}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button href={`/treks/${pkg.slug}`} variant="outline" size="sm">
              Details
            </Button>
            <Button href={`/contact?book=${pkg.slug}`} size="sm">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
