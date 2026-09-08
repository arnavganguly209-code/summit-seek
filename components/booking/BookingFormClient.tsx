"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { calcBookingTotals } from "@/lib/admin/bookings";
import type { BookingPaymentMethod } from "@/types/bookings";
import { cn } from "@/lib/utils";

type PackageOption = {
  href: string;
  label: string;
  group: string;
  price: number | null;
  compareAtPrice: number | null;
  durationLabel: string;
};

type GroupRow = { paxLabel: string; price: number };

type Props = {
  initialPackageHref: string;
  initialPackageTitle: string;
  initialPrice: number;
  initialCompareAt: number | null;
  initialDuration: string;
  groupDiscounts: GroupRow[];
  packages: PackageOption[];
};

const ADDON_OPTIONS = [
  "Airport pickup / drop",
  "Porter service",
  "Private jeep upgrade",
  "Extra hotel night",
  "Travel insurance help",
];

function formatUsd(n: number) {
  return `US$${n.toLocaleString("en-US")}`;
}

function pickUnitPrice(
  travelers: number,
  basePrice: number,
  groupDiscounts: GroupRow[],
): { unitPrice: number; label: string } {
  if (!groupDiscounts.length) {
    return { unitPrice: basePrice, label: "Standard price" };
  }
  // Prefer matching pax band; fall back to base
  for (const row of groupDiscounts) {
    const m = row.paxLabel.match(/(\d+)\s*[-–]\s*(\d+)/);
    const single = row.paxLabel.match(/(\d+)\s*\+?/);
    if (m) {
      const min = Number(m[1]);
      const max = Number(m[2]);
      if (travelers >= min && travelers <= max) {
        return { unitPrice: row.price, label: row.paxLabel };
      }
    } else if (single) {
      const n = Number(single[1]);
      if (row.paxLabel.includes("+") && travelers >= n) {
        return { unitPrice: row.price, label: row.paxLabel };
      }
      if (travelers === n) {
        return { unitPrice: row.price, label: row.paxLabel };
      }
    }
  }
  // closest lower band
  const priced = [...groupDiscounts].sort((a, b) => a.price - b.price);
  return {
    unitPrice: priced[0]?.price || basePrice,
    label: priced[0]?.paxLabel || "Group rate",
  };
}

export function BookingFormClient({
  initialPackageHref,
  initialPackageTitle,
  initialPrice,
  initialCompareAt,
  initialDuration,
  groupDiscounts,
  packages,
}: Props) {
  const [packageHref, setPackageHref] = useState(initialPackageHref);
  const [packageTitle, setPackageTitle] = useState(initialPackageTitle);
  const [durationLabel, setDurationLabel] = useState(initialDuration);
  const [basePrice, setBasePrice] = useState(initialPrice);
  const [compareAt, setCompareAt] = useState<number | null>(initialCompareAt);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [addons, setAddons] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] =
    useState<BookingPaymentMethod>("pay_on_arrival");

  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingCountry, setBillingCountry] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{
    message: string;
    bookingId: string;
    grandTotal: number;
    paymentMethod: BookingPaymentMethod;
  } | null>(null);

  useEffect(() => {
    const pkg = packages.find((p) => p.href === packageHref);
    if (!pkg) return;
    setPackageTitle(pkg.label);
    setDurationLabel(pkg.durationLabel || durationLabel);
    if (pkg.price != null) setBasePrice(pkg.price);
    setCompareAt(pkg.compareAtPrice);
  }, [packageHref, packages]);

  const pricePick = useMemo(
    () => pickUnitPrice(travelers, basePrice, groupDiscounts),
    [travelers, basePrice, groupDiscounts],
  );

  const totals = useMemo(
    () =>
      calcBookingTotals({
        unitPrice: pricePick.unitPrice,
        travelers,
        paymentMethod,
      }),
    [pricePick.unitPrice, travelers, paymentMethod],
  );

  const online = paymentMethod !== "pay_on_arrival";

  const toggleAddon = (addon: string) => {
    setAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon],
    );
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageHref,
          packageTitle,
          durationLabel,
          name,
          email,
          country,
          whatsapp,
          travelers,
          startDate,
          endDate,
          specialRequests,
          addons,
          unitPrice: pricePick.unitPrice,
          compareAtPrice: compareAt,
          groupDiscountLabel: pricePick.label,
          paymentMethod,
          cardHolderName,
          cardNumber,
          cardExpiry,
          billingAddress,
          billingCity,
          billingCountry,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        customerMessage?: string;
        booking?: { id: string; grandTotal: number; paymentMethod: BookingPaymentMethod };
      };
      if (!res.ok || !data.ok || !data.booking) {
        setError(data.error || "Booking failed.");
        setLoading(false);
        return;
      }
      setDone({
        message:
          data.customerMessage ||
          "Thank you for booking with Summit Seek. Our team will contact you shortly.",
        bookingId: data.booking.id,
        grandTotal: data.booking.grandTotal,
        paymentMethod: data.booking.paymentMethod,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Network error. Please try again or WhatsApp us.");
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-white p-6 shadow-[0_20px_60px_rgba(8,18,30,0.08)] sm:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="size-8" />
        </div>
        <h1 className="mt-5 text-center font-[family-name:var(--font-display)] text-[1.75rem] font-bold text-[#0b1524]">
          Booking received
        </h1>
        <p className="mt-3 text-center font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
          {done.message}
        </p>
        <div className="mt-6 rounded-2xl border border-[#e8edf3] bg-[#f8fafc] p-4 text-[14px] text-[#0b1524]">
          <p>
            <span className="font-semibold text-[#5a6577]">Reference:</span>{" "}
            {done.bookingId}
          </p>
          <p className="mt-1">
            <span className="font-semibold text-[#5a6577]">Package:</span>{" "}
            {packageTitle}
          </p>
          <p className="mt-1">
            <span className="font-semibold text-[#5a6577]">Amount noted:</span>{" "}
            {formatUsd(done.grandTotal)}
            {done.paymentMethod === "pay_on_arrival"
              ? " (pay on arrival)"
              : done.paymentMethod === "online_deposit_10"
                ? " (10% + card fee)"
                : " (full + card fee)"}
          </p>
        </div>
        <p className="mt-5 text-center text-[13px] leading-relaxed text-[#5a6577]">
          Summit Seek team aapse jald contact karegi — WhatsApp / email par confirmation milegi.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href={packageHref || "/packages"}
            className="inline-flex h-11 items-center rounded-xl bg-[#0b1524] px-5 text-[13px] font-bold text-white"
          >
            Back to package
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-xl border border-[#d8dee8] px-5 text-[13px] font-bold text-[#0b1524]"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-[#d8dee8] bg-white px-3.5 py-3 text-[15px] text-[#0b1524] outline-none transition focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/15";
  const label = "mb-1.5 block text-[12px] font-bold uppercase tracking-[0.08em] text-[#5a6577]";

  return (
    <form onSubmit={onSubmit} className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-5 rounded-3xl border border-[#e8edf3] bg-white p-5 shadow-[0_18px_50px_rgba(8,18,30,0.06)] sm:p-7">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F58220]">
            Book with Summit Seek
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-[1.7rem] font-bold text-[#0b1524] sm:text-[2rem]">
            Trip booking form
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5a6577]">
            Package auto-selected hai. Aap change / add-ons / group size update kar sakte ho.
          </p>
        </div>

        <label className="block">
          <span className={label}>Package / Trip</span>
          <select
            className={field}
            value={packageHref}
            onChange={(e) => setPackageHref(e.target.value)}
            required
          >
            {!packages.some((p) => p.href === packageHref) && packageHref ? (
              <option value={packageHref}>{packageTitle || packageHref}</option>
            ) : null}
            {packages.map((pkg) => (
              <option key={pkg.href} value={pkg.href}>
                {pkg.label}
                {pkg.price != null ? ` — US$${pkg.price}` : ""}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={label}>Full name</span>
            <input className={field} required value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="block">
            <span className={label}>Email</span>
            <input
              type="email"
              className={field}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block">
            <span className={label}>WhatsApp number</span>
            <input
              className={field}
              required
              placeholder="+977…"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </label>
          <label className="block">
            <span className={label}>Country</span>
            <input
              className={field}
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <label className="block">
            <span className={label}>Group size (people)</span>
            <input
              type="number"
              min={1}
              max={40}
              className={field}
              required
              value={travelers}
              onChange={(e) => setTravelers(Math.max(1, Number(e.target.value) || 1))}
            />
          </label>
          <label className="block">
            <span className={label}>Start date</span>
            <input
              type="date"
              className={field}
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label className="block">
            <span className={label}>End date (optional)</span>
            <input
              type="date"
              className={field}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>

        <div>
          <p className={label}>Optional add-ons</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {ADDON_OPTIONS.map((addon) => (
              <label
                key={addon}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[13px] font-medium",
                  addons.includes(addon)
                    ? "border-[#1d4ed8] bg-[#eff6ff] text-[#1d4ed8]"
                    : "border-[#e2e8f0] text-[#0b1524]",
                )}
              >
                <input
                  type="checkbox"
                  checked={addons.includes(addon)}
                  onChange={() => toggleAddon(addon)}
                  className="size-4 accent-[#1d4ed8]"
                />
                {addon}
              </label>
            ))}
          </div>
        </div>

        <label className="block">
          <span className={label}>Special requests</span>
          <textarea
            className={field}
            rows={3}
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Diet, room share, celebration, altitude notes…"
          />
        </label>

        <div>
          <p className={label}>Payment option</p>
          <div className="mt-2 space-y-2">
            {(
              [
                ["pay_on_arrival", "Pay on arrival — no card fee"],
                ["online_deposit_10", "Pay online — 10% down payment + 4% card fee"],
                ["online_full", "Pay online — full amount + 4% card fee"],
              ] as const
            ).map(([value, text]) => (
              <label
                key={value}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 text-[14px]",
                  paymentMethod === value
                    ? "border-[#1d4ed8] bg-[#eff6ff]"
                    : "border-[#e2e8f0]",
                )}
              >
                <input
                  type="radio"
                  name="pay"
                  className="mt-1 accent-[#1d4ed8]"
                  checked={paymentMethod === value}
                  onChange={() => setPaymentMethod(value)}
                />
                <span className="font-semibold text-[#0b1524]">{text}</span>
              </label>
            ))}
          </div>
        </div>

        {online ? (
          <div className="space-y-4 rounded-2xl border border-[#cfe0f5] bg-[#f5f9ff] p-4 sm:p-5">
            <div className="flex items-center gap-2 text-[#1d4ed8]">
              <ShieldCheck className="size-4" />
              <p className="text-[13px] font-bold uppercase tracking-[0.08em]">
                Card & billing details
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className={label}>Name on card</span>
                <input
                  className={field}
                  required={online}
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className={label}>Card number</span>
                <input
                  className={field}
                  required={online}
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </label>
              <label className="block">
                <span className={label}>Expiry (MM/YY)</span>
                <input
                  className={field}
                  required={online}
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                />
              </label>
              <label className="block">
                <span className={label}>CVV</span>
                <input
                  className={field}
                  required={online}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className={label}>Billing address</span>
                <input
                  className={field}
                  required={online}
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                />
              </label>
              <label className="block">
                <span className={label}>City</span>
                <input
                  className={field}
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                />
              </label>
              <label className="block">
                <span className={label}>Billing country</span>
                <input
                  className={field}
                  value={billingCountry}
                  onChange={(e) => setBillingCountry(e.target.value)}
                />
              </label>
            </div>
            <p className="text-[12px] leading-relaxed text-[#5a6577]">
              Full card number is not stored. Admin receives last 4 digits + billing details.
              Summit Seek team confirms payment securely.
            </p>
          </div>
        ) : null}

        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1d4ed8] px-5 py-3.5 text-[14px] font-extrabold uppercase tracking-[0.06em] text-white shadow-[0_14px_32px_rgba(29,78,216,0.35)] disabled:opacity-60"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {loading ? "Submitting…" : "Confirm booking"}
        </button>
      </div>

      <aside className="h-fit rounded-3xl border border-[#e8edf3] bg-white p-5 shadow-[0_18px_50px_rgba(8,18,30,0.06)] sm:p-6 lg:sticky lg:top-24">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
          Price summary
        </p>
        <h2 className="mt-2 text-[1.15rem] font-bold leading-snug text-[#0b1524]">
          {packageTitle || "Select a package"}
        </h2>
        {durationLabel ? (
          <p className="mt-1 text-[13px] text-[#5a6577]">{durationLabel}</p>
        ) : null}

        <dl className="mt-5 space-y-2.5 text-[14px]">
          <div className="flex justify-between gap-3">
            <dt className="text-[#5a6577]">Per person</dt>
            <dd className="font-bold text-[#0b1524]">{formatUsd(pricePick.unitPrice)}</dd>
          </div>
          {compareAt && compareAt > pricePick.unitPrice ? (
            <div className="flex justify-between gap-3">
              <dt className="text-[#5a6577]">Was</dt>
              <dd className="text-[#9aa3b2] line-through">{formatUsd(compareAt)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-3">
            <dt className="text-[#5a6577]">Group band</dt>
            <dd className="font-semibold text-[#0b1524]">{pricePick.label}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#5a6577]">Travelers</dt>
            <dd className="font-semibold text-[#0b1524]">{totals.travelers}</dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-[#eef2f7] pt-2.5">
            <dt className="text-[#5a6577]">Trip subtotal</dt>
            <dd className="font-extrabold text-[#0b1524]">{formatUsd(totals.subtotal)}</dd>
          </div>
          {online ? (
            <>
              <div className="flex justify-between gap-3">
                <dt className="text-[#5a6577]">
                  {paymentMethod === "online_deposit_10" ? "10% deposit" : "Full payment"}
                </dt>
                <dd className="font-semibold">{formatUsd(totals.amountBeforeFee)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#5a6577]">Card fee (4%)</dt>
                <dd className="font-semibold">{formatUsd(totals.cardFee)}</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-[#eef2f7] pt-2.5">
                <dt className="font-bold text-[#0b1524]">Due now</dt>
                <dd className="text-[1.15rem] font-extrabold text-[#16a34a]">
                  {formatUsd(totals.grandTotal)}
                </dd>
              </div>
            </>
          ) : (
            <div className="flex justify-between gap-3 border-t border-[#eef2f7] pt-2.5">
              <dt className="font-bold text-[#0b1524]">Pay on arrival</dt>
              <dd className="text-[1.15rem] font-extrabold text-[#16a34a]">
                {formatUsd(totals.subtotal)}
              </dd>
            </div>
          )}
        </dl>

        {addons.length ? (
          <div className="mt-4 rounded-xl bg-[#f8fafc] p-3 text-[12px] text-[#5a6577]">
            <p className="font-bold text-[#0b1524]">Requested add-ons</p>
            <ul className="mt-1 list-disc pl-4">
              {addons.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </aside>
    </form>
  );
}
