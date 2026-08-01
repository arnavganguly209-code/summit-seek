import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
  /** Light glass header — softer dark edge so logo stays crisp */
  onLight?: boolean;
}

/** Official Summit Seek logo — transparent, fixed 240px, never cropped */
export function Logo({ className, priority = false, onLight = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("relative z-10 inline-block shrink-0 leading-none", className)}
      aria-label="Summit Seek — Home"
    >
      <Image
        src="/logo-summit-seek-transparent.png"
        alt="Summit Seek Travels & Tours"
        width={1024}
        height={572}
        priority={priority}
        unoptimized
        className={cn(
          "h-auto w-[200px] object-contain object-left sm:w-[220px] lg:w-[240px]",
          onLight ? "logo-clear-light" : "logo-clear",
        )}
        sizes="240px"
      />
    </Link>
  );
}
