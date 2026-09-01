"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type {
  UpcomingMonthTab,
  UpcomingTrip,
  UpcomingTripsContent,
} from "@/types/upcoming-trips";
import {
  normalizePackageHref,
  type LinkablePackageOption,
} from "@/lib/orbit/package-hrefs";

type Props = {
  initial: UpcomingTripsContent;
  packages: LinkablePackageOption[];
};

function newTrip(): UpcomingTrip {
  return {
    id: `trip-${Date.now().toString(36)}`,
    title: "Select a package",
    durationDays: 1,
    startsLabel: "Oct 01, 2026",
    endsLabel: "Oct 10, 2026",
    status: "Available",
    badgeLabel: "4 seat",
    price: 0,
    compareAtPrice: null,
    bookHref: "",
    visible: true,
  };
}

function newMonth(): UpcomingMonthTab {
  return {
    id: `month-${Date.now().toString(36)}`,
    label: "Dec 2026",
    trips: [newTrip()],
  };
}

export function UpcomingTripsEditor({ initial, packages }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [activeMonth, setActiveMonth] = useState(initial.months[0]?.id || "");
  const [saving, setSaving] = useState(false);
  const [resolvingTripId, setResolvingTripId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const month =
    content.months.find((m) => m.id === activeMonth) || content.months[0];

  const updateMeta = <K extends keyof UpcomingTripsContent>(
    key: K,
    value: UpcomingTripsContent[K],
  ) => setContent((prev) => ({ ...prev, [key]: value }));

  const updateMonth = (id: string, patch: Partial<UpcomingMonthTab>) => {
    setContent((prev) => ({
      ...prev,
      months: prev.months.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));
  };

  const updateTrip = (
    monthId: string,
    tripId: string,
    patch: Partial<UpcomingTrip>,
  ) => {
    setContent((prev) => ({
      ...prev,
      months: prev.months.map((m) =>
        m.id !== monthId
          ? m
          : {
              ...m,
              trips: m.trips.map((t) => (t.id === tripId ? { ...t, ...patch } : t)),
            },
      ),
    }));
  };

  const pickPackage = async (monthId: string, tripId: string, href: string) => {
    if (!href) return;
    setResolvingTripId(tripId);
    setError("");
    try {
      const res = await fetch(
        `/api/orbit/resolve-package?href=${encodeURIComponent(href)}`,
      );
      const data = (await res.json()) as {
        ok?: boolean;
        href?: string;
        title?: string;
        durationDays?: number;
        price?: number;
        compareAtPrice?: number | null;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.href) {
        updateTrip(monthId, tripId, { bookHref: normalizePackageHref(href) });
        setError(data.error || "Could not load package details.");
        setResolvingTripId(null);
        return;
      }
      updateTrip(monthId, tripId, {
        bookHref: data.href,
        title: data.title || "",
        durationDays: data.durationDays || 1,
        price: data.price || 0,
        compareAtPrice: data.compareAtPrice ?? null,
      });
    } catch {
      updateTrip(monthId, tripId, { bookHref: normalizePackageHref(href) });
      setError("Network error while loading package.");
    }
    setResolvingTripId(null);
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setToast("");
    try {
      for (const month of content.months) {
        for (const trip of month.trips) {
          if (!trip.bookHref || !normalizePackageHref(trip.bookHref)) {
            setError(`Trip "${trip.title}" in ${month.label} needs a linked package.`);
            setSaving(false);
            return;
          }
        }
      }
      const res = await fetch("/api/orbit/upcoming-trips", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to save.");
        setSaving(false);
        return;
      }
      setToast("Upcoming trips saved. Live homepage updated.");
      setSaving(false);
      router.refresh();
    } catch {
      setError("Network error while saving.");
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Homepage
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">Upcoming Trips</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Add month tabs, pick linked packages, set departure dates, seats, and status.
            Title and price sync from the package page on the live site.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#F58220] px-5 text-[13px] font-bold text-[#08121E] disabled:opacity-60"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Saving…" : "Save & Publish"}
        </button>
      </div>

      {toast ? (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-[13px] text-emerald-300">
          <CheckCircle2 className="size-4" />
          {toast}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-300">
          {error}
        </div>
      ) : null}

      <div className="grid gap-3 rounded-xl border border-white/10 bg-[#0d1420] p-4 sm:grid-cols-2">
        <Field label="Eyebrow" value={content.eyebrow} onChange={(v) => updateMeta("eyebrow", v)} />
        <Field label="Heading" value={content.heading} onChange={(v) => updateMeta("heading", v)} />
        <Field label="Book button" value={content.bookLabel} onChange={(v) => updateMeta("bookLabel", v)} />
        <Field label="View all label" value={content.viewAllLabel} onChange={(v) => updateMeta("viewAllLabel", v)} />
        <Field label="View all link" value={content.viewAllHref} onChange={(v) => updateMeta("viewAllHref", v)} />
        <Field label="Note title" value={content.noteTitle} onChange={(v) => updateMeta("noteTitle", v)} />
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
            Note body
          </span>
          <textarea
            value={content.noteBody}
            onChange={(e) => updateMeta("noteBody", e.target.value)}
            rows={3}
            className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-[13px] text-white outline-none focus:border-[#F58220]/50"
          />
        </label>
        <label className="flex items-center gap-2 text-[13px] text-white/70 sm:col-span-2">
          <input
            type="checkbox"
            checked={content.visible}
            onChange={(e) => updateMeta("visible", e.target.checked)}
            className="size-3.5 accent-[#F58220]"
          />
          Section visible
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {content.months.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActiveMonth(m.id)}
            className={`rounded-lg px-3 py-2 text-[13px] font-semibold ${
              m.id === month?.id
                ? "bg-[#F58220]/15 text-[#F58220]"
                : "text-white/60 hover:bg-white/5"
            }`}
          >
            {m.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            const m = newMonth();
            setContent((prev) => ({ ...prev, months: [...prev.months, m] }));
            setActiveMonth(m.id);
          }}
          className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-2 text-[12px] font-semibold"
        >
          <Plus className="size-3.5" /> Month
        </button>
      </div>

      {month ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-end gap-3 rounded-xl border border-white/10 bg-[#0d1420] p-4">
            <div className="min-w-[180px] flex-1">
              <Field
                label="Month tab label"
                value={month.label}
                onChange={(v) => updateMonth(month.id, { label: v })}
              />
            </div>
            <button
              type="button"
              onClick={() =>
                updateMonth(month.id, { trips: [...month.trips, newTrip()] })
              }
              className="inline-flex h-10 items-center gap-1.5 rounded-md border border-white/15 px-3 text-[12px] font-semibold"
            >
              <Plus className="size-3.5" /> Add trip
            </button>
            <button
              type="button"
              onClick={() => {
                if (!window.confirm("Remove this month tab?")) return;
                setContent((prev) => {
                  const months = prev.months.filter((m) => m.id !== month.id);
                  setActiveMonth(months[0]?.id || "");
                  return { ...prev, months };
                });
              }}
              className="inline-flex h-10 items-center gap-1.5 rounded-md border border-red-500/30 px-3 text-[12px] font-semibold text-red-300"
            >
              <Trash2 className="size-3.5" /> Remove month
            </button>
          </div>

          {month.trips.map((trip, index) => (
            <div
              key={trip.id}
              className="space-y-3 rounded-xl border border-white/10 bg-[#0d1420] p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-bold">Trip {index + 1}</p>
                <div className="flex items-center gap-3 text-[12px] text-white/55">
                  <label className="inline-flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={trip.visible !== false}
                      onChange={(e) =>
                        updateTrip(month.id, trip.id, { visible: e.target.checked })
                      }
                      className="size-3.5 accent-[#F58220]"
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      updateMonth(month.id, {
                        trips: month.trips.filter((t) => t.id !== trip.id),
                      })
                    }
                    className="text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <PackageSelect
                label="Linked package"
                packages={packages}
                value={normalizePackageHref(trip.bookHref)}
                loading={resolvingTripId === trip.id}
                onChange={(href) => void pickPackage(month.id, trip.id, href)}
              />
              <p className="text-[12px] text-white/45">
                Live site shows title, days, and price from{" "}
                <span className="font-mono text-white/60">{trip.bookHref || "—"}</span>
              </p>
              <Field
                label="Title (fallback)"
                value={trip.title}
                onChange={(v) => updateTrip(month.id, trip.id, { title: v })}
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Field
                  label="Days"
                  value={String(trip.durationDays)}
                  onChange={(v) =>
                    updateTrip(month.id, trip.id, { durationDays: Number(v) || 1 })
                  }
                />
                <Field
                  label="Status"
                  value={trip.status}
                  onChange={(v) => updateTrip(month.id, trip.id, { status: v })}
                />
                <Field
                  label="Badge"
                  value={trip.badgeLabel}
                  onChange={(v) => updateTrip(month.id, trip.id, { badgeLabel: v })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Field
                  label="Starts"
                  value={trip.startsLabel}
                  onChange={(v) => updateTrip(month.id, trip.id, { startsLabel: v })}
                />
                <Field
                  label="Ends"
                  value={trip.endsLabel}
                  onChange={(v) => updateTrip(month.id, trip.id, { endsLabel: v })}
                />
                <Field
                  label="Price (fallback)"
                  value={String(trip.price)}
                  onChange={(v) =>
                    updateTrip(month.id, trip.id, { price: Number(v) || 0 })
                  }
                />
                <Field
                  label="Compare at (fallback)"
                  value={
                    trip.compareAtPrice == null ? "" : String(trip.compareAtPrice)
                  }
                  onChange={(v) =>
                    updateTrip(month.id, trip.id, {
                      compareAtPrice: v === "" ? null : Number(v) || 0,
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PackageSelect({
  label,
  packages,
  value,
  loading,
  onChange,
}: {
  label: string;
  packages: LinkablePackageOption[];
  value: string;
  loading?: boolean;
  onChange: (href: string) => void;
}) {
  const groups = ["Packages", "Treks", "Tours"] as const;

  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={loading}
          className="h-10 w-full appearance-none rounded-md border border-white/10 bg-black/30 px-3 pr-10 text-[13px] text-white outline-none focus:border-[#F58220]/50 disabled:opacity-60"
        >
          <option value="">Select package…</option>
          {groups.map((group) => {
            const items = packages.filter((pkg) => pkg.group === group);
            if (!items.length) return null;
            return (
              <optgroup key={group} label={group}>
                {items.map((pkg) => (
                  <option key={pkg.href} value={pkg.href}>
                    {pkg.label}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
        {loading ? (
          <Loader2 className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-[#F58220]" />
        ) : null}
      </div>
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
      />
    </label>
  );
}
