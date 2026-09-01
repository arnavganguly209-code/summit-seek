"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function BardiyaJungleSafariEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Bardiya Jungle Safari"
      pathLabel="/tours/bardiya-jungle-safari"
      apiPath="/api/orbit/bardiya-jungle-safari"
    />
  );
}
