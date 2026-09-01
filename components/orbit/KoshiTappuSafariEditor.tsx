"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function KoshiTappuSafariEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Koshi Tappu Safari"
      pathLabel="/tours/koshi-tappu-safari"
      apiPath="/api/orbit/koshi-tappu-safari"
    />
  );
}
