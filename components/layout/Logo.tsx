import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
  /** Compact sticky header — ~10% smaller */
  compact?: boolean;
  onLight?: boolean;
}

/** Official Summit Seek logo — transparent PNG, no background plate */
export function Logo({ className, priority = false, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("relative z-10 inline-block shrink-0 bg-transparent leading-none", className)}
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
          "h-auto bg-transparent object-contain object-left transition-[width] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          compact ? "w-[180px] lg:w-[190px]" : "w-[190px] sm:w-[200px] lg:w-[210px]",
        )}
        sizes="210px"
      />
    </Link>
  );
}
