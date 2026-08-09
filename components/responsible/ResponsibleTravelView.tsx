import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  HandHeart,
  Leaf,
  Recycle,
  Shield,
  Users,
} from "lucide-react";
import type { ResponsibleTravelContent } from "@/types/responsible-travel-cms";

const icons = [Leaf, HandHeart, Recycle, Droplets, Users, Shield];

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

function PracticeGrid({
  items,
}: {
  items: ResponsibleTravelContent["travelerPractices"];
}) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = icons[index % icons.length];
        const num = String(index + 1).padStart(2, "0");
        return (
          <article
            key={item.id}
            className="group overflow-hidden rounded-[1.3rem] border border-[#e4eaf3] bg-white shadow-[0_12px_36px_rgba(8,18,30,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(8,18,30,0.1)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#dfe6f0]">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(145deg,#0b1524_0%,#1a3348_55%,#143028_100%)]">
                  <Icon className="size-10 text-white/40" />
                </div>
              )}
              <div className="absolute left-3 top-3 inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#F58220] px-2 font-[family-name:var(--font-ui)] text-[12px] font-bold text-[#08121E]">
                {num}
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-[family-name:var(--font-display)] text-[1.08rem] font-bold leading-snug text-[#0b1524]">
                {item.title}
              </h4>
              <p className="mt-2 font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a6577]">
                {item.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ResponsibleTravelView({
  content,
}: {
  content: ResponsibleTravelContent;
}) {
  const traveler = content.travelerPractices.filter((p) => p.visible !== false);
  const company = content.companyCommitments.filter((p) => p.visible !== false);

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
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[1.85rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.35rem]">
            {content.introHeading}
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#F58220]" />
          <div className="mt-5 space-y-4">
            <Paras
              text={content.introBody}
              className="font-[family-name:var(--font-ui)] text-[15.5px] leading-[1.85] text-[#5a6577] sm:text-[16.5px]"
            />
          </div>
        </section>

        <section className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-[family-name:var(--font-display)] text-[1.6rem] font-bold text-[#0b1524] sm:text-[1.9rem]">
              {content.travelerHeading}
            </h3>
            <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            {content.travelerIntro ? (
              <p className="mt-4 font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
                {content.travelerIntro}
              </p>
            ) : null}
          </div>
          <PracticeGrid items={traveler} />
        </section>

        <section className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-[family-name:var(--font-display)] text-[1.6rem] font-bold text-[#0b1524] sm:text-[1.9rem]">
              {content.companyHeading}
            </h3>
            <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-[#F58220]" />
            {content.companyIntro ? (
              <p className="mt-4 font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
                {content.companyIntro}
              </p>
            ) : null}
          </div>
          <PracticeGrid items={company} />
        </section>

        <section className="mt-14 overflow-hidden rounded-[1.5rem] border border-[#e4eaf3] bg-white shadow-[0_14px_40px_rgba(8,18,30,0.06)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[240px] bg-[linear-gradient(145deg,#0b1524,#1a3348)] lg:min-h-full">
              {content.highlightImageUrl ? (
                <Image
                  src={content.highlightImageUrl}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/75 via-transparent to-transparent" />
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.18em] text-[#F58220]">
                Leave No Trace
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.5rem] font-bold text-[#0b1524]">
                {content.highlightHeading}
              </h3>
              <div className="mt-4 space-y-3">
                <Paras
                  text={content.highlightBody}
                  className="font-[family-name:var(--font-ui)] text-[15px] leading-[1.8] text-[#4a5568]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[1.5rem] bg-[#0b1524] px-6 py-10 text-center sm:px-10 sm:py-12">
          <h3 className="font-[family-name:var(--font-display)] text-[1.55rem] font-bold text-white sm:text-[1.8rem]">
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
              href={content.ctaSecondaryHref || "/why-summit-seek"}
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
