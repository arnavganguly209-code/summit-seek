"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function LowerDolpoEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Lower Dolpo Trek"
      pathLabel="/treks/lower-dolpo"
      apiPath="/api/orbit/lower-dolpo"
    />
  );
}
