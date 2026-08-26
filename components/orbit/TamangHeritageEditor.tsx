"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function TamangHeritageEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Tamang Heritage Trail"
      pathLabel="/treks/tamang-heritage"
      apiPath="/api/orbit/tamang-heritage"
    />
  );
}
