"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function MakaluBcEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Makalu Base Camp Trek"
      pathLabel="/treks/makalu-bc"
      apiPath="/api/orbit/makalu-bc"
    />
  );
}
