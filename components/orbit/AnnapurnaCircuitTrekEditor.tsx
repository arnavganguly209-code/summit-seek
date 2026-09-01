"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function AnnapurnaCircuitTrekEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Annapurna Circuit 15 Days"
      pathLabel="/packages/annapurna-circuit-trek"
      apiPath="/api/orbit/annapurna-circuit-trek"
    />
  );
}
