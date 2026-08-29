"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function PokaldePeakEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Pokalde Peak Climbing"
      pathLabel="/treks/pokalde-peak"
      apiPath="/api/orbit/pokalde-peak"
    />
  );
}
