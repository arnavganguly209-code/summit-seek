"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function ShivapuriYogaHikeEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Shivapuri Yoga Hike"
      pathLabel="/tours/shivapuri-yoga-hike"
      apiPath="/api/orbit/shivapuri-yoga-hike"
    />
  );
}
