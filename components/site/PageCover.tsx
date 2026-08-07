import Image from "next/image";

type Props = {
  imageUrl: string;
  title: string;
  subtitle?: string;
};

export function PageCover({ imageUrl, title, subtitle }: Props) {
  return (
    <section className="relative isolate h-[220px] overflow-hidden sm:h-[280px] lg:h-[320px]">
      <Image
        src={imageUrl}
        alt=""
        fill
        priority
        unoptimized
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/90 via-[#07111f]/55 to-[#07111f]/25" />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-[1120px] px-5 pb-8 sm:px-8 sm:pb-10 lg:px-10">
          <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.22em] text-[#F58220]">
            Summit Seek
          </p>
          <h1 className="mt-1.5 font-[family-name:var(--font-display)] text-[2rem] font-bold tracking-[-0.02em] text-white sm:text-[2.6rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 max-w-2xl font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
