"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function SherpaniColEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Sherpani Col Trek"
      pathLabel="/treks/sherpani-col"
      apiPath="/api/orbit/sherpani-col"
    />
  );
}
