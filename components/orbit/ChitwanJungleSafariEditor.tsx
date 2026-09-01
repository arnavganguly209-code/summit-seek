"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function ChitwanJungleSafariEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Chitwan Jungle Safari"
      pathLabel="/tours/chitwan-jungle-safari"
      apiPath="/api/orbit/chitwan-jungle-safari"
    />
  );
}
