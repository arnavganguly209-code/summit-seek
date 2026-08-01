import {
  Mountain,
  Compass,
  Flag,
  Gem,
  Sun,
  Tent,
  Map,
  Snowflake,
  Binoculars,
  Plane,
  Landmark,
  Route,
  Trees,
  type LucideIcon,
} from "lucide-react";

/** Dual-peak mark used as a distinct mega-menu icon */
export function PeaksIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M3 19 L9 7 L12 12 L15 5 L21 19 Z" />
      <path d="M8 19 L12 12 L16 19" />
    </svg>
  );
}

export {
  Mountain,
  Compass,
  Flag,
  Gem,
  Sun,
  Tent,
  Map,
  Snowflake,
  Binoculars,
  Plane,
  Landmark,
  Route,
  Trees,
  type LucideIcon,
};
