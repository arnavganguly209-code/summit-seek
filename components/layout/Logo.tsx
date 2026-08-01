import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

/** Official Summit Seek logo — no background box, no crop, no stretch */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("relative inline-block shrink-0 leading-none", className)}
      aria-label="Summit Seek — Home"
    >
      <Image
        src="/logo-summit-seek-transparent.png"
        alt="Summit Seek Travels & Tours"
        width={1024}
        height={572}
        priority={priority}
        unoptimized
        className="h-auto w-[170px] md:w-[190px] lg:w-[240px]"
        sizes="(max-width: 768px) 170px, (max-width: 1024px) 190px, 240px"
      />
    </Link>
  );
}
