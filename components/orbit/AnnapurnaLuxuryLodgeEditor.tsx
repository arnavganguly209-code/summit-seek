"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function AnnapurnaLuxuryLodgeEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Annapurna Luxury Lodge"
      pathLabel="/treks/annapurna-luxury-lodge"
      apiPath="/api/orbit/annapurna-luxury-lodge"
    />
  );
}
