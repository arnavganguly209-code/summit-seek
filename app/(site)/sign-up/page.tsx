"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import {
  AuthField,
  AuthShell,
  COUNTRY_CODES,
  authInputClass,
} from "@/components/auth/AuthShell";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileCode, setMobileCode] = useState("+977");
  const [mobile, setMobile] = useState("");
  const [waSame, setWaSame] = useState(true);
  const [waCode, setWaCode] = useState("+977");
  const [whatsapp, setWhatsapp] = useState("");
  const [trekDetails, setTrekDetails] = useState("");
  const [people, setPeople] = useState("2");
  const [specialRequest, setSpecialRequest] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setMessage("Account registration will be connected soon. Your signup details were received.");
    }, 800);
  };

  return (
    <AuthShell
      wide
      title="Create your account"
      subtitle="Plan treks, save wishlists, and manage bookings with Summit Seek."
    >
      <form onSubmit={onSubmit} className="space-y-2.5">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <AuthField label="Full Name">
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={authInputClass}
              placeholder="Your full name"
              autoComplete="name"
            />
          </AuthField>
          <AuthField label="Email ID">
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
        </div>

        <AuthField label="Mobile Number">
          <div className="grid grid-cols-[96px_1fr] gap-2">
            <select
              value={mobileCode}
              onChange={(e) => setMobileCode(e.target.value)}
              className={authInputClass}
              aria-label="Mobile country code"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code} className="bg-[#0b1524] text-white">
                  {c.code}
                </option>
              ))}
            </select>
            <input
              required
              inputMode="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={authInputClass}
              placeholder="Mobile number"
              autoComplete="tel"
            />
          </div>
        </AuthField>

        <label className="inline-flex items-center gap-2 text-[12px] text-white/60">
          <input
            type="checkbox"
            checked={waSame}
            onChange={(e) => setWaSame(e.target.checked)}
            className="rounded border-white/30"
          />
          WhatsApp same as mobile
        </label>

        {!waSame ? (
          <AuthField label="WhatsApp Number">
            <div className="grid grid-cols-[96px_1fr] gap-2">
              <select
                value={waCode}
                onChange={(e) => setWaCode(e.target.value)}
                className={authInputClass}
                aria-label="WhatsApp country code"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={`wa-${c.code}`} value={c.code} className="bg-[#0b1524] text-white">
                    {c.code}
                  </option>
                ))}
              </select>
              <input
                required
                inputMode="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className={authInputClass}
                placeholder="WhatsApp number"
              />
            </div>
          </AuthField>
        ) : null}

        <div className="grid gap-2.5 sm:grid-cols-[1fr_120px]">
          <AuthField label="Trekking interest">
            <input
              required
              value={trekDetails}
              onChange={(e) => setTrekDetails(e.target.value)}
              className={authInputClass}
              placeholder="e.g. Everest Base Camp, Annapurna…"
            />
          </AuthField>
          <AuthField label="People">
            <select
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className={authInputClass}
            >
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map((n) => (
                <option key={n} value={n} className="bg-[#0b1524] text-white">
                  {n}
                </option>
              ))}
            </select>
          </AuthField>
        </div>

        <AuthField label="Special request (optional)">
          <input
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            className={authInputClass}
            placeholder="Dates, diet, private guide…"
          />
        </AuthField>

        <div className="grid gap-2.5 sm:grid-cols-2">
          <AuthField label="Password">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={authInputClass}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
            />
          </AuthField>
          <AuthField label="Confirm Password">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={authInputClass}
              placeholder="Confirm password"
              autoComplete="new-password"
            />
          </AuthField>
        </div>

        {error ? (
          <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[12.5px] text-red-200">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-[12.5px] text-emerald-100">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] px-4 py-3 text-[13.5px] font-bold text-white shadow-[0_12px_28px_rgba(14,165,233,0.28)] transition hover:brightness-110 disabled:opacity-70"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {loading ? "Creating account…" : "Sign Up"}
        </button>

        <p className="pt-0.5 text-center text-[12.5px] text-white/55">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-[#7dd3fc] hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
