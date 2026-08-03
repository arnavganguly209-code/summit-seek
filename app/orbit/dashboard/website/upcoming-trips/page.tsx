import { getUpcomingTrips } from "@/lib/orbit/store";
import { UpcomingTripsEditor } from "@/components/orbit/UpcomingTripsEditor";

export default async function OrbitUpcomingTripsPage() {
  const content = await getUpcomingTrips();
  return <UpcomingTripsEditor initial={content} />;
}
