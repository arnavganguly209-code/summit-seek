"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function LowerMustangEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Lower Mustang Trek"
      pathLabel="/treks/lower-mustang"
      apiPath="/api/orbit/lower-mustang"
    />
  );
}
