"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function LobuchePeakEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Lobuche Peak Climbing"
      pathLabel="/treks/lobuche-peak"
      apiPath="/api/orbit/lobuche-peak"
    />
  );
}
