"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function AnnapurnaBaseCampTrekEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="ABC Trek 15 Days"
      pathLabel="/packages/annapurna-base-camp-trek"
      apiPath="/api/orbit/annapurna-base-camp-trek"
    />
  );
}
