"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function EverestBaseCampTrekEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="EBC Trek 15 Days"
      pathLabel="/packages/everest-base-camp-trek"
      apiPath="/api/orbit/everest-base-camp-trek"
    />
  );
}
