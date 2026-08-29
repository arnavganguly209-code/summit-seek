"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function KanchenjungaSouthEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Kanchenjunga South Base Camp Trek"
      pathLabel="/treks/kanchenjunga-south"
      apiPath="/api/orbit/kanchenjunga-south"
    />
  );
}
