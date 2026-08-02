"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { KeyRound, Loader2 } from "lucide-react";

export default function OrbitLoginClient() {
  const router = useRouter();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/orbit/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Incorrect passkey. Access denied.");
        setLoading(false);
        return;
      }
      router.replace("/orbit/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#050b14] px-4">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 top-16 size-[420px] rounded-full bg-[#F58220]/20 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-20 bottom-10 size-[460px] rounded-full bg-[#2f9e44]/15 blur-[130px]"
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-[420px] rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/logo-summit-seek-white.png"
            alt="Summit Seek"
            width={200}
            height={60}
            unoptimized
            className="h-14 w-auto object-contain"
          />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
            Orbit CMS
          </p>
          <h1 className="mt-2 text-[22px] font-bold text-white">Secure Passkey Login</h1>
          <p className="mt-2 text-[13px] text-white/60">
            Enter your Orbit passkey to manage Summit Seek.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-white/70">
              Passkey
            </span>
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-3 py-3 focus-within:border-[#F58220]/60">
              <KeyRound className="size-4 text-white/50" />
              <input
                type="password"
                inputMode="numeric"
                autoComplete="current-password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/35"
                placeholder="Enter passkey"
                required
              />
            </div>
          </label>

          {error ? (
            <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F58220] to-[#d96d12] px-4 py-3 text-[14px] font-bold text-white shadow-[0_12px_30px_rgba(245,130,32,0.35)] transition hover:brightness-110 disabled:opacity-70"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            {loading ? "Verifying…" : "Enter Orbit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
