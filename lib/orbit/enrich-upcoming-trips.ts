import type { UpcomingTripsContent, UpcomingTrip } from "@/types/upcoming-trips";
import type { TrekPageContent } from "@/types/trek-page-cms";
import {
  loadPackageContentsForHrefs,
  normalizePackageHref,
  parseDurationDays,
} from "@/lib/orbit/package-content-by-href";

function mergeTripWithPackage(
  trip: UpcomingTrip,
  byHref: Record<string, TrekPageContent>,
): UpcomingTrip | null {
  const normalized = normalizePackageHref(trip.bookHref || "");
  const pkg = byHref[normalized];
  if (!pkg) return null;

  return {
    ...trip,
    bookHref: normalized,
    title: pkg.title,
    durationDays: parseDurationDays(pkg.durationLabel, trip.durationDays),
    price: pkg.price ?? trip.price,
    compareAtPrice: pkg.compareAtPrice ?? trip.compareAtPrice,
  };
}

export async function enrichUpcomingTrips(
  content: UpcomingTripsContent,
): Promise<UpcomingTripsContent> {
  const hrefs = content.months.flatMap((month) =>
    month.trips.map((trip) => trip.bookHref).filter(Boolean),
  );
  const byHref = await loadPackageContentsForHrefs(hrefs);

  return {
    ...content,
    months: content.months.map((month) => ({
      ...month,
      trips: month.trips
        .map((trip) => mergeTripWithPackage(trip, byHref))
        .filter((trip): trip is UpcomingTrip => trip !== null && trip.visible !== false),
    })),
  };
}
