import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  CreditCard,
  Landmark,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import type { PaymentContent } from "@/types/payment-cms";

const methodIcons = [CreditCard, Wallet, Landmark, Banknote];

function Paras({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className={className}>
            {p}
          </p>
        ))}
    </>
  );
}

export function PaymentView({ content }: { content: PaymentContent }) {
  const methods = content.methods.filter((m) => m.visible !== false);
  const notes = content.notes.filter(Boolean);
  const important = content.importantNotes.filter(Boolean);

  return (
    <div className="relative bg-[#f3f6fb]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0b1524]/[0.045] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <section className="mx-auto max-w-3xl text-center">
          <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.24em] text-[#F58220]">
            {content.introEyebrow}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[1.75rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.25rem]">
            {content.introHeading}
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#F58220]" />
          <div className="mt-5 space-y-4">
            <Paras
              text={content.introBody}
              className="font-[family-name:var(--font-ui)] text-[15px] leading-[1.85] text-[#5a6577] sm:text-[16px]"
            />
          </div>
        </section>

        {content.noteText ? (
          <div className="mx-auto mt-8 max-w-3xl rounded-[1.25rem] border border-[#F58220]/35 bg-[#fff8f0] px-5 py-4 sm:px-6">
            <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
              Booking note
            </p>
            <p className="mt-2 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#4a5568]">
              {content.noteText}
            </p>
          </div>
        ) : null}

        <section className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-[family-name:var(--font-display)] text-[1.55rem] font-bold text-[#0b1524] sm:text-[1.85rem]">
              {content.methodsHeading}
            </h3>
            <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            {content.methodsIntro ? (
              <p className="mt-4 font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
                {content.methodsIntro}
              </p>
            ) : null}
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {methods.map((item, index) => {
              const Icon = methodIcons[index % methodIcons.length];
              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-[1.3rem] border border-[#e4eaf3] bg-white shadow-[0_12px_36px_rgba(8,18,30,0.055)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(8,18,30,0.09)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#dfe6f0]">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(145deg,#0b1524_0%,#1a3348_55%,#143028_100%)]">
                        <Icon className="size-10 text-white/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <h4 className="font-[family-name:var(--font-display)] text-[1.12rem] font-bold text-[#0b1524]">
                      {item.title}
                    </h4>
                    <p className="mt-2 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-[#5a6577]">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-3">
          {(
            [
              [content.chargesHeading, content.chargesBody],
              [content.securityHeading, content.securityBody],
              [content.privacyHeading, content.privacyBody],
            ] as const
          ).map(([heading, body]) => (
            <article
              key={heading}
              className="rounded-[1.3rem] border border-[#e4eaf3] bg-white p-5 sm:p-6"
            >
              <ShieldCheck className="size-5 text-[#F58220]" />
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-[#0b1524]">
                {heading}
              </h3>
              <div className="mt-3 space-y-2">
                <Paras
                  text={body}
                  className="font-[family-name:var(--font-ui)] text-[14px] leading-[1.75] text-[#5a6577]"
                />
              </div>
            </article>
          ))}
        </section>

        {notes.length > 0 ? (
          <section className="mt-12 rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] font-bold text-[#0b1524]">
              {content.notesHeading}
            </h3>
            <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            <ul className="mt-5 space-y-3">
              {notes.map((note, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#5a6577]"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#F58220]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-12 overflow-hidden rounded-[1.5rem] border border-[#e4eaf3] bg-[#0b1524] text-white shadow-[0_14px_40px_rgba(8,18,30,0.12)]">
          <div className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Landmark className="size-6 text-[#F58220]" />
              <h3 className="font-[family-name:var(--font-display)] text-[1.45rem] font-bold sm:text-[1.65rem]">
                {content.bankHeading}
              </h3>
            </div>
            {content.bankIntro ? (
              <p className="mt-3 max-w-2xl font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-white/70">
                {content.bankIntro}
              </p>
            ) : null}
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {content.bankFields.map((field) => (
                <div
                  key={field.id}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <dt className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.14em] text-[#F58220]">
                    {field.label}
                  </dt>
                  <dd className="mt-1 break-words font-[family-name:var(--font-ui)] text-[15px] font-semibold text-white">
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {important.length > 0 ? (
          <section className="mt-10 rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-[#0b1524]">
              {content.importantHeading}
            </h3>
            <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            <ul className="mt-5 space-y-3">
              {important.map((note, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#5a6577]"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#F58220]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-10 overflow-hidden rounded-[1.5rem] bg-[#0b1524] px-6 py-10 text-center sm:px-10 sm:py-12">
          <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] font-bold text-white sm:text-[1.7rem]">
            {content.ctaHeading}
          </h3>
          <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-white/70">
            {content.ctaBody}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={content.ctaPrimaryHref || "/contact"}
              className="inline-flex h-11 items-center rounded-xl bg-[#F58220] px-6 text-[14px] font-bold text-[#08121E] transition hover:brightness-110"
            >
              {content.ctaPrimaryLabel}
            </Link>
            <Link
              href={content.ctaSecondaryHref || "/terms"}
              className="inline-flex h-11 items-center rounded-xl border border-white/20 bg-white/5 px-5 text-[13px] font-semibold text-white transition hover:bg-white/10"
            >
              {content.ctaSecondaryLabel}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
