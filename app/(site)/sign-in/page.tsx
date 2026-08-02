"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthField, AuthShell, authInputClass } from "@/components/auth/AuthShell";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // Customer auth backend will be wired later
    window.setTimeout(() => {
      setLoading(false);
      setMessage("Account sign-in will be connected soon. Your details were received.");
    }, 700);
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage bookings, wishlists, and your Himalayan journey plans."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <AuthField label="Email">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={authInputClass}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </AuthField>

        <AuthField label="Password">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${authInputClass} pr-11`}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </AuthField>

        <div className="flex items-center justify-between text-[12px]">
          <label className="inline-flex items-center gap-2 text-white/65">
            <input type="checkbox" className="rounded border-white/30" />
            Remember me
          </label>
          <button type="button" className="font-medium text-[#7dd3fc] hover:underline">
            Forgot password?
          </button>
        </div>

        {message ? (
          <p className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-[13px] text-emerald-100">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] px-4 py-3.5 text-[14px] font-bold text-white shadow-[0_14px_34px_rgba(14,165,233,0.28)] transition hover:brightness-110 disabled:opacity-70"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {loading ? "Signing in…" : "Sign In"}
        </button>

        <p className="text-center text-[13px] text-white/60">
          New to Summit Seek?{" "}
          <Link href="/sign-up" className="font-semibold text-[#7dd3fc] hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
