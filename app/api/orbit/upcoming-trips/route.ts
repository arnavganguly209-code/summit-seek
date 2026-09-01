import { NextResponse } from "next/server";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import {
  isLinkablePackageHref,
  normalizePackageHref,
} from "@/lib/orbit/package-content-by-href";
import { getUpcomingTrips, saveUpcomingTrips } from "@/lib/orbit/store";
import { normalizeUpcomingTripsContent } from "@/lib/orbit/sanitize-upcoming-trips";
import type { UpcomingTripsContent } from "@/types/upcoming-trips";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getUpcomingTrips());
}

export async function PUT(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = normalizeUpcomingTripsContent(
      (await req.json()) as UpcomingTripsContent,
    );
    if (!body.heading?.trim()) {
      return NextResponse.json({ ok: false, error: "Heading is required." }, { status: 400 });
    }
    if (!Array.isArray(body.months) || body.months.length === 0) {
      return NextResponse.json({ ok: false, error: "At least one month tab is required." }, { status: 400 });
    }
    for (const month of body.months) {
      if (!month.label?.trim()) {
        return NextResponse.json({ ok: false, error: "Each month needs a label." }, { status: 400 });
      }
      for (const trip of month.trips || []) {
        trip.bookHref = normalizePackageHref(trip.bookHref || "");
        trip.price = Number(trip.price) || 0;
        trip.durationDays = Number(trip.durationDays) || 1;
        if (trip.compareAtPrice != null) {
          trip.compareAtPrice = Number(trip.compareAtPrice) || 0;
        }
        if (!trip.title?.trim()) {
          return NextResponse.json(
            { ok: false, error: "Every trip needs a title." },
            { status: 400 },
          );
        }
        if (!trip.bookHref || !isLinkablePackageHref(trip.bookHref)) {
          return NextResponse.json(
            {
              ok: false,
              error: `Trip "${trip.title}" must link to a live package page.`,
            },
            { status: 400 },
          );
        }
      }
    }
    await saveUpcomingTrips(body);
    return NextResponse.json({ ok: true, content: body });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save upcoming trips." }, { status: 500 });
  }
}
