"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function YalaPeakEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Yala Peak Climbing"
      pathLabel="/treks/yala-peak"
      apiPath="/api/orbit/yala-peak"
    />
  );
}
