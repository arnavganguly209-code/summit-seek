"use client";

import { DestinationRegionEditor } from "@/components/orbit/DestinationRegionEditor";
import type { DestinationRegionContent } from "@/types/destination-region-cms";

export function LangtangRegionEditor({ initial }: { initial: DestinationRegionContent }) {
  return (
    <DestinationRegionEditor
      initial={initial}
      title="Langtang Region"
      pathLabel="/destinations/langtang"
      apiPath="/api/orbit/langtang-region"
      packageIdPrefix="ltr"
      newPackageTitle="New Langtang Trek"
      defaultStartLocation="Kathmandu"
    />
  );
}
