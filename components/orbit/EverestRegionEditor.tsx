"use client";

import { DestinationRegionEditor } from "@/components/orbit/DestinationRegionEditor";
import type { DestinationRegionContent } from "@/types/destination-region-cms";

export function EverestRegionEditor({ initial }: { initial: DestinationRegionContent }) {
  return (
    <DestinationRegionEditor
      initial={initial}
      title="Everest Region"
      pathLabel="/destinations/everest-region"
      apiPath="/api/orbit/everest-region"
      packageIdPrefix="evr"
      newPackageTitle="New Everest Trek"
      defaultStartLocation="Kathmandu"
    />
  );
}
