"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function MardiHimalEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Mardi Himal Trek"
      pathLabel="/treks/mardi-himal"
      apiPath="/api/orbit/mardi-himal"
    />
  );
}
