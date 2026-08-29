"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function KanchenjungaCircuitEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Kanchenjunga Circuit Trek"
      pathLabel="/treks/kanchenjunga-circuit"
      apiPath="/api/orbit/kanchenjunga-circuit"
    />
  );
}
