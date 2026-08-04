"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AuthShell({
  children,
  title,
  subtitle,
  wide = false,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  wide?: boolean;
}) {
  return (
    <div className="relative flex min-h-svh items-start justify-center overflow-hidden bg-[#07111f] px-4 pb-8 pt-[4.75rem] sm:items-center sm:pb-10 sm:pt-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-[#07111f]/72" />
        <motion.div
          className="absolute -left-20 top-10 h-[320px] w-[320px] rounded-full bg-[#2563eb]/25 blur-[110px]"
          animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-0 h-[360px] w-[360px] rounded-full bg-[#38bdf8]/18 blur-[120px]"
          animate={{ x: [0, -32, 0], y: [0, -28, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <svg
          className="absolute bottom-0 left-0 w-full opacity-90"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0 110 L180 75 L320 100 L480 55 L640 90 L820 50 L1000 85 L1180 45 L1440 75 L1440 160 L0 160 Z"
            fill="#0b1a2e"
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn("relative z-10 w-full", wide ? "max-w-[640px]" : "max-w-[440px]")}
      >
        <div className="mb-4 flex flex-col items-center text-center sm:mb-5">
          <Link href="/" className="bg-transparent">
            <Image
              src="/logo-summit-seek-white.png"
              alt="Summit Seek"
              width={180}
              height={54}
              unoptimized
              className="h-10 w-auto bg-transparent object-contain sm:h-11"
            />
          </Link>
          <h1 className="mt-3 text-[22px] font-bold tracking-tight text-white sm:text-[24px]">
            {title}
          </h1>
          <p className="mt-1 max-w-md text-[12.5px] leading-snug text-white/60 sm:text-[13px]">
            {subtitle}
          </p>
        </div>

        <div className="rounded-2xl border border-white/12 bg-white/[0.07] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:rounded-3xl sm:p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export const COUNTRY_CODES = [
  { code: "+977", label: "Nepal (+977)" },
  { code: "+91", label: "India (+91)" },
  { code: "+1", label: "USA (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+81", label: "Japan (+81)" },
  { code: "+86", label: "China (+86)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+65", label: "Singapore (+65)" },
] as const;

export function AuthField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1 block text-[11.5px] font-medium text-white/65">{label}</span>
      {children}
    </label>
  );
}

export const authInputClass =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13.5px] text-white outline-none transition placeholder:text-white/35 focus:border-[#38bdf8]/55";
