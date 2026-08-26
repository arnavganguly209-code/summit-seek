"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function LoManthangEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Lo Manthang Trek"
      pathLabel="/treks/lo-manthang"
      apiPath="/api/orbit/lo-manthang"
    />
  );
}
