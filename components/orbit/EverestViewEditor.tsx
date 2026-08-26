"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function EverestViewEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Everest View Trek"
      pathLabel="/treks/everest-view"
      apiPath="/api/orbit/everest-view"
    />
  );
}
