"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function EverestBaseCampEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Everest Base Camp Trek"
      pathLabel="/treks/everest-base-camp"
      apiPath="/api/orbit/everest-base-camp"
    />
  );
}
