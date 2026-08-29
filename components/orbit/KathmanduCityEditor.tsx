"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function KathmanduCityEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Kathmandu City Tour"
      pathLabel="/tours/kathmandu-city"
      apiPath="/api/orbit/kathmandu-city"
    />
  );
}
