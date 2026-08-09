"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type { BestTimeContent, TrekSeason } from "@/types/best-time-cms";
import { OrbitImageField } from "@/components/orbit/OrbitImageField";

type Props = { initial: BestTimeContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

export function BestTimeEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof BestTimeContent>(key: K, value: BestTimeContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: BestTimeContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/best-time", {
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
      setToast("Best Time page saved. Live site updated.");
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
    patch: Partial<BestTimeContent> | ((prev: BestTimeContent) => BestTimeContent),
  ) => {
    const next =
      typeof patch === "function" ? patch(contentRef.current) : { ...contentRef.current, ...patch };
    setContent(next);
    contentRef.current = next;
    await save(next);
  };

  const updateSeason = (id: string, patch: Partial<TrekSeason>) => {
    setContent((prev) => ({
      ...prev,
      seasons: prev.seasons.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Travel Guide
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">Best Time to Visit</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Full control of `/travel-guide/best-time-to-visit` — cover, seasons, images, notes, CTA.
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
              ["metaTitle", "Meta title"],
              ["metaDescription", "Meta description"],
            ] as const
          ).map(([key, lab]) => (
            <label
              key={key}
              className={key.includes("Subtitle") || key.includes("Description") ? "sm:col-span-2" : ""}
            >
              <span className={label}>{lab}</span>
              <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">Intro</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>Eyebrow</span>
            <input className={field} value={content.introEyebrow} onChange={(e) => update("introEyebrow", e.target.value)} />
          </label>
          <label>
            <span className={label}>Heading</span>
            <input className={field} value={content.introHeading} onChange={(e) => update("introHeading", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Intro body</span>
            <textarea rows={4} className={field} value={content.introBody} onChange={(e) => update("introBody", e.target.value)} />
          </label>
          <label>
            <span className={label}>Seasons heading</span>
            <input className={field} value={content.seasonsHeading} onChange={(e) => update("seasonsHeading", e.target.value)} />
          </label>
          <label>
            <span className={label}>Seasons intro</span>
            <input className={field} value={content.seasonsIntro} onChange={(e) => update("seasonsIntro", e.target.value)} />
          </label>
          <label>
            <span className={label}>Summary heading</span>
            <input className={field} value={content.summaryHeading} onChange={(e) => update("summaryHeading", e.target.value)} />
          </label>
          <label>
            <span className={label}>Notes heading</span>
            <input className={field} value={content.notesHeading} onChange={(e) => update("notesHeading", e.target.value)} />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Seasons</h2>
          <button
            type="button"
            onClick={() => {
              const season: TrekSeason = {
                id: `season-${Date.now().toString(36)}`,
                name: "New season",
                months: "",
                tagline: "",
                description: "",
                highlights: [],
                condition: "",
                imageUrl: "",
                visible: true,
              };
              setContent((prev) => ({ ...prev, seasons: [...prev.seasons, season] }));
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add season
          </button>
        </div>
        <div className="space-y-4">
          {content.seasons.map((season, index) => (
            <div key={season.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[12px] font-bold uppercase tracking-wide text-white/50">
                  Season {index + 1}
                </p>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                    <input
                      type="checkbox"
                      checked={season.visible !== false}
                      onChange={(e) => updateSeason(season.id, { visible: e.target.checked })}
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        seasons: prev.seasons.filter((s) => s.id !== season.id),
                      }))
                    }
                    className="text-red-200"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
              <OrbitImageField
                label="Season image (optional)"
                value={season.imageUrl}
                aspectClassName="aspect-video"
                onChange={(url) => updateSeason(season.id, { imageUrl: url })}
                onAfterChange={(url) =>
                  void setImageAndSave((prev) => ({
                    ...prev,
                    seasons: prev.seasons.map((s) =>
                      s.id === season.id ? { ...s, imageUrl: url } : s,
                    ),
                  }))
                }
              />
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <input
                  className={field}
                  value={season.name}
                  placeholder="Name"
                  onChange={(e) => updateSeason(season.id, { name: e.target.value })}
                />
                <input
                  className={field}
                  value={season.months}
                  placeholder="Months"
                  onChange={(e) => updateSeason(season.id, { months: e.target.value })}
                />
                <input
                  className={field}
                  value={season.tagline}
                  placeholder="Tagline"
                  onChange={(e) => updateSeason(season.id, { tagline: e.target.value })}
                />
                <input
                  className={field}
                  value={season.condition}
                  placeholder="Condition"
                  onChange={(e) => updateSeason(season.id, { condition: e.target.value })}
                />
                <textarea
                  rows={3}
                  className={`${field} sm:col-span-2`}
                  value={season.description}
                  placeholder="Description"
                  onChange={(e) => updateSeason(season.id, { description: e.target.value })}
                />
                <label className="sm:col-span-2">
                  <span className={label}>Highlights (one per line)</span>
                  <textarea
                    rows={4}
                    className={field}
                    value={season.highlights.join("\n")}
                    onChange={(e) =>
                      updateSeason(season.id, {
                        highlights: e.target.value
                          .split("\n")
                          .map((l) => l.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Notes & CTA</h2>
          <button
            type="button"
            onClick={() => update("notes", [...content.notes, "New note"])}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add note
          </button>
        </div>
        <div className="mb-4 space-y-2">
          {content.notes.map((note, index) => (
            <div key={index} className="flex gap-2">
              <input
                className={field}
                value={note}
                onChange={(e) => {
                  const next = [...content.notes];
                  next[index] = e.target.value;
                  update("notes", next);
                }}
              />
              <button
                type="button"
                onClick={() => update("notes", content.notes.filter((_, i) => i !== index))}
                className="text-red-200"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ["ctaHeading", "CTA heading"],
              ["ctaBody", "CTA body"],
              ["ctaPrimaryLabel", "Primary label"],
              ["ctaPrimaryHref", "Primary link"],
              ["ctaSecondaryLabel", "Secondary label"],
              ["ctaSecondaryHref", "Secondary link"],
            ] as const
          ).map(([key, lab]) => (
            <label key={key} className={key === "ctaBody" ? "sm:col-span-2" : ""}>
              <span className={label}>{lab}</span>
              <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
