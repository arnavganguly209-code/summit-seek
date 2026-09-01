"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function ChitwanWildlifeLodgeSafariEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Chitwan Wildlife Lodge Safari"
      pathLabel="/tours/chitwan-wildlife-lodge-safari"
      apiPath="/api/orbit/chitwan-wildlife-lodge-safari"
    />
  );
}
