"use client";

import { DestinationRegionEditor } from "@/components/orbit/DestinationRegionEditor";
import type { DestinationRegionContent } from "@/types/destination-region-cms";

export function AnnapurnaRegionEditor({ initial }: { initial: DestinationRegionContent }) {
  return (
    <DestinationRegionEditor
      initial={initial}
      title="Annapurna Region"
      pathLabel="/destinations/annapurna-region"
      apiPath="/api/orbit/annapurna-region"
      packageIdPrefix="anr"
      newPackageTitle="New Annapurna Trek"
      defaultStartLocation="Pokhara"
    />
  );
}
