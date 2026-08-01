import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

/** Official Summit Seek logo — +20% size, transparent, no box */
export function Logo({ className, priority = false }: LogoProps) {
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
        className="logo-clear h-auto w-[180px] max-h-[86px] object-contain object-left md:w-[204px] md:max-h-[94px] lg:w-[240px] lg:max-h-[104px] xl:w-[264px] xl:max-h-[110px]"
        sizes="(max-width: 768px) 180px, (max-width: 1024px) 204px, 264px"
      />
    </Link>
  );
}
