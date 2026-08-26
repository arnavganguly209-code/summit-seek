"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function PhoksundoEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Phoksundo Lake Trek"
      pathLabel="/treks/phoksundo"
      apiPath="/api/orbit/phoksundo"
    />
  );
}
