import Link from "next/link";
import type { TermsContent } from "@/types/terms-cms";

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

export function TermsView({ content }: { content: TermsContent }) {
  const sections = content.sections.filter((s) => s.visible !== false);

  return (
    <div className="relative bg-[#f3f6fb]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0b1524]/[0.045] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[980px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <section className="mx-auto max-w-3xl text-center">
          <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.24em] text-[#F58220]">
            {content.introEyebrow}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[1.85rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.25rem]">
            {content.introHeading}
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#F58220]" />
          <div className="mt-5 space-y-4">
            <Paras
              text={content.introBody}
              className="font-[family-name:var(--font-ui)] text-[15.5px] leading-[1.85] text-[#5a6577] sm:text-[16px]"
            />
          </div>
        </section>

        <div className="mt-12 space-y-5">
          {sections.map((section, index) => (
            <article
              key={section.id}
              className="rounded-[1.35rem] border border-[#e4eaf3] bg-white p-5 shadow-[0_10px_28px_rgba(8,18,30,0.045)] sm:p-7"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-lg bg-[#F58220] px-2 font-[family-name:var(--font-ui)] text-[12px] font-bold text-[#08121E]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] font-bold text-[#0b1524] sm:text-[1.3rem]">
                    {section.title}
                  </h3>
                  <div className="mt-3 space-y-3">
                    <Paras
                      text={section.body}
                      className="font-[family-name:var(--font-ui)] text-[14.5px] leading-[1.8] text-[#5a6577]"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 overflow-hidden rounded-[1.5rem] bg-[#0b1524] px-6 py-10 text-center sm:px-10 sm:py-12">
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
              href={content.ctaSecondaryHref || "/payment"}
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
