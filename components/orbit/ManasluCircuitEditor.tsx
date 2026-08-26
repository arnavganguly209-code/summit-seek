"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function ManasluCircuitEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Manaslu Circuit Trek"
      pathLabel="/treks/manaslu-circuit"
      apiPath="/api/orbit/manaslu-circuit"
    />
  );
}
