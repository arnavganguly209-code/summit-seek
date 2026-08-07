import Image from "next/image";
import Link from "next/link";
import { Shield, Mountain, HeartHandshake, Compass } from "lucide-react";
import type { AboutPageContent } from "@/types/about-page-cms";
import { SITE } from "@/lib/constants";

const icons = [Shield, Compass, HeartHandshake, Mountain];

const frame =
  "rounded-2xl border border-[#e6ebf2] bg-white p-6 shadow-[0_10px_40px_rgba(8,18,30,0.06)] sm:p-8";

function Paras({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className="mt-3 font-[family-name:var(--font-ui)] text-[15px] leading-[1.75] text-[#4a5568] first:mt-0">
            {p}
          </p>
        ))}
    </>
  );
}

export function AboutPageView({ content }: { content: AboutPageContent }) {
  return (
    <div className="bg-[#f5f7fb]">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className={`grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center ${frame}`}>
          <div>
            <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
              {content.companyName}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-[1.55rem] font-bold leading-snug text-[#0b1524] sm:text-[1.85rem]">
              {content.storyHeading}
            </h2>
            <p className="mt-2 font-[family-name:var(--font-ui)] text-[14px] font-medium text-[#1d4ed8]">
              {content.tagline}
            </p>
            <div className="mt-4">
              <Paras text={content.storyBody} />
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-[family-name:var(--font-ui)] text-[13px] text-[#5a6577]">
              <span>
                <strong className="text-[#0b1524]">{SITE.yearsExperience}+</strong> years focus
              </span>
              <span>
                <strong className="text-[#0b1524]">{SITE.happyTravelers}</strong> travelers
              </span>
              <span>
                <strong className="text-[#0b1524]">{SITE.address}</strong>
              </span>
            </div>
          </div>
          {content.storyImageUrl ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-[5/4]">
              <Image
                src={content.storyImageUrl}
                alt={content.companyName}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          ) : (
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(145deg,#0b1524,#1d4ed8)] sm:aspect-[5/4]">
              <p className="px-6 text-center font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-white/85">
                {content.companyName}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className={frame}>
            <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold text-[#0b1524]">
              {content.missionHeading}
            </h3>
            <p className="mt-3 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#4a5568]">
              {content.missionBody}
            </p>
          </section>
          <section className={frame}>
            <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold text-[#0b1524]">
              {content.visionHeading}
            </h3>
            <p className="mt-3 font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#4a5568]">
              {content.visionBody}
            </p>
            <Link
              href="/about/vision"
              className="mt-4 inline-flex text-[13px] font-semibold text-[#1d4ed8] hover:underline"
            >
              Read our full vision →
            </Link>
          </section>
        </div>

        <section className="mt-6">
          <h3 className="font-[family-name:var(--font-display)] text-[1.45rem] font-bold text-[#0b1524]">
            {content.valuesHeading}
          </h3>
          <div className="mt-2 h-[2px] w-10 rounded-full bg-[#F58220]" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {content.values.map((v, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={v.id} className={frame + " !p-5"}>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0b1524]/06 text-[#0b1524]">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h4 className="font-[family-name:var(--font-ui)] text-[15px] font-bold text-[#0b1524]">
                        {v.title}
                      </h4>
                      <p className="mt-1 font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a6577]">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={`mt-6 ${frame}`}>
          <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] font-bold text-[#0b1524]">
            {content.responsibleHeading}
          </h3>
          <p className="mt-3 max-w-3xl font-[family-name:var(--font-ui)] text-[14.5px] leading-relaxed text-[#4a5568]">
            {content.responsibleBody}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/about/team"
              className="inline-flex h-10 items-center rounded-xl border border-[#0b1524]/15 bg-white px-4 text-[13px] font-semibold text-[#0b1524] transition hover:bg-[#0b1524] hover:text-white"
            >
              Meet our team
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center rounded-xl bg-[#0b1524] px-4 text-[13px] font-semibold text-white transition hover:bg-[#152338]"
            >
              Talk to us
            </Link>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl bg-[#0b1524] px-6 py-8 text-center sm:px-10 sm:py-10">
          <h3 className="font-[family-name:var(--font-display)] text-[1.45rem] font-bold text-white sm:text-[1.65rem]">
            {content.ctaHeading}
          </h3>
          <p className="mx-auto mt-2 max-w-xl font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-white/70">
            {content.ctaBody}
          </p>
          <Link
            href={content.ctaHref || "/contact"}
            className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#F58220] px-6 text-[14px] font-bold text-[#08121E] transition hover:brightness-110"
          >
            {content.ctaLabel}
          </Link>
        </section>
      </div>
    </div>
  );
}
