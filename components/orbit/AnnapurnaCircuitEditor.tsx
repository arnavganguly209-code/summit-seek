"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function AnnapurnaCircuitEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Annapurna Circuit Trek"
      pathLabel="/treks/annapurna-circuit"
      apiPath="/api/orbit/annapurna-circuit"
    />
  );
}
