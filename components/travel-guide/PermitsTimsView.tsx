import Link from "next/link";
import { ClipboardList, Trees } from "lucide-react";
import type { PermitsTimsContent } from "@/types/permits-tims-cms";

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

export function PermitsTimsView({ content }: { content: PermitsTimsContent }) {
  const restricted = content.restrictedPermits.filter((r) => r.visible !== false);
  const parks = content.parkEntries.filter((p) => p.visible !== false);
  const notes = content.notes.filter(Boolean);

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

        <section className="mx-auto mt-10 max-w-3xl rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 shadow-[0_12px_32px_rgba(8,18,30,0.05)] sm:p-8">
          <div className="flex items-center gap-2">
            <ClipboardList className="size-5 text-[#F58220]" />
            <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] font-bold text-[#0b1524]">
              {content.timsHeading}
            </h3>
          </div>
          <div className="mt-4 space-y-3">
            <Paras
              text={content.timsBody}
              className="font-[family-name:var(--font-ui)] text-[14.5px] leading-[1.8] text-[#5a6577]"
            />
          </div>
        </section>

        <section className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] font-bold text-[#0b1524] sm:text-[1.75rem]">
              {content.restrictedHeading}
            </h3>
            <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            {content.restrictedIntro ? (
              <p className="mt-4 font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
                {content.restrictedIntro}
              </p>
            ) : null}
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.35rem] border border-[#e4eaf3] bg-white shadow-[0_12px_36px_rgba(8,18,30,0.05)]">
            <div className="hidden grid-cols-[1.2fr_1fr] gap-4 bg-[#0b1524] px-5 py-3 sm:grid">
              <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                Region
              </p>
              <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                Permit fee
              </p>
            </div>
            <ul className="divide-y divide-[#eef2f7]">
              {restricted.map((row) => (
                <li
                  key={row.id}
                  className="grid gap-2 px-4 py-4 sm:grid-cols-[1.2fr_1fr] sm:gap-4 sm:px-5"
                >
                  <p className="font-[family-name:var(--font-ui)] text-[14px] font-semibold leading-snug text-[#0b1524]">
                    {row.region}
                  </p>
                  <p className="font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a6577]">
                    {row.fee}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-[#0b1524]">
              <Trees className="size-5 text-[#F58220]" />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] font-bold text-[#0b1524] sm:text-[1.75rem]">
              {content.parksHeading}
            </h3>
            <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            {content.parksIntro ? (
              <p className="mt-4 font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
                {content.parksIntro}
              </p>
            ) : null}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {parks.map((park) => (
              <article
                key={park.id}
                className="flex flex-col overflow-hidden rounded-[1.3rem] border border-[#e4eaf3] bg-white shadow-[0_10px_28px_rgba(8,18,30,0.045)]"
              >
                <div className="border-b border-[#eef2f7] px-4 py-4">
                  <h4 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold leading-snug text-[#0b1524]">
                    {park.name}
                  </h4>
                </div>
                <dl className="grid flex-1 grid-cols-3 gap-px bg-[#eef2f7]">
                  <div className="bg-white px-2 py-3 text-center">
                    <dt className="font-[family-name:var(--font-ui)] text-[10px] font-bold uppercase tracking-wide text-[#8a94a6]">
                      Nepali
                    </dt>
                    <dd className="mt-1 font-[family-name:var(--font-ui)] text-[12.5px] font-semibold text-[#0b1524]">
                      {park.nepali}
                    </dd>
                  </div>
                  <div className="bg-white px-2 py-3 text-center">
                    <dt className="font-[family-name:var(--font-ui)] text-[10px] font-bold uppercase tracking-wide text-[#8a94a6]">
                      SAARC
                    </dt>
                    <dd className="mt-1 font-[family-name:var(--font-ui)] text-[12.5px] font-semibold text-[#0b1524]">
                      {park.saarc}
                    </dd>
                  </div>
                  <div className="bg-white px-2 py-3 text-center">
                    <dt className="font-[family-name:var(--font-ui)] text-[10px] font-bold uppercase tracking-wide text-[#8a94a6]">
                      Foreign
                    </dt>
                    <dd className="mt-1 font-[family-name:var(--font-ui)] text-[12.5px] font-semibold text-[#F58220]">
                      {park.foreigner}
                    </dd>
                  </div>
                </dl>
                <div className="space-y-1 border-t border-[#eef2f7] px-4 py-3">
                  {park.childNote ? (
                    <p className="font-[family-name:var(--font-ui)] text-[12px] text-[#5a6577]">
                      {park.childNote}
                    </p>
                  ) : null}
                  {park.whereToPay ? (
                    <p className="font-[family-name:var(--font-ui)] text-[12px] leading-relaxed text-[#8a94a6]">
                      {park.whereToPay}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        {notes.length > 0 ? (
          <section className="mt-12 rounded-[1.4rem] border border-[#e4eaf3] bg-white p-5 sm:p-8">
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
              href={content.ctaSecondaryHref || "/travel-guide/nepal-visa"}
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
