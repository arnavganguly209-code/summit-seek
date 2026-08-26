"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function GosainkundaEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Gosainkunda Trek"
      pathLabel="/treks/gosainkunda"
      apiPath="/api/orbit/gosainkunda"
    />
  );
}
