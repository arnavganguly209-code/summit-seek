import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

/** Official Summit Seek logo — do not edit, shadow, or recreate */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("relative inline-block shrink-0", className)}
      aria-label="Summit Seek — Home"
    >
      <Image
        src="/logo-summit-seek.png"
        alt="Summit Seek Travels & Tours"
        width={1024}
        height={510}
        priority={priority}
        className="h-auto w-[150px] md:w-[180px] lg:w-[240px]"
        sizes="(max-width: 768px) 150px, (max-width: 1024px) 180px, 240px"
      />
    </Link>
  );
}
