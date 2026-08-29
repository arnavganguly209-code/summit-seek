"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function MakaluBarunEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Makalu Barun Valley Trek"
      pathLabel="/treks/makalu-barun"
      apiPath="/api/orbit/makalu-barun"
    />
  );
}
