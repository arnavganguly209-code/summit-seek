"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function TsumValleyEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Tsum Valley Trek"
      pathLabel="/treks/tsum-valley"
      apiPath="/api/orbit/tsum-valley"
    />
  );
}
