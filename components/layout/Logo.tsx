import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
  /** Compact sticky header — slightly smaller, still fully inside white bar */
  compact?: boolean;
  onLight?: boolean;
}

/**
 * Official Summit Seek logo — transparent PNG, no background plate.
 * Always capped by max-height so it never escapes the sticky white header.
 */
export function Logo({ className, priority = false, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "relative z-10 flex h-full max-h-full shrink-0 items-center justify-start overflow-hidden bg-transparent leading-none",
        "transition-[width,max-width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        compact
          ? "w-[170px] max-w-[170px] sm:w-[185px] sm:max-w-[185px] lg:w-[200px] lg:max-w-[200px]"
          : "w-[180px] max-w-[180px] sm:w-[210px] sm:max-w-[210px] lg:w-[240px] lg:max-w-[240px]",
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
        className={cn(
          "pointer-events-none block w-auto max-w-full bg-transparent object-contain object-left",
          /* Explicit max-heights so logo always sits inside the white bar */
          compact ? "h-auto max-h-[80px]" : "h-auto max-h-[72px] sm:max-h-[80px]",
        )}
        sizes="(max-width: 640px) 180px, (max-width: 1024px) 210px, 240px"
      />
    </Link>
  );
}
