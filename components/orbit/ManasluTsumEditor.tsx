"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function ManasluTsumEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Manaslu Tsum Valley Trek"
      pathLabel="/treks/manaslu-tsum"
      apiPath="/api/orbit/manaslu-tsum"
    />
  );
}
