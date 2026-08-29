"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function KanchenjungaBcEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Kanchenjunga Base Camp Trek"
      pathLabel="/treks/kanchenjunga-bc"
      apiPath="/api/orbit/kanchenjunga-bc"
    />
  );
}
