"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { BookingRecord, BookingStatus } from "@/types/bookings";

function formatUsd(n: number) {
  return `US$${n.toLocaleString("en-US")}`;
}

function payLabel(method: BookingRecord["paymentMethod"]) {
  if (method === "online_deposit_10") return "Online 10% + 4% fee";
  if (method === "online_full") return "Online full + 4% fee";
  return "Pay on arrival";
}

export default function AdminBookingsPage() {
  const [items, setItems] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings");
      const data = (await res.json()) as {
        ok?: boolean;
        items?: BookingRecord[];
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to load bookings.");
        setLoading(false);
        return;
      }
      setItems(data.items || []);
    } catch {
      setError("Network error.");
    }
    setLoading(false);
  };

  useEffect(() => {
    void load();
    const t = window.setInterval(() => void load(), 8000);
    return () => window.clearInterval(t);
  }, []);

  const setStatus = async (id: string, status: BookingStatus) => {
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
          Customer Leads
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white">Booking Requests</h1>
        <p className="mt-2 max-w-2xl text-[14px] text-white/55">
          Live booking form submissions — refreshes every few seconds.
        </p>
      </div>

      {loading && !items.length ? (
        <div className="flex items-center gap-2 text-white/60">
          <Loader2 className="size-4 animate-spin" /> Loading…
        </div>
      ) : null}
      {error ? (
        <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">
          {error}
        </p>
      ) : null}
      {!loading && items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-10 text-center text-[14px] text-white/50">
          No bookings yet. New Book This Trip forms appear here instantly.
        </div>
      ) : null}

      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[16px] font-bold text-white">{item.name}</p>
                <p className="mt-1 text-[13px] text-white/55">
                  {item.email} · {item.whatsapp} · {item.country}
                </p>
                <p className="mt-1 text-[12px] text-white/40">
                  {new Date(item.createdAt).toLocaleString()} · {item.id}
                </p>
              </div>
              <select
                value={item.status}
                onChange={(e) => void setStatus(item.id, e.target.value as BookingStatus)}
                className="h-9 rounded-lg border border-white/15 bg-black/30 px-2 text-[12px] text-white"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="mt-4 grid gap-2 text-[13px] text-white/75 sm:grid-cols-2">
              <p>
                <span className="text-white/40">Package:</span> {item.packageTitle}
              </p>
              <p>
                <span className="text-white/40">Href:</span> {item.packageHref}
              </p>
              <p>
                <span className="text-white/40">Dates:</span> {item.startDate}
                {item.endDate ? ` → ${item.endDate}` : ""}
              </p>
              <p>
                <span className="text-white/40">Travelers:</span> {item.travelers}
                {item.groupDiscountLabel ? ` (${item.groupDiscountLabel})` : ""}
              </p>
              <p>
                <span className="text-white/40">Unit / Subtotal:</span>{" "}
                {formatUsd(item.unitPrice)} · {formatUsd(item.subtotal)}
              </p>
              <p>
                <span className="text-white/40">Payment:</span> {payLabel(item.paymentMethod)}
              </p>
              <p>
                <span className="text-white/40">Due noted:</span>{" "}
                {formatUsd(item.grandTotal)}
                {item.cardFee ? ` (fee ${formatUsd(item.cardFee)})` : ""}
              </p>
              {item.cardLast4 ? (
                <p>
                  <span className="text-white/40">Card:</span> {item.cardHolderName} · ****
                  {item.cardLast4} · {item.cardExpiry}
                </p>
              ) : null}
              {item.billingAddress ? (
                <p className="sm:col-span-2">
                  <span className="text-white/40">Billing:</span> {item.billingAddress}
                  {item.billingCity ? `, ${item.billingCity}` : ""}
                  {item.billingCountry ? `, ${item.billingCountry}` : ""}
                </p>
              ) : null}
              {item.addons?.length ? (
                <p className="sm:col-span-2">
                  <span className="text-white/40">Add-ons:</span> {item.addons.join(", ")}
                </p>
              ) : null}
              {item.specialRequests ? (
                <p className="sm:col-span-2 whitespace-pre-wrap">
                  <span className="text-white/40">Notes:</span> {item.specialRequests}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
