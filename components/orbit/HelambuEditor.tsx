"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function HelambuEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Helambu Trek"
      pathLabel="/treks/helambu"
      apiPath="/api/orbit/helambu"
    />
  );
}
