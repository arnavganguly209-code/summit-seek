"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function JanakpurCityEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Janakpur City Tour"
      pathLabel="/tours/janakpur-city"
      apiPath="/api/orbit/janakpur-city"
    />
  );
}
