import Image from "next/image";
import { SOCIAL } from "@/lib/constants";

/** Tripadvisor Travelers' Choice pair — transparent artwork, no card chrome */
export function TravelersChoiceBadges() {
  return (
    <a
      href={SOCIAL.tripadvisor}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 block bg-transparent transition-opacity hover:opacity-90"
      aria-label="Tripadvisor Travelers' Choice Awards"
    >
      <Image
        src="/travelers-choice-badges.png"
        alt="Tripadvisor Travelers' Choice 2026 and Travelers' Choice Awards 2025"
        width={823}
        height={471}
        unoptimized
        className="mx-auto h-auto w-full max-w-[220px] bg-transparent object-contain lg:mx-0"
      />
    </a>
  );
}
