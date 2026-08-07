import Image from "next/image";

type Props = {
  imageUrl: string;
  title: string;
  subtitle?: string;
};

export function PageCover({ imageUrl, title, subtitle }: Props) {
  const hasImage = Boolean(imageUrl?.trim());

  return (
    <section className="relative isolate h-[240px] overflow-hidden sm:h-[300px] lg:h-[360px]">
      {hasImage ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
      ) : (
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,#0b1524_0%,#1a2d4d_42%,#243b61_70%,#0b1524_100%)]"
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/92 via-[#07111f]/58 to-[#07111f]/28" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_20%_20%,rgba(245,130,32,0.45),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.18),transparent_35%)]" />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-[1180px] px-5 pb-9 sm:px-8 sm:pb-11 lg:px-10">
          <p className="font-[family-name:var(--font-ui)] text-[11px] font-bold uppercase tracking-[0.22em] text-[#F58220]">
            Summit Seek
          </p>
          <h1 className="mt-1.5 font-[family-name:var(--font-display)] text-[2.05rem] font-bold tracking-[-0.02em] text-white sm:text-[2.75rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 max-w-2xl font-[family-name:var(--font-ui)] text-[14px] leading-relaxed text-white/78 sm:text-[15.5px]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
