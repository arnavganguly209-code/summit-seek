"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type {
  DestinationPackage,
  DestinationRegionContent,
} from "@/types/destination-region-cms";
import { OrbitImageField } from "@/components/orbit/OrbitImageField";

type Props = { initial: DestinationRegionContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

export function EverestRegionEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof DestinationRegionContent>(
    key: K,
    value: DestinationRegionContent[K],
  ) => setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: DestinationRegionContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/everest-region", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to save.");
        setSaving(false);
        return false;
      }
      setContent(payload);
      contentRef.current = payload;
      setToast("Everest Region page saved. Live site updated.");
      setSaving(false);
      router.refresh();
      return true;
    } catch {
      setError("Network error while saving.");
      setSaving(false);
      return false;
    }
  };

  const setImageAndSave = async (
    patch:
      | Partial<DestinationRegionContent>
      | ((prev: DestinationRegionContent) => DestinationRegionContent),
  ) => {
    const next =
      typeof patch === "function" ? patch(contentRef.current) : { ...contentRef.current, ...patch };
    setContent(next);
    contentRef.current = next;
    await save(next);
  };

  const updatePackage = (index: number, patch: Partial<DestinationPackage>) => {
    const next = [...content.packages];
    next[index] = { ...next[index], ...patch };
    update("packages", next);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Destinations
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">Everest Region</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Full control of `/destinations/everest-region` — cover, intro, and the 2×2 package grid
            (images, prices, Trip Details links).
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
        <p className="flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-[13px] text-emerald-100">
          <CheckCircle2 className="size-4" /> {toast}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">
          {error}
        </p>
      ) : null}

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">Cover & SEO</h2>
        <OrbitImageField
          label="Cover image"
          value={content.coverImageUrl}
          aspectClassName="aspect-[21/7]"
          onChange={(url) => update("coverImageUrl", url)}
          onAfterChange={(url) => void setImageAndSave({ coverImageUrl: url })}
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["coverTitle", "Cover title"],
              ["coverSubtitle", "Cover subtitle"],
              ["eyebrow", "Eyebrow"],
              ["heading", "Page heading"],
              ["packagesHeading", "Packages section heading"],
              ["metaTitle", "Meta title"],
              ["metaDescription", "Meta description"],
            ] as const
          ).map(([key, lab]) => (
            <label
              key={key}
              className={
                key.includes("Subtitle") ||
                key.includes("Description") ||
                key === "heading" ||
                key === "packagesHeading"
                  ? "sm:col-span-2"
                  : ""
              }
            >
              <span className={label}>{lab}</span>
              <input
                className={field}
                value={content[key]}
                onChange={(e) => update(key, e.target.value)}
              />
            </label>
          ))}
          <label className="sm:col-span-2">
            <span className={label}>Intro text</span>
            <textarea
              rows={4}
              className={field}
              value={content.intro}
              onChange={(e) => update("intro", e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-bold text-white">Packages (2×2 grid)</h2>
          <button
            type="button"
            onClick={() =>
              update("packages", [
                ...content.packages,
                {
                  id: `evr-${Date.now()}`,
                  title: "New Everest Trek",
                  durationDays: 10,
                  rating: 5,
                  reviewCount: 1,
                  startLocation: "Kathmandu",
                  price: 999,
                  compareAtPrice: 1199,
                  href: "/contact",
                  imageUrl: "",
                  ctaLabel: "Trip Details",
                  visible: true,
                } satisfies DestinationPackage,
              ])
            }
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add package
          </button>
        </div>

        <div className="space-y-5">
          {content.packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-bold text-white">Package {index + 1}</p>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-[12px] text-white/70">
                    <input
                      type="checkbox"
                      checked={pkg.visible !== false}
                      onChange={(e) => updatePackage(index, { visible: e.target.checked })}
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      update(
                        "packages",
                        content.packages.filter((_, i) => i !== index),
                      )
                    }
                    className="text-red-200"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              <OrbitImageField
                label="Package image"
                value={pkg.imageUrl}
                aspectClassName="aspect-[16/10]"
                onChange={(url) => updatePackage(index, { imageUrl: url })}
                onAfterChange={(url) =>
                  void setImageAndSave((prev) => {
                    const packages = [...prev.packages];
                    packages[index] = { ...packages[index], imageUrl: url };
                    return { ...prev, packages };
                  })
                }
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className={label}>Title</span>
                  <input
                    className={field}
                    value={pkg.title}
                    onChange={(e) => updatePackage(index, { title: e.target.value })}
                  />
                </label>
                <label>
                  <span className={label}>Duration (days)</span>
                  <input
                    type="number"
                    className={field}
                    value={pkg.durationDays}
                    onChange={(e) =>
                      updatePackage(index, { durationDays: Number(e.target.value) || 0 })
                    }
                  />
                </label>
                <label>
                  <span className={label}>Start location</span>
                  <input
                    className={field}
                    value={pkg.startLocation}
                    onChange={(e) => updatePackage(index, { startLocation: e.target.value })}
                  />
                </label>
                <label>
                  <span className={label}>Price</span>
                  <input
                    type="number"
                    className={field}
                    value={pkg.price}
                    onChange={(e) => updatePackage(index, { price: Number(e.target.value) || 0 })}
                  />
                </label>
                <label>
                  <span className={label}>Compare-at price</span>
                  <input
                    type="number"
                    className={field}
                    value={pkg.compareAtPrice ?? ""}
                    onChange={(e) =>
                      updatePackage(index, {
                        compareAtPrice: e.target.value === "" ? null : Number(e.target.value) || 0,
                      })
                    }
                  />
                </label>
                <label>
                  <span className={label}>Rating</span>
                  <input
                    type="number"
                    step="0.1"
                    className={field}
                    value={pkg.rating}
                    onChange={(e) => updatePackage(index, { rating: Number(e.target.value) || 0 })}
                  />
                </label>
                <label>
                  <span className={label}>Review count</span>
                  <input
                    type="number"
                    className={field}
                    value={pkg.reviewCount}
                    onChange={(e) =>
                      updatePackage(index, { reviewCount: Number(e.target.value) || 0 })
                    }
                  />
                </label>
                <label>
                  <span className={label}>Trip Details link</span>
                  <input
                    className={field}
                    value={pkg.href}
                    onChange={(e) => updatePackage(index, { href: e.target.value })}
                  />
                </label>
                <label>
                  <span className={label}>CTA label</span>
                  <input
                    className={field}
                    value={pkg.ctaLabel}
                    onChange={(e) => updatePackage(index, { ctaLabel: e.target.value })}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end pb-8">
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
    </div>
  );
}
