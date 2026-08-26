"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function ThreePassesEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Everest Three Passes Trek"
      pathLabel="/treks/three-passes"
      apiPath="/api/orbit/three-passes"
    />
  );
}
