"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function MustangHeliVipEditor({
  initial,
}: {
  initial: TrekPageContent;
}) {
  return (
    <PoonHillEditor
      initial={initial}
      title="VIP Mustang Helicopter"
      pathLabel="/tours/mustang-heli-vip"
      apiPath="/api/orbit/mustang-heli-vip"
    />
  );
}
