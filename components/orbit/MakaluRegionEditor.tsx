"use client";

import { DestinationRegionEditor } from "@/components/orbit/DestinationRegionEditor";
import type { DestinationRegionContent } from "@/types/destination-region-cms";

export function MakaluRegionEditor({ initial }: { initial: DestinationRegionContent }) {
  return (
    <DestinationRegionEditor
      initial={initial}
      title="Makalu Region"
      pathLabel="/destinations/makalu-region"
      apiPath="/api/orbit/makalu-region"
      packageIdPrefix="mkr"
      newPackageTitle="New Makalu Trek"
      defaultStartLocation="Kathmandu"
    />
  );
}
