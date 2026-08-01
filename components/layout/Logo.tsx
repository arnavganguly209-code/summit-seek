import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

/** Official Summit Seek logo — transparent, sharp, no box, no crop */
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
        className="logo-clear h-auto w-[150px] max-h-[72px] object-contain object-left md:w-[170px] md:max-h-[78px] lg:w-[200px] lg:max-h-[86px] xl:w-[220px] xl:max-h-[92px]"
        sizes="(max-width: 768px) 150px, (max-width: 1024px) 170px, 220px"
      />
    </Link>
  );
}
