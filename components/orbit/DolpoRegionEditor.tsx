"use client";

import { DestinationRegionEditor } from "@/components/orbit/DestinationRegionEditor";
import type { DestinationRegionContent } from "@/types/destination-region-cms";

export function DolpoRegionEditor({ initial }: { initial: DestinationRegionContent }) {
  return (
    <DestinationRegionEditor
      initial={initial}
      title="Dolpo Region"
      pathLabel="/destinations/dolpo-region"
      apiPath="/api/orbit/dolpo-region"
      packageIdPrefix="dlr"
      newPackageTitle="New Dolpo Trek"
      defaultStartLocation="Kathmandu"
    />
  );
}
