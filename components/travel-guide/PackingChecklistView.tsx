import Link from "next/link";
import { AlertTriangle, Backpack, CheckCircle2 } from "lucide-react";
import type { PackingChecklistContent } from "@/types/packing-checklist-cms";

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

export function PackingChecklistView({ content }: { content: PackingChecklistContent }) {
  const categories = content.categories.filter((c) => c.visible !== false);
  const tips = content.tips.filter(Boolean);
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
              {content.categoriesHeading}
            </h3>
            <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            {content.categoriesIntro ? (
              <p className="mt-4 font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
                {content.categoriesIntro}
              </p>
            ) : null}
          </div>
          <div className="mt-8 space-y-4">
            {categories.map((cat, index) => (
              <article
                key={cat.id}
                className="rounded-[1.35rem] border border-[#e4eaf3] bg-white p-5 shadow-[0_10px_28px_rgba(8,18,30,0.045)] sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff4e8] text-[#F58220]">
                    <Backpack className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-wide text-[#8a94a6]">
                      Category {String(index + 1).padStart(2, "0")}
                    </p>
                    <h4 className="mt-1 font-[family-name:var(--font-display)] text-[1.2rem] font-bold text-[#0b1524]">
                      {cat.title}
                    </h4>
                    {cat.description ? (
                      <p className="mt-1.5 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-[#5a6577]">
                        {cat.description}
                      </p>
                    ) : null}
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {cat.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 rounded-xl border border-[#eef2f8] bg-[#f8fafc] px-3 py-2.5 font-[family-name:var(--font-ui)] text-[13.5px] leading-snug text-[#3d4656]"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#F58220]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {tips.length > 0 ? (
          <section className="mt-10 rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-[#0b1524]">
              {content.tipsHeading}
            </h3>
            <div className="mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            <ul className="mt-5 space-y-3">
              {tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#5a6577]"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#F58220]" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {notes.length > 0 ? (
          <section className="mt-10 rounded-[1.4rem] border border-[#e4eaf3] bg-[#0b1524] p-5 text-white sm:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold">
              {content.notesHeading}
            </h3>
            <ul className="mt-4 space-y-3">
              {notes.map((note, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-white/70"
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
              href={content.ctaSecondaryHref || "/travel-guide/best-time-to-visit"}
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
