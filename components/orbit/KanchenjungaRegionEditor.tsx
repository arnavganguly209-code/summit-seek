"use client";

import { DestinationRegionEditor } from "@/components/orbit/DestinationRegionEditor";
import type { DestinationRegionContent } from "@/types/destination-region-cms";

export function KanchenjungaRegionEditor({ initial }: { initial: DestinationRegionContent }) {
  return (
    <DestinationRegionEditor
      initial={initial}
      title="Kanchenjunga Region"
      pathLabel="/destinations/kanchenjunga-region"
      apiPath="/api/orbit/kanchenjunga-region"
      packageIdPrefix="kjr"
      newPackageTitle="New Kanchenjunga Trek"
      defaultStartLocation="Kathmandu"
    />
  );
}
