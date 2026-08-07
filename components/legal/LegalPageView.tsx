import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import type { LegalPageContent } from "@/types/legal-cms";
import { SITE } from "@/lib/constants";

export function LegalPageView({ content }: { content: LegalPageContent }) {
  const docs = content.documents.filter((d) => d.visible !== false);

  return (
    <div className="relative bg-[#f3f6fb]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0b1524]/[0.04] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1120px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.24em] text-[#F58220]">
            {SITE.legalName}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[1.85rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.2rem]">
            Official registrations &amp; compliance
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#F58220]" />
          <p className="mt-5 font-[family-name:var(--font-ui)] text-[15px] leading-[1.8] text-[#5a6577] sm:text-[16px]">
            {content.intro}
          </p>
        </div>

        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => (
            <article
              key={doc.id}
              className="overflow-hidden rounded-[1.25rem] border border-[#e4eaf3] bg-white shadow-[0_12px_36px_rgba(8,18,30,0.06)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#e8eef6]">
                {doc.imageUrl ? (
                  // Static certificate preview — no zoom lightbox, no download control
                  <Image
                    src={doc.imageUrl}
                    alt={doc.title}
                    fill
                    unoptimized
                    draggable={false}
                    className="pointer-events-none select-none object-contain object-center p-3"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(160deg,#1a2740,#0b1524)] px-4 text-center">
                    <FileText className="size-8 text-white/35" />
                    <span className="font-[family-name:var(--font-ui)] text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                      Document pending upload
                    </span>
                  </div>
                )}
              </div>
              <div className="border-t border-[#eef2f7] px-4 py-4">
                <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold text-[#0b1524]">
                  {doc.title}
                </h3>
                {doc.description ? (
                  <p className="mt-1 font-[family-name:var(--font-ui)] text-[13px] leading-relaxed text-[#5a6577]">
                    {doc.description}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-xl bg-[#0b1524] px-5 text-[13px] font-semibold text-white transition hover:bg-[#152338]"
          >
            Need help? Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
