"use client";

import { DestinationRegionEditor } from "@/components/orbit/DestinationRegionEditor";
import type { DestinationRegionContent } from "@/types/destination-region-cms";

export function ManasluRegionEditor({ initial }: { initial: DestinationRegionContent }) {
  return (
    <DestinationRegionEditor
      initial={initial}
      title="Manaslu Region"
      pathLabel="/destinations/manaslu-region"
      apiPath="/api/orbit/manaslu-region"
      packageIdPrefix="mnr"
      newPackageTitle="New Manaslu Trek"
      defaultStartLocation="Kathmandu"
    />
  );
}
