"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function EverestHeliViewEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Everest Heli View Trek"
      pathLabel="/treks/everest-heli-view"
      apiPath="/api/orbit/everest-heli-view"
    />
  );
}
