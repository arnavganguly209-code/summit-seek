import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
  /** Compact sticky header — ~20% smaller */
  compact?: boolean;
  onLight?: boolean;
}

/**
 * Official Summit Seek logo — transparent PNG, no background plate.
 * Width slot shrinks on sticky; max-height:100% keeps it inside the header row.
 */
export function Logo({ className, priority = false, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "relative z-10 flex h-full max-h-full shrink-0 items-center justify-start overflow-hidden bg-transparent leading-none",
        "transition-[width,max-width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        compact ? "w-[160px] max-w-[160px] sm:w-[175px] sm:max-w-[175px] lg:w-[190px] lg:max-w-[190px]" : "w-[180px] max-w-[180px] sm:w-[210px] sm:max-w-[210px] lg:w-[240px] lg:max-w-[240px]",
        className,
      )}
      aria-label="Summit Seek — Home"
    >
      <Image
        src="/logo-summit-seek-transparent.png"
        alt="Summit Seek Travels & Tours"
        width={1024}
        height={576}
        priority={priority}
        unoptimized
        className="pointer-events-none block h-auto max-h-full w-auto max-w-full bg-transparent object-contain object-left"
        sizes="(max-width: 640px) 180px, (max-width: 1024px) 210px, 240px"
        style={{ height: "auto", maxHeight: "100%", width: "auto", maxWidth: "100%" }}
      />
    </Link>
  );
}
