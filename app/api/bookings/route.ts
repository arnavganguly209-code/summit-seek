import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { calcBookingTotals, newBookingId } from "@/lib/admin/bookings";
import { getBookings, saveBookings } from "@/lib/orbit/store";
import type { BookingPaymentMethod, BookingRecord, BookingStatus } from "@/types/bookings";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated()) && !(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const data = await getBookings();
  return NextResponse.json({
    ok: true,
    items: [...data.items].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<BookingRecord> & {
      cardNumber?: string;
    };

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const country = String(body.country || "").trim();
    const whatsapp = String(body.whatsapp || "").trim();
    const packageTitle = String(body.packageTitle || "").trim();
    const packageHref = String(body.packageHref || "").trim();
    const startDate = String(body.startDate || "").trim();
    const paymentMethod = (body.paymentMethod ||
      "pay_on_arrival") as BookingPaymentMethod;

    if (!name || !email || !country || !whatsapp || !packageTitle || !startDate) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Name, email, country, WhatsApp, package, and start date are required.",
        },
        { status: 400 },
      );
    }

    const totals = calcBookingTotals({
      unitPrice: Number(body.unitPrice) || 0,
      travelers: Number(body.travelers) || 1,
      paymentMethod,
    });

    if (paymentMethod !== "pay_on_arrival") {
      const cardNumber = String(body.cardNumber || "").replace(/\s+/g, "");
      const cardHolderName = String(body.cardHolderName || "").trim();
      const billingAddress = String(body.billingAddress || "").trim();
      if (!cardHolderName || !billingAddress || cardNumber.length < 12) {
        return NextResponse.json(
          {
            ok: false,
            error: "Card holder, billing address, and card number are required for online payment.",
          },
          { status: 400 },
        );
      }
    }

    const cardNumber = String(body.cardNumber || "").replace(/\s+/g, "");
    const item: BookingRecord = {
      id: newBookingId(),
      createdAt: new Date().toISOString(),
      status: "new",
      packageHref,
      packageTitle,
      durationLabel: String(body.durationLabel || "").trim(),
      name,
      email,
      country,
      whatsapp,
      travelers: totals.travelers,
      startDate,
      endDate: String(body.endDate || "").trim(),
      specialRequests: String(body.specialRequests || "").trim(),
      addons: Array.isArray(body.addons)
        ? body.addons.map(String).filter(Boolean)
        : [],
      unitPrice: totals.unitPrice,
      compareAtPrice:
        body.compareAtPrice == null ? null : Number(body.compareAtPrice) || null,
      groupDiscountLabel: String(body.groupDiscountLabel || "").trim(),
      subtotal: totals.subtotal,
      paymentMethod,
      depositPercent: totals.depositPercent,
      cardFeePercent: totals.cardFeePercent,
      amountBeforeFee: totals.amountBeforeFee,
      cardFee: totals.cardFee,
      grandTotal: totals.grandTotal,
      cardHolderName: String(body.cardHolderName || "").trim(),
      cardLast4: cardNumber ? cardNumber.slice(-4) : "",
      cardExpiry: String(body.cardExpiry || "").trim(),
      billingAddress: String(body.billingAddress || "").trim(),
      billingCity: String(body.billingCity || "").trim(),
      billingCountry: String(body.billingCountry || "").trim(),
    };

    const current = await getBookings();
    await saveBookings({ items: [item, ...current.items].slice(0, 500) });

    return NextResponse.json({
      ok: true,
      booking: item,
      customerMessage:
        "Thank you for booking with Summit Seek. Our team will contact you shortly to confirm your trip details and next steps.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save booking. Please try again." },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated()) && !(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as { id?: string; status?: BookingStatus };
    if (!body.id || !body.status) {
      return NextResponse.json({ ok: false, error: "id and status required." }, { status: 400 });
    }
    const current = await getBookings();
    const items = current.items.map((item) =>
      item.id === body.id ? { ...item, status: body.status! } : item,
    );
    await saveBookings({ items });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to update booking." }, { status: 500 });
  }
}
