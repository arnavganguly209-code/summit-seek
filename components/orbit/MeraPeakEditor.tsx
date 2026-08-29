"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function MeraPeakEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Mera Peak Climbing"
      pathLabel="/treks/mera-peak"
      apiPath="/api/orbit/mera-peak"
    />
  );
}
