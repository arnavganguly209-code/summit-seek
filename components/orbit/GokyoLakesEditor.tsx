"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function GokyoLakesEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Gokyo Lakes Trek"
      pathLabel="/treks/gokyo-lakes"
      apiPath="/api/orbit/gokyo-lakes"
    />
  );
}
