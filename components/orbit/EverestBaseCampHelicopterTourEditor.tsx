"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function EverestBaseCampHelicopterTourEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="EBC Helicopter Tour"
      pathLabel="/packages/everest-base-camp-helicopter-tour"
      apiPath="/api/orbit/everest-base-camp-helicopter-tour"
    />
  );
}
