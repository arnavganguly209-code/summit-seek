"use client";

import { DestinationRegionEditor } from "@/components/orbit/DestinationRegionEditor";
import type { DestinationRegionContent } from "@/types/destination-region-cms";

export function HiddenHimalayasRegionEditor({
  initial,
}: {
  initial: DestinationRegionContent;
}) {
  return (
    <DestinationRegionEditor
      initial={initial}
      title="Wildlife & Hidden Himalayas"
      pathLabel="/destinations/hidden-himalayas"
      apiPath="/api/orbit/hidden-himalayas-region"
      packageIdPrefix="hh"
      newPackageTitle="New Wildlife Package"
      defaultStartLocation="Kathmandu"
    />
  );
}
