import { DayToursListingEditor } from "@/components/orbit/DayToursListingEditor";
import { LINKABLE_PACKAGES } from "@/lib/orbit/package-content-by-href";
import { getDayToursListing } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitDayToursPage() {
  const content = await getDayToursListing();
  return <DayToursListingEditor initial={content} packages={LINKABLE_PACKAGES} />;
}
