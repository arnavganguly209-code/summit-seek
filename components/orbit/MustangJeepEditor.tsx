"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function MustangJeepEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Mustang Jeep Tour"
      pathLabel="/tours/mustang-jeep"
      apiPath="/api/orbit/mustang-jeep"
    />
  );
}
