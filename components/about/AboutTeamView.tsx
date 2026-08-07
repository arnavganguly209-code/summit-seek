import Image from "next/image";
import Link from "next/link";
import type { AboutPageContent } from "@/types/about-page-cms";

export function AboutTeamView({ content }: { content: AboutPageContent }) {
  const team = content.team.filter((m) => m.visible !== false);

  return (
    <div className="relative bg-[#f3f6fb]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0b1524]/[0.04] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.24em] text-[#F58220]">
            Summit Seek Travels & Tours
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[1.85rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.25rem]">
            People behind the expedition
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#F58220]" />
          <p className="mt-5 font-[family-name:var(--font-ui)] text-[15px] leading-[1.8] text-[#5a6577] sm:text-[16px]">
            {content.teamIntro}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.id}
              className="group overflow-hidden rounded-[1.35rem] border border-[#e4eaf3] bg-white shadow-[0_14px_40px_rgba(8,18,30,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(8,18,30,0.1)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#dfe6f0]">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(160deg,#1a2740_0%,#0b1524_55%,#152338_100%)] px-4 text-center">
                    <span className="flex size-16 items-center justify-center rounded-full border border-white/15 bg-white/5 font-[family-name:var(--font-display)] text-[1.35rem] font-bold text-white/80">
                      {(member.name || "?").trim().charAt(0).toUpperCase()}
                    </span>
                    <span className="font-[family-name:var(--font-ui)] text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                      Photo coming soon
                    </span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b1524]/55 to-transparent" />
              </div>

              <div className="px-5 py-4">
                <h3 className="font-[family-name:var(--font-display)] text-[1.12rem] font-bold text-[#0b1524]">
                  {member.name}
                </h3>
                <p className="mt-1 font-[family-name:var(--font-ui)] text-[12px] font-bold uppercase tracking-[0.14em] text-[#F58220]">
                  {member.role}
                </p>
                {member.bio ? (
                  <p className="mt-2.5 font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a6577]">
                    {member.bio}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/about"
            className="inline-flex h-11 items-center rounded-xl border border-[#0b1524]/15 bg-white px-5 text-[13px] font-semibold text-[#0b1524] transition hover:bg-[#0b1524] hover:text-white"
          >
            ← About Summit Seek
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-xl bg-[#0b1524] px-5 text-[13px] font-semibold text-white transition hover:bg-[#152338]"
          >
            Talk to our team
          </Link>
        </div>
      </div>
    </div>
  );
}
