"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function AnnapurnaBaseCampEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Annapurna Base Camp Trek"
      pathLabel="/treks/annapurna-base-camp"
      apiPath="/api/orbit/annapurna-base-camp"
    />
  );
}
