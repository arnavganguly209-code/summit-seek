"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type {
  DayToursListingContent,
  DayToursPackageLink,
} from "@/types/day-tours-listing";
import {
  normalizePackageHref,
  type LinkablePackageOption,
} from "@/lib/orbit/package-hrefs";

type Props = {
  initial: DayToursListingContent;
  packages: LinkablePackageOption[];
};

function newPackageLink(): DayToursPackageLink {
  return {
    id: `dt-${Date.now().toString(36)}`,
    href: "",
    startLocation: "Kathmandu",
    reviewCount: 0,
    visible: true,
  };
}

export function DayToursListingEditor({ initial, packages }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const tourOptions = packages.filter((pkg) => pkg.group === "Tours");

  const updateMeta = <K extends keyof DayToursListingContent>(
    key: K,
    value: DayToursListingContent[K],
  ) => setContent((prev) => ({ ...prev, [key]: value }));

  const updatePackage = (id: string, patch: Partial<DayToursPackageLink>) => {
    setContent((prev) => ({
      ...prev,
      packages: prev.packages.map((pkg) => (pkg.id === id ? { ...pkg, ...patch } : pkg)),
    }));
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setToast("");
    try {
      for (const pkg of content.packages) {
        if (!pkg.href) {
          setError("Every package row needs a linked tour page.");
          setSaving(false);
          return;
        }
      }
      const res = await fetch("/api/orbit/day-tours", {
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
      setToast("Day tours listing saved. Live site updated.");
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
            Listings
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">Day Tours</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Edit the /day-tours page header and linked packages. Title, image, and price sync
            from each tour page on the live site.
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
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
            Description
          </span>
          <textarea
            value={content.description}
            onChange={(e) => updateMeta("description", e.target.value)}
            rows={3}
            className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-[13px] text-white outline-none focus:border-[#F58220]/50"
          />
        </label>
        <Field
          label="Meta title"
          value={content.metaTitle}
          onChange={(v) => updateMeta("metaTitle", v)}
        />
        <Field
          label="Meta description"
          value={content.metaDescription}
          onChange={(v) => updateMeta("metaDescription", v)}
        />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-white">Package links</h2>
        <button
          type="button"
          onClick={() =>
            setContent((prev) => ({
              ...prev,
              packages: [...prev.packages, newPackageLink()],
            }))
          }
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-[12px] font-semibold text-white"
        >
          <Plus className="size-3.5" /> Add package
        </button>
      </div>

      {content.packages.map((pkg, index) => (
        <div
          key={pkg.id}
          className="space-y-3 rounded-xl border border-white/10 bg-[#0d1420] p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold">Package {index + 1}</p>
            <div className="flex items-center gap-3 text-[12px] text-white/55">
              <label className="inline-flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={pkg.visible !== false}
                  onChange={(e) => updatePackage(pkg.id, { visible: e.target.checked })}
                  className="size-3.5 accent-[#F58220]"
                />
                Visible
              </label>
              <button
                type="button"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    packages: prev.packages.filter((p) => p.id !== pkg.id),
                  }))
                }
                className="text-red-300"
              >
                Remove
              </button>
            </div>
          </div>

          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
              Linked tour page
            </span>
            <select
              value={normalizePackageHref(pkg.href)}
              onChange={(e) => updatePackage(pkg.id, { href: e.target.value })}
              className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
            >
              <option value="">Select tour…</option>
              {tourOptions.map((option) => (
                <option key={option.href} value={option.href}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Field
              label="Start location"
              value={pkg.startLocation}
              onChange={(v) => updatePackage(pkg.id, { startLocation: v })}
            />
            <Field
              label="Review count"
              value={String(pkg.reviewCount)}
              onChange={(v) => updatePackage(pkg.id, { reviewCount: Number(v) || 0 })}
            />
          </div>
        </div>
      ))}
    </div>
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
