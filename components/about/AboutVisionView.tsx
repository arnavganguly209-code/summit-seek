import Link from "next/link";
import type { AboutPageContent } from "@/types/about-page-cms";

export function AboutVisionView({ content }: { content: AboutPageContent }) {
  const paragraphs = content.visionPageBody
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="bg-[#f5f7fb]">
      <div className="mx-auto w-full max-w-[820px] px-5 py-10 sm:px-8 lg:py-12">
        <div className="rounded-2xl border border-[#e6ebf2] bg-white p-6 shadow-[0_10px_40px_rgba(8,18,30,0.06)] sm:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl bg-[#f7f8fb] p-5">
              <h2 className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-[#0b1524]">
                {content.missionHeading}
              </h2>
              <p className="mt-2 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-[#4a5568]">
                {content.missionBody}
              </p>
            </div>
            <div className="rounded-xl bg-[#f7f8fb] p-5">
              <h2 className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-[#0b1524]">
                {content.visionHeading}
              </h2>
              <p className="mt-2 font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-[#4a5568]">
                {content.visionBody}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4 font-[family-name:var(--font-ui)] text-[15.5px] leading-[1.8] text-[#2f3848]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 border-t border-[#eef1f6] pt-6">
            <Link href="/about" className="text-[14px] font-semibold text-[#1d4ed8] hover:underline">
              ← About Summit Seek
            </Link>
            <Link href="/about/team" className="text-[14px] font-semibold text-[#1d4ed8] hover:underline">
              Meet the team →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
