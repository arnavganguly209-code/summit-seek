"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function RupinaLaEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Rupina La Trek"
      pathLabel="/treks/rupina-la"
      apiPath="/api/orbit/rupina-la"
    />
  );
}
