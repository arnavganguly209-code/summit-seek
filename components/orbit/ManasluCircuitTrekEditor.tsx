"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function ManasluCircuitTrekEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Manaslu Circuit 14 Days"
      pathLabel="/packages/manaslu-circuit-trek"
      apiPath="/api/orbit/manaslu-circuit-trek"
    />
  );
}
