"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function LangtangValleyEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Langtang Valley Trek"
      pathLabel="/treks/langtang-valley"
      apiPath="/api/orbit/langtang-valley"
    />
  );
}
