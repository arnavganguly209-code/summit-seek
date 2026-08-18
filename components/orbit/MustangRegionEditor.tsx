"use client";

import { DestinationRegionEditor } from "@/components/orbit/DestinationRegionEditor";
import type { DestinationRegionContent } from "@/types/destination-region-cms";

export function MustangRegionEditor({ initial }: { initial: DestinationRegionContent }) {
  return (
    <DestinationRegionEditor
      initial={initial}
      title="Mustang Region"
      pathLabel="/destinations/mustang-region"
      apiPath="/api/orbit/mustang-region"
      packageIdPrefix="msr"
      newPackageTitle="New Mustang Trek"
      defaultStartLocation="Pokhara"
    />
  );
}
