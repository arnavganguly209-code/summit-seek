import type { ComponentType, SVGProps } from "react";
import {
  Mountain,
  PeaksIcon,
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
} from "./MegaIcons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

const iconMap: Record<string, IconComponent> = {
  mountain: Mountain,
  peaks: PeaksIcon,
  valley: Trees,
  trail: Route,
  desert: Landmark,
  summit: Snowflake,
  remote: Binoculars,
  ridge: Map,
  glacier: Tent,
  compass: Compass,
  iceaxe: Flag,
  flag: Flag,
  gem: Gem,
  heli: Plane,
  sun: Sun,
};

interface CategoryIconProps {
  name: string;
  className?: string;
}

export function CategoryIcon({ name, className }: CategoryIconProps) {
  const Icon = iconMap[name] ?? Mountain;
  return <Icon className={className} aria-hidden />;
}
