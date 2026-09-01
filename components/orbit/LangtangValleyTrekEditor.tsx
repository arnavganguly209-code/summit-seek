"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function LangtangValleyTrekEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Langtang Valley 9 Days"
      pathLabel="/packages/langtang-valley-trek"
      apiPath="/api/orbit/langtang-valley-trek"
    />
  );
}
