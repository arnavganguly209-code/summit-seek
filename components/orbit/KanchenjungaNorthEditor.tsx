"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function KanchenjungaNorthEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Kanchenjunga North Base Camp Trek"
      pathLabel="/treks/kanchenjunga-north"
      apiPath="/api/orbit/kanchenjunga-north"
    />
  );
}
