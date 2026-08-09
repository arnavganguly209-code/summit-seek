import Link from "next/link";
import { AlertTriangle, MapPin, Plane } from "lucide-react";
import type { NepalVisaContent } from "@/types/nepal-visa-cms";

function Paras({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((block, i) => {
          const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
          const isList = lines.every((l) => /^[-•*]/.test(l));
          if (isList) {
            return (
              <ul key={i} className="mt-3 space-y-2">
                {lines.map((line, j) => (
                  <li
                    key={j}
                    className="flex gap-3 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#5a6577]"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#F58220]" />
                    <span>{line.replace(/^[-•*]\s*/, "")}</span>
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className={className}>
              {block}
            </p>
          );
        })}
    </>
  );
}

export function NepalVisaView({ content }: { content: NepalVisaContent }) {
  const requirements = content.requirements.filter((r) => r.visible !== false);
  const fees = content.fees.filter((f) => f.visible !== false);
  const entryPoints = content.entryPoints.filter(Boolean);
  const notes = content.notes.filter(Boolean);

  return (
    <div className="relative bg-[#f3f6fb]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0b1524]/[0.045] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
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

        {content.alertText ? (
          <div className="mx-auto mt-8 flex max-w-3xl gap-3 rounded-[1.25rem] border border-amber-300/60 bg-[#fff8eb] px-4 py-4 sm:px-5">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <p className="font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a4a2a] sm:text-[14.5px]">
              {content.alertText}
            </p>
          </div>
        ) : null}

        <section className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] font-bold text-[#0b1524] sm:text-[1.75rem]">
              {content.requirementsHeading}
            </h3>
            <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            {content.requirementsIntro ? (
              <p className="mt-4 font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
                {content.requirementsIntro}
              </p>
            ) : null}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {requirements.map((item, index) => (
              <article
                key={item.id}
                className="rounded-[1.25rem] border border-[#e4eaf3] bg-white p-5 shadow-[0_10px_28px_rgba(8,18,30,0.045)]"
              >
                <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#F58220] px-2 font-[family-name:var(--font-ui)] text-[12px] font-bold text-[#08121E]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-3 font-[family-name:var(--font-display)] text-[1.08rem] font-bold text-[#0b1524]">
                  {item.title}
                </h4>
                <p className="mt-2 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-[#5a6577]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] font-bold text-[#0b1524] sm:text-[1.75rem]">
              {content.feesHeading}
            </h3>
            <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            {content.feesIntro ? (
              <p className="mt-4 font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
                {content.feesIntro}
              </p>
            ) : null}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fees.map((fee) => (
              <article
                key={fee.id}
                className="overflow-hidden rounded-[1.3rem] border border-[#e4eaf3] bg-white text-center shadow-[0_12px_32px_rgba(8,18,30,0.05)]"
              >
                <div className="bg-[#0b1524] px-4 py-5">
                  <p className="font-[family-name:var(--font-ui)] text-[12px] font-semibold uppercase tracking-[0.12em] text-white/65">
                    {fee.label}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-[1.85rem] font-bold text-[#F58220]">
                    {fee.price}
                  </p>
                </div>
                {fee.note ? (
                  <p className="px-4 py-4 font-[family-name:var(--font-ui)] text-[13px] leading-relaxed text-[#5a6577]">
                    {fee.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {entryPoints.length > 0 ? (
          <section className="mt-14 rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
            <div className="flex items-center gap-2">
              <Plane className="size-5 text-[#F58220]" />
              <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-[#0b1524]">
                {content.entryPointsHeading}
              </h3>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {entryPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-[#eef2f7] bg-[#f8fafc] px-4 py-3 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-[#4a5568]"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[#F58220]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[1.35rem] border border-[#e4eaf3] bg-white p-5 sm:p-7">
            <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold text-[#0b1524]">
              {content.extensionHeading}
            </h3>
            <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            <div className="mt-4 space-y-3">
              <Paras
                text={content.extensionBody}
                className="font-[family-name:var(--font-ui)] text-[14.5px] leading-[1.8] text-[#5a6577]"
              />
            </div>
          </article>
          <article className="rounded-[1.35rem] border border-[#e4eaf3] bg-white p-5 sm:p-7">
            <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold text-[#0b1524]">
              {content.transitHeading}
            </h3>
            <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            <div className="mt-4 space-y-3">
              <Paras
                text={content.transitBody}
                className="font-[family-name:var(--font-ui)] text-[14.5px] leading-[1.8] text-[#5a6577]"
              />
            </div>
            {content.addressHeading ? (
              <div className="mt-6 border-t border-[#eef2f7] pt-5">
                <h4 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold text-[#0b1524]">
                  {content.addressHeading}
                </h4>
                <div className="mt-3 space-y-3">
                  <Paras
                    text={content.addressBody}
                    className="font-[family-name:var(--font-ui)] text-[14px] leading-[1.75] text-[#5a6577]"
                  />
                </div>
              </div>
            ) : null}
          </article>
        </section>

        {notes.length > 0 ? (
          <section className="mt-10 rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-[#0b1524]">
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

        <section className="mt-10 overflow-hidden rounded-[1.5rem] bg-[#0b1524] px-6 py-10 text-center sm:px-10 sm:py-12">
          <h3 className="font-[family-name:var(--font-display)] text-[1.45rem] font-bold text-white sm:text-[1.65rem]">
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
              href={content.ctaSecondaryHref || "/travel-guide/permits-tims"}
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
