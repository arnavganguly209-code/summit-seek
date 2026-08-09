"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type { AffiliateCard, AffiliateContent } from "@/types/affiliate-cms";
import { OrbitImageField } from "@/components/orbit/OrbitImageField";

type Props = { initial: AffiliateContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

export function AffiliateEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof AffiliateContent>(key: K, value: AffiliateContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: AffiliateContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/affiliate", {
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
      setToast("Affiliate page saved. Live site updated.");
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
    patch: Partial<AffiliateContent> | ((prev: AffiliateContent) => AffiliateContent),
  ) => {
    const next =
      typeof patch === "function" ? patch(contentRef.current) : { ...contentRef.current, ...patch };
    setContent(next);
    contentRef.current = next;
    await save(next);
  };

  const updateListItem = (
    listKey: "promoteMethods" | "steps",
    id: string,
    patch: Partial<AffiliateCard>,
  ) => {
    setContent((prev) => ({
      ...prev,
      [listKey]: prev[listKey].map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  };

  const renderListEditor = (listKey: "promoteMethods" | "steps", heading: string) => (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[14px] font-bold text-white">{heading}</h2>
        <button
          type="button"
          onClick={() => {
            const item: AffiliateCard = {
              id: `${listKey.slice(0, 2)}-${Date.now().toString(36)}`,
              title: "New item",
              description: "",
              imageUrl: "",
              visible: true,
            };
            setContent((prev) => ({ ...prev, [listKey]: [...prev[listKey], item] }));
          }}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
        >
          <Plus className="size-3.5" /> Add
        </button>
      </div>
      <div className="mt-4 space-y-4">
        {content[listKey].map((item, index) => (
          <div key={item.id} className="rounded-xl border border-white/10 p-3">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-[12px] font-bold uppercase tracking-wide text-white/50">
                Item {index + 1}
              </p>
              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    checked={item.visible !== false}
                    onChange={(e) =>
                      updateListItem(listKey, item.id, { visible: e.target.checked })
                    }
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      [listKey]: prev[listKey].filter((x) => x.id !== item.id),
                    }))
                  }
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 px-2.5 text-[11px] font-semibold text-red-200"
                >
                  <Trash2 className="size-3" /> Remove
                </button>
              </div>
            </div>
            <OrbitImageField
              label="Image (optional)"
              value={item.imageUrl}
              aspectClassName="aspect-[16/10]"
              onChange={(url) => updateListItem(listKey, item.id, { imageUrl: url })}
              onAfterChange={(url) =>
                setImageAndSave((prev) => ({
                  ...prev,
                  [listKey]: prev[listKey].map((x) =>
                    x.id === item.id ? { ...x, imageUrl: url } : x,
                  ),
                }))
              }
            />
            <div className="mt-3 grid gap-2">
              <input
                className={field}
                value={item.title}
                onChange={(e) => updateListItem(listKey, item.id, { title: e.target.value })}
                placeholder="Title"
              />
              <textarea
                rows={3}
                className={field}
                value={item.description}
                onChange={(e) =>
                  updateListItem(listKey, item.id, { description: e.target.value })
                }
                placeholder="Description"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">Website</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Affiliate Program</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Full control of `/affiliate` — cover, commission, promote methods, steps, guidelines, and
            CTA.
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
          onAfterChange={(url) => setImageAndSave({ coverImageUrl: url })}
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
        <h2 className="mb-3 text-[14px] font-bold text-white">Intro & overview</h2>
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
            <span className={label}>What is affiliate heading</span>
            <input className={field} value={content.whatHeading} onChange={(e) => update("whatHeading", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>What is affiliate body</span>
            <textarea rows={4} className={field} value={content.whatBody} onChange={(e) => update("whatBody", e.target.value)} />
          </label>
          <label>
            <span className={label}>Commission rate label</span>
            <input className={field} value={content.commissionRateLabel} onChange={(e) => update("commissionRateLabel", e.target.value)} />
          </label>
          <label>
            <span className={label}>Commission rate note</span>
            <input className={field} value={content.commissionRateNote} onChange={(e) => update("commissionRateNote", e.target.value)} />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">Section headings</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ["promoteHeading", "Promote heading"],
              ["promoteIntro", "Promote intro"],
              ["stepsHeading", "Steps heading"],
              ["stepsIntro", "Steps intro"],
              ["eligibilityHeading", "Eligibility heading"],
              ["commissionHeading", "Commission heading"],
              ["termsHeading", "Guidelines heading"],
            ] as const
          ).map(([key, lab]) => (
            <label key={key} className={key.includes("Intro") || key.includes("Heading") ? "" : ""}>
              <span className={label}>{lab}</span>
              <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
            </label>
          ))}
          <label className="sm:col-span-2">
            <span className={label}>Eligibility body</span>
            <textarea rows={4} className={field} value={content.eligibilityBody} onChange={(e) => update("eligibilityBody", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Commission body</span>
            <textarea rows={4} className={field} value={content.commissionBody} onChange={(e) => update("commissionBody", e.target.value)} />
          </label>
        </div>
      </section>

      {renderListEditor("promoteMethods", "Promote methods")}
      {renderListEditor("steps", "How to join steps")}

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-bold text-white">Guideline points</h2>
          <button
            type="button"
            onClick={() => update("termsPoints", [...content.termsPoints, "New guideline"])}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {content.termsPoints.map((point, index) => (
            <div key={index} className="flex gap-2">
              <input
                className={field}
                value={point}
                onChange={(e) => {
                  const next = [...content.termsPoints];
                  next[index] = e.target.value;
                  update("termsPoints", next);
                }}
              />
              <button
                type="button"
                onClick={() =>
                  update(
                    "termsPoints",
                    content.termsPoints.filter((_, i) => i !== index),
                  )
                }
                className="inline-flex h-10 shrink-0 items-center rounded-lg border border-red-400/30 bg-red-500/10 px-3 text-red-200"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">Highlight & CTA</h2>
        <OrbitImageField
          label="Highlight image"
          value={content.highlightImageUrl}
          aspectClassName="aspect-video"
          onChange={(url) => update("highlightImageUrl", url)}
          onAfterChange={(url) => setImageAndSave({ highlightImageUrl: url })}
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className={label}>Highlight heading</span>
            <input className={field} value={content.highlightHeading} onChange={(e) => update("highlightHeading", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Highlight body</span>
            <textarea rows={3} className={field} value={content.highlightBody} onChange={(e) => update("highlightBody", e.target.value)} />
          </label>
          <label>
            <span className={label}>CTA heading</span>
            <input className={field} value={content.ctaHeading} onChange={(e) => update("ctaHeading", e.target.value)} />
          </label>
          <label>
            <span className={label}>CTA body</span>
            <input className={field} value={content.ctaBody} onChange={(e) => update("ctaBody", e.target.value)} />
          </label>
          <label>
            <span className={label}>Primary button label</span>
            <input className={field} value={content.ctaPrimaryLabel} onChange={(e) => update("ctaPrimaryLabel", e.target.value)} />
          </label>
          <label>
            <span className={label}>Primary button link</span>
            <input className={field} value={content.ctaPrimaryHref} onChange={(e) => update("ctaPrimaryHref", e.target.value)} />
          </label>
          <label>
            <span className={label}>Secondary button label</span>
            <input className={field} value={content.ctaSecondaryLabel} onChange={(e) => update("ctaSecondaryLabel", e.target.value)} />
          </label>
          <label>
            <span className={label}>Secondary button link</span>
            <input className={field} value={content.ctaSecondaryHref} onChange={(e) => update("ctaSecondaryHref", e.target.value)} />
          </label>
        </div>
      </section>
    </div>
  );
}
