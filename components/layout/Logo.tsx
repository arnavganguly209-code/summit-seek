import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
  /** Kept for API compatibility — logo stays fully transparent, no filters */
  onLight?: boolean;
}

/** Official Summit Seek logo — transparent PNG, 240px, no background plate */
export function Logo({ className, priority = false }: LogoProps) {
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
        className="h-auto w-[200px] bg-transparent object-contain object-left sm:w-[220px] lg:w-[240px]"
        sizes="240px"
      />
    </Link>
  );
}
