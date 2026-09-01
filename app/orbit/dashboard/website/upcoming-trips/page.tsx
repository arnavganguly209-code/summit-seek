import { getUpcomingTrips } from "@/lib/orbit/store";
import { enrichUpcomingTrips } from "@/lib/orbit/enrich-upcoming-trips";
import { LINKABLE_PACKAGES } from "@/lib/orbit/package-content-by-href";
import { UpcomingTripsEditor } from "@/components/orbit/UpcomingTripsEditor";

export default async function OrbitUpcomingTripsPage() {
  const content = await enrichUpcomingTrips(await getUpcomingTrips());
  return <UpcomingTripsEditor initial={content} packages={LINKABLE_PACKAGES} />;
}
