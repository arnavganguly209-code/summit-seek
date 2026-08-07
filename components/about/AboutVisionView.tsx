import Image from "next/image";
import Link from "next/link";
import { Compass, HeartHandshake, Mountain, Shield } from "lucide-react";
import type { AboutPageContent } from "@/types/about-page-cms";

const icons = [Shield, Compass, HeartHandshake, Mountain];

function Paras({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p
            key={i}
            className="mt-4 font-[family-name:var(--font-ui)] text-[15.5px] leading-[1.85] text-[#4a5568] first:mt-0"
          >
            {p}
          </p>
        ))}
    </>
  );
}

export function AboutVisionView({ content }: { content: AboutPageContent }) {
  const pillars =
    content.visionPillars?.length > 0 ? content.visionPillars : content.values;

  return (
    <div className="relative bg-[#f3f6fb]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0b1524]/[0.045] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1120px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.24em] text-[#F58220]">
            Summit Seek Travels & Tours
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[1.9rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.35rem]">
            A clearer path into the Himalaya
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#F58220]" />
          <p className="mt-5 font-[family-name:var(--font-ui)] text-[15.5px] leading-[1.85] text-[#5a6577] sm:text-[16.5px]">
            {content.visionPageIntro || content.visionPageCoverSubtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <section className="rounded-[1.35rem] border border-[#e4eaf3] bg-white p-6 shadow-[0_14px_40px_rgba(8,18,30,0.06)] sm:p-8">
            <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.18em] text-[#F58220]">
              Mission
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-[#0b1524]">
              {content.missionHeading}
            </h3>
            <p className="mt-3 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#4a5568]">
              {content.missionBody}
            </p>
          </section>
          <section className="rounded-[1.35rem] border border-[#e4eaf3] bg-[#0b1524] p-6 shadow-[0_14px_40px_rgba(8,18,30,0.12)] sm:p-8">
            <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.18em] text-[#F58220]">
              Vision
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-white">
              {content.visionHeading}
            </h3>
            <p className="mt-3 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-white/72">
              {content.visionBody}
            </p>
          </section>
        </div>

        <section className="mt-8 overflow-hidden rounded-[1.5rem] border border-[#e4eaf3] bg-white shadow-[0_14px_40px_rgba(8,18,30,0.06)]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[260px] bg-[linear-gradient(145deg,#0b1524,#1a2d4d)] lg:min-h-full">
              {content.storyImageUrl ? (
                <Image
                  src={content.storyImageUrl}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.18em] text-[#F58220]">
                  How we travel
                </p>
                <p className="mt-2 max-w-sm font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-white">
                  Prepared logistics. Personal hospitality. Mountains first.
                </p>
              </div>
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <h3 className="font-[family-name:var(--font-display)] text-[1.45rem] font-bold text-[#0b1524]">
                Our full vision
              </h3>
              <div className="mt-4">
                <Paras text={content.visionPageBody} />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-[family-name:var(--font-display)] text-[1.55rem] font-bold text-[#0b1524]">
              {content.visionPillarsHeading || content.valuesHeading}
            </h3>
            <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar, i) => {
              const Icon = icons[i % icons.length];
              return (
                <article
                  key={pillar.id}
                  className="rounded-[1.25rem] border border-[#e4eaf3] bg-white p-5 shadow-[0_10px_32px_rgba(8,18,30,0.05)] sm:p-6"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#0b1524] text-white">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h4 className="font-[family-name:var(--font-ui)] text-[15px] font-bold text-[#0b1524]">
                        {pillar.title}
                      </h4>
                      <p className="mt-1.5 font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a6577]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[1.5rem] bg-[#0b1524] px-6 py-9 text-center sm:px-10 sm:py-11">
          <h3 className="font-[family-name:var(--font-display)] text-[1.55rem] font-bold text-white sm:text-[1.75rem]">
            {content.ctaHeading}
          </h3>
          <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-white/70">
            {content.ctaBody}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={content.ctaHref || "/contact"}
              className="inline-flex h-11 items-center rounded-xl bg-[#F58220] px-6 text-[14px] font-bold text-[#08121E] transition hover:brightness-110"
            >
              {content.ctaLabel}
            </Link>
            <Link
              href="/about/team"
              className="inline-flex h-11 items-center rounded-xl border border-white/20 bg-white/5 px-5 text-[13px] font-semibold text-white transition hover:bg-white/10"
            >
              Meet our team
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center rounded-xl border border-white/20 bg-white/5 px-5 text-[13px] font-semibold text-white transition hover:bg-white/10"
            >
              ← About Summit Seek
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
