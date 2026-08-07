"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Clock3,
} from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/ui/SocialIcons";
import type { ContactPageContent } from "@/types/contact-cms";

const iconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
} as const;

const frame =
  "rounded-2xl border border-[#e6ebf2] bg-white p-6 shadow-[0_10px_40px_rgba(8,18,30,0.06)] sm:p-8";

export function ContactPageClient({ content }: { content: ContactPageContent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setDone("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setDone("Thank you. Your message was received — our team will reply soon.");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    }, 700);
  };

  const socials = content.socials.filter((s) => s.visible !== false);

  return (
    <div className="bg-[#f5f7fb]">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-6">
          <aside className={frame}>
            <h2 className="font-[family-name:var(--font-display)] text-[1.45rem] font-bold text-[#0b1524]">
              {content.detailsHeading}
            </h2>
            <p className="mt-2 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-[#5a6577]">
              {content.detailsIntro}
            </p>

            <ul className="mt-6 space-y-4 font-[family-name:var(--font-ui)]">
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0b1524]/05 text-[#0b1524]">
                  <MapPin className="size-4" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a94a6]">
                    {content.addressLabel}
                  </p>
                  <p className="mt-0.5 text-[14px] font-medium text-[#0b1524]">{content.address}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0b1524]/05 text-[#0b1524]">
                  <Mail className="size-4" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a94a6]">
                    {content.emailLabel}
                  </p>
                  <a
                    href={`mailto:${content.email}`}
                    className="mt-0.5 block text-[14px] font-medium text-[#1d4ed8] hover:underline"
                  >
                    {content.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0b1524]/05 text-[#0b1524]">
                  <Phone className="size-4" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a94a6]">
                    {content.phoneLabel}
                  </p>
                  <a
                    href={`tel:${content.phone}`}
                    className="mt-0.5 block text-[14px] font-bold text-[#0b1524] hover:text-[#1d4ed8]"
                  >
                    {content.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0b1524]/05 text-[#0b1524]">
                  <MessageCircle className="size-4" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a94a6]">
                    {content.whatsappLabel}
                  </p>
                  <a
                    href={`https://wa.me/${content.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 block text-[14px] font-medium text-[#0b1524] hover:text-[#1d4ed8]"
                  >
                    {content.whatsappDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0b1524]/05 text-[#0b1524]">
                  <Clock3 className="size-4" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a94a6]">
                    {content.hoursLabel}
                  </p>
                  <p className="mt-0.5 text-[14px] font-medium text-[#0b1524]">{content.hours}</p>
                </div>
              </li>
            </ul>

            {socials.length > 0 ? (
              <div className="mt-8 border-t border-[#eef1f6] pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a94a6]">
                  {content.socialHeading}
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {socials.map((s) => {
                    const key = s.id.toLowerCase() as keyof typeof iconMap;
                    const Icon = iconMap[key] || FacebookIcon;
                    return (
                      <Link
                        key={s.id}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-[#0b1524] transition hover:border-[#0b1524] hover:bg-[#0b1524] hover:text-white"
                      >
                        <Icon className="size-4" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </aside>

          <section className={frame}>
            <h2 className="font-[family-name:var(--font-display)] text-[1.45rem] font-bold text-[#0b1524]">
              {content.formHeading}
            </h2>
            <p className="mt-2 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-[#5a6577]">
              {content.formIntro}
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-3.5 font-[family-name:var(--font-ui)]">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[12px] font-semibold text-[#3d4656]">Full name</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[#d8dee8] bg-[#fbfcfe] px-3.5 py-2.5 text-[14px] text-[#0b1524] outline-none transition focus:border-[#2563eb]"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[12px] font-semibold text-[#3d4656]">Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#d8dee8] bg-[#fbfcfe] px-3.5 py-2.5 text-[14px] text-[#0b1524] outline-none transition focus:border-[#2563eb]"
                    placeholder="you@email.com"
                  />
                </label>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[12px] font-semibold text-[#3d4656]">Phone</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-[#d8dee8] bg-[#fbfcfe] px-3.5 py-2.5 text-[14px] text-[#0b1524] outline-none transition focus:border-[#2563eb]"
                    placeholder="+977…"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[12px] font-semibold text-[#3d4656]">Subject</span>
                  <input
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-[#d8dee8] bg-[#fbfcfe] px-3.5 py-2.5 text-[14px] text-[#0b1524] outline-none transition focus:border-[#2563eb]"
                    placeholder="Trek inquiry"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1 block text-[12px] font-semibold text-[#3d4656]">Message</span>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y rounded-xl border border-[#d8dee8] bg-[#fbfcfe] px-3.5 py-2.5 text-[14px] text-[#0b1524] outline-none transition focus:border-[#2563eb]"
                  placeholder="Dates, group size, preferred trek…"
                />
              </label>

              {error ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
                  {error}
                </p>
              ) : null}
              {done ? (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[13px] text-emerald-800">
                  {done}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0b1524] px-4 text-[14px] font-bold text-white transition hover:bg-[#152338] disabled:opacity-70 sm:w-auto sm:min-w-[180px]"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          </section>
        </div>

        <section className={`mt-6 ${frame}`}>
          <h2 className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-[#0b1524]">
            {content.mapHeading}
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-[#e6ebf2]">
            <iframe
              title="Summit Seek office map"
              src={content.mapEmbedUrl}
              className="h-[280px] w-full border-0 sm:h-[340px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      </div>
    </div>
  );
}
