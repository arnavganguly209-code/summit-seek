"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function LuxuryEverestBaseCampEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Luxury Everest Base Camp"
      pathLabel="/treks/luxury-everest-base-camp"
      apiPath="/api/orbit/luxury-everest-base-camp"
    />
  );
}
