import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Leaf, Snowflake, Sun, CloudRain } from "lucide-react";
import type { BestTimeContent } from "@/types/best-time-cms";

const seasonIcons = [Sun, Leaf, Snowflake, CloudRain];

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

export function BestTimeView({ content }: { content: BestTimeContent }) {
  const seasons = content.seasons.filter((s) => s.visible !== false);
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

        <section className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] font-bold text-[#0b1524] sm:text-[1.75rem]">
              {content.seasonsHeading}
            </h3>
            <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            {content.seasonsIntro ? (
              <p className="mt-4 font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
                {content.seasonsIntro}
              </p>
            ) : null}
          </div>

          <div className="mt-8 space-y-6">
            {seasons.map((season, index) => {
              const Icon = seasonIcons[index % seasonIcons.length];
              return (
                <article
                  key={season.id}
                  className="overflow-hidden rounded-[1.4rem] border border-[#e4eaf3] bg-white shadow-[0_12px_36px_rgba(8,18,30,0.05)]"
                >
                  <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="relative min-h-[200px] bg-[linear-gradient(145deg,#0b1524,#1a3348)] lg:min-h-full">
                      {season.imageUrl ? (
                        <Image
                          src={season.imageUrl}
                          alt=""
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="size-14 text-white/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
                          {season.months}
                        </p>
                        <h4 className="mt-1 font-[family-name:var(--font-display)] text-[1.45rem] font-bold text-white">
                          {season.name}
                        </h4>
                      </div>
                    </div>
                    <div className="p-5 sm:p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#fff4e8] px-2.5 py-1 font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-wide text-[#c45f0a]">
                          <CalendarDays className="size-3.5" />
                          {season.tagline}
                        </span>
                        {season.condition ? (
                          <span className="inline-flex rounded-lg border border-[#e4eaf3] bg-[#f8fafc] px-2.5 py-1 font-[family-name:var(--font-ui)] text-[11px] font-semibold text-[#5a6577]">
                            Condition: {season.condition}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-4 font-[family-name:var(--font-ui)] text-[14.5px] leading-[1.8] text-[#5a6577]">
                        {season.description}
                      </p>
                      {season.highlights.length > 0 ? (
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {season.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex gap-2 font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#4a5568]"
                            >
                              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#F58220]" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {seasons.length > 0 ? (
          <section className="mt-12 overflow-hidden rounded-[1.35rem] border border-[#e4eaf3] bg-white shadow-[0_10px_28px_rgba(8,18,30,0.04)]">
            <div className="border-b border-[#eef2f7] bg-[#0b1524] px-5 py-4">
              <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold text-white">
                {content.summaryHeading}
              </h3>
            </div>
            <div className="divide-y divide-[#eef2f7]">
              {seasons.map((season) => (
                <div
                  key={`sum-${season.id}`}
                  className="grid gap-1 px-5 py-4 sm:grid-cols-[0.9fr_1.2fr_0.7fr] sm:items-center sm:gap-4"
                >
                  <p className="font-[family-name:var(--font-ui)] text-[14px] font-bold text-[#0b1524]">
                    {season.name}
                    <span className="mt-0.5 block text-[12px] font-medium text-[#8a94a6]">
                      {season.months}
                    </span>
                  </p>
                  <p className="font-[family-name:var(--font-ui)] text-[13.5px] text-[#5a6577]">
                    {season.tagline}
                  </p>
                  <p className="font-[family-name:var(--font-ui)] text-[13px] font-semibold text-[#F58220] sm:text-right">
                    {season.condition}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

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
              href={content.ctaSecondaryHref || "/travel-guide/travel-insurance"}
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
