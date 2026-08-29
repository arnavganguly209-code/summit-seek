"use client";

import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import type { TrekPageContent } from "@/types/trek-page-cms";

export function BhaktapurCityEditor({ initial }: { initial: TrekPageContent }) {
  return (
    <PoonHillEditor
      initial={initial}
      title="Bhaktapur City Tour"
      pathLabel="/tours/bhaktapur-city"
      apiPath="/api/orbit/bhaktapur-city"
    />
  );
}
