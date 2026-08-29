"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function ArunValleyEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Arun Valley Trek"
      pathLabel="/treks/arun-valley"
      apiPath="/api/orbit/arun-valley"
    />
  );
}
