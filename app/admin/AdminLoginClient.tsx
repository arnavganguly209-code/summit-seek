"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock, Mountain, UserRound } from "lucide-react";

export default function AdminLoginClient() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }
      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#071018] px-4">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#071018]/55 via-[#071018]/75 to-[#071018]" />
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-20 top-10 size-[380px] rounded-full bg-[#F58220]/20 blur-[110px]"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-0 size-[420px] rounded-full bg-[#1d4ed8]/20 blur-[120px]"
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[440px] overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/logo-summit-seek-white.png"
            alt="Summit Seek"
            width={210}
            height={64}
            unoptimized
            className="h-14 w-auto object-contain"
          />
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#F58220]/35 bg-[#F58220]/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            <Mountain className="size-3.5" />
            Admin Control
          </div>
          <h1 className="mt-4 text-[1.55rem] font-bold tracking-tight text-white">
            Premium Admin Login
          </h1>
          <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/60">
            Manage packages, bookings, enquiries, hero, blog, and trip content for Summit Seek.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
              <UserRound className="size-3.5" />
              User ID
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="h-12 w-full rounded-xl border border-white/15 bg-black/35 px-4 text-[14px] text-white outline-none ring-[#F58220]/40 placeholder:text-white/30 focus:ring-2"
              placeholder="Enter user ID"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
              <Lock className="size-3.5" />
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="h-12 w-full rounded-xl border border-white/15 bg-black/35 px-4 text-[14px] text-white outline-none ring-[#F58220]/40 placeholder:text-white/30 focus:ring-2"
              placeholder="Enter password"
            />
          </label>

          {error ? (
            <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F58220] text-[14px] font-extrabold uppercase tracking-[0.08em] text-[#08121E] shadow-[0_16px_40px_rgba(245,130,32,0.35)] transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            {loading ? "Signing in…" : "Enter Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
