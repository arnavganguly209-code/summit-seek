"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function SheyGompaEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Shey Gompa Trek"
      pathLabel="/treks/shey-gompa"
      apiPath="/api/orbit/shey-gompa"
    />
  );
}
