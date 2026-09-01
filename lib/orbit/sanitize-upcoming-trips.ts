import type { UpcomingTripsContent, UpcomingTrip } from "@/types/upcoming-trips";
import { normalizePackageHref } from "@/lib/orbit/package-hrefs";

export function normalizeUpcomingTripsContent(
  content: UpcomingTripsContent,
): UpcomingTripsContent {
  return {
    ...content,
    months: content.months.map((month) => ({
      ...month,
      trips: month.trips.map((trip) => ({
        ...trip,
        bookHref: normalizePackageHref(trip.bookHref || ""),
      })),
    })),
  };
}

export function upcomingTripsChanged(
  before: UpcomingTripsContent,
  after: UpcomingTripsContent,
): boolean {
  return JSON.stringify(before) !== JSON.stringify(after);
}

export function tripHasBookHref(trip: UpcomingTrip): boolean {
  return Boolean(normalizePackageHref(trip.bookHref || ""));
}
