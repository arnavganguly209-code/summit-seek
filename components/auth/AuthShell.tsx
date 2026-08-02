"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#07111f] px-4 pb-16 pt-24">
      {/* Animated mountain atmosphere */}
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
          className="absolute -left-20 top-10 h-[420px] w-[420px] rounded-full bg-[#2563eb]/25 blur-[110px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-0 h-[480px] w-[480px] rounded-full bg-[#38bdf8]/18 blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, -35, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <svg
          className="absolute bottom-0 left-0 w-full opacity-90"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 160 L180 110 L320 150 L480 80 L640 130 L820 70 L1000 120 L1180 60 L1440 110 L1440 220 L0 220 Z"
            fill="#0b1a2e"
            animate={{ d: [
              "M0 160 L180 110 L320 150 L480 80 L640 130 L820 70 L1000 120 L1180 60 L1440 110 L1440 220 L0 220 Z",
              "M0 150 L180 120 L320 140 L480 90 L640 120 L820 80 L1000 110 L1180 70 L1440 100 L1440 220 L0 220 Z",
              "M0 160 L180 110 L320 150 L480 80 L640 130 L820 70 L1000 120 L1180 60 L1440 110 L1440 220 L0 220 Z",
            ]}}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-[480px]"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <Link href="/" className="bg-transparent">
            <Image
              src="/logo-summit-seek-white.png"
              alt="Summit Seek"
              width={220}
              height={66}
              unoptimized
              className="h-14 w-auto bg-transparent object-contain"
            />
          </Link>
          <h1 className="mt-5 text-[26px] font-bold tracking-tight text-white">{title}</h1>
          <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/65">{subtitle}</p>
        </div>

        <div className="rounded-3xl border border-white/12 bg-white/[0.07] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
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
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-white/70">{label}</span>
      {children}
    </label>
  );
}

export const authInputClass =
  "w-full rounded-xl border border-white/15 bg-black/30 px-3.5 py-3 text-[14px] text-white outline-none transition placeholder:text-white/35 focus:border-[#38bdf8]/55";
