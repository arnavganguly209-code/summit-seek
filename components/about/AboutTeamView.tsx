import Image from "next/image";
import Link from "next/link";
import type { AboutPageContent } from "@/types/about-page-cms";

export function AboutTeamView({ content }: { content: AboutPageContent }) {
  const team = content.team.filter((m) => m.visible !== false);

  return (
    <div className="bg-[#f5f7fb]">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
        <p className="max-w-3xl font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
          {content.teamIntro}
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.id}
              className="overflow-hidden rounded-2xl border border-[#e6ebf2] bg-white shadow-[0_8px_28px_rgba(8,18,30,0.05)]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold text-[#0b1524]">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-wide text-[#F58220]">
                  {member.role}
                </p>
                <p className="mt-2 font-[family-name:var(--font-ui)] text-[13px] leading-relaxed text-[#5a6577]">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/about"
            className="inline-flex text-[14px] font-semibold text-[#1d4ed8] hover:underline"
          >
            ← Back to About
          </Link>
        </div>
      </div>
    </div>
  );
}
