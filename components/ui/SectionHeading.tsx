import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  href?: string;
  linkLabel?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  href,
  linkLabel = "View All",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          align === "left" && "md:flex-row md:items-end md:justify-between",
        )}
      >
        <div className={cn(align === "center" && "mx-auto")}>
          {eyebrow ? (
            <p
              className={cn(
                "mb-3 text-[11px] font-bold uppercase tracking-[0.28em]",
                light ? "text-gold" : "text-gold-dark",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h2
            className={cn(
              "font-display text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl lg:text-5xl",
              light ? "text-snow" : "text-midnight",
            )}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={cn(
                "mt-4 max-w-xl text-base leading-relaxed md:text-lg",
                light ? "text-snow/75" : "text-slate",
                align === "center" && "mx-auto",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
        {href ? (
          <Link
            href={href}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors",
              light
                ? "text-gold hover:text-gold-light"
                : "text-midnight hover:text-gold-dark",
            )}
          >
            {linkLabel}
            <span aria-hidden>→</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
