"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function UpperMustangEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Upper Mustang Trek"
      pathLabel="/treks/upper-mustang"
      apiPath="/api/orbit/upper-mustang"
    />
  );
}
