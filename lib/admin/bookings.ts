import type { BookingRecord, BookingsContent } from "@/types/bookings";

export const DEFAULT_BOOKINGS: BookingsContent = { items: [] };

export function mergeBookings(
  stored: Partial<BookingsContent> | null,
): BookingsContent {
  if (!stored || !Array.isArray(stored.items)) return DEFAULT_BOOKINGS;
  return {
    items: stored.items.map((item, i) => ({
      ...item,
      id: item.id || `bk-${i}`,
      travelers: Number(item.travelers) || 1,
      unitPrice: Number(item.unitPrice) || 0,
      compareAtPrice:
        item.compareAtPrice == null ? null : Number(item.compareAtPrice) || 0,
      subtotal: Number(item.subtotal) || 0,
      depositPercent: Number(item.depositPercent) || 0,
      cardFeePercent: Number(item.cardFeePercent) || 0,
      amountBeforeFee: Number(item.amountBeforeFee) || 0,
      cardFee: Number(item.cardFee) || 0,
      grandTotal: Number(item.grandTotal) || 0,
      addons: Array.isArray(item.addons) ? item.addons : [],
      status: item.status || "new",
      createdAt: item.createdAt || new Date().toISOString(),
    })),
  };
}

export function newBookingId() {
  return `bk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function calcBookingTotals(input: {
  unitPrice: number;
  travelers: number;
  paymentMethod: BookingRecord["paymentMethod"];
}) {
  const travelers = Math.max(1, Number(input.travelers) || 1);
  const unitPrice = Math.max(0, Number(input.unitPrice) || 0);
  const subtotal = unitPrice * travelers;
  const depositPercent =
    input.paymentMethod === "online_deposit_10"
      ? 10
      : input.paymentMethod === "online_full"
        ? 100
        : 0;
  const cardFeePercent =
    input.paymentMethod === "pay_on_arrival" ? 0 : 4;
  const amountBeforeFee = Math.round((subtotal * depositPercent) / 100);
  const cardFee = Math.round((amountBeforeFee * cardFeePercent) / 100);
  const grandTotal = amountBeforeFee + cardFee;
  return {
    travelers,
    unitPrice,
    subtotal,
    depositPercent,
    cardFeePercent,
    amountBeforeFee,
    cardFee,
    grandTotal,
  };
}
