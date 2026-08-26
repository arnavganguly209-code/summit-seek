"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function UpperDolpoEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Upper Dolpo Trek"
      pathLabel="/treks/upper-dolpo"
      apiPath="/api/orbit/upper-dolpo"
    />
  );
}
