"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type {
  NepalVisaContent,
  VisaFee,
  VisaInfoItem,
} from "@/types/nepal-visa-cms";
import { OrbitImageField } from "@/components/orbit/OrbitImageField";

type Props = { initial: NepalVisaContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

export function NepalVisaEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof NepalVisaContent>(key: K, value: NepalVisaContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: NepalVisaContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/nepal-visa", {
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
      setToast("Nepal Visa page saved. Live site updated.");
      setSaving(false);
      router.refresh();
      return true;
    } catch {
      setError("Network error while saving.");
      setSaving(false);
      return false;
    }
  };

  const setImageAndSave = async (url: string) => {
    const next = { ...contentRef.current, coverImageUrl: url };
    setContent(next);
    contentRef.current = next;
    await save(next);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Travel Guide
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">Nepal Visa</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Full control of `/travel-guide/nepal-visa` — cover, fees, requirements, entry points, and
            notes.
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
          onAfterChange={(url) => void setImageAndSave(url)}
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
          <label className="sm:col-span-2">
            <span className={label}>Alert / restricted nationality note</span>
            <textarea rows={3} className={field} value={content.alertText} onChange={(e) => update("alertText", e.target.value)} />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-bold text-white">Requirements</h2>
          <button
            type="button"
            onClick={() => {
              const item: VisaInfoItem = {
                id: `req-${Date.now().toString(36)}`,
                title: "New requirement",
                description: "",
                visible: true,
              };
              setContent((prev) => ({ ...prev, requirements: [...prev.requirements, item] }));
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>Section heading</span>
            <input className={field} value={content.requirementsHeading} onChange={(e) => update("requirementsHeading", e.target.value)} />
          </label>
          <label>
            <span className={label}>Section intro</span>
            <input className={field} value={content.requirementsIntro} onChange={(e) => update("requirementsIntro", e.target.value)} />
          </label>
        </div>
        <div className="space-y-3">
          {content.requirements.map((item, index) => (
            <div key={item.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[12px] font-bold text-white/50">Item {index + 1}</p>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                    <input
                      type="checkbox"
                      checked={item.visible !== false}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          requirements: prev.requirements.map((r) =>
                            r.id === item.id ? { ...r, visible: e.target.checked } : r,
                          ),
                        }))
                      }
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        requirements: prev.requirements.filter((r) => r.id !== item.id),
                      }))
                    }
                    className="text-red-200"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
              <input
                className={field}
                value={item.title}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    requirements: prev.requirements.map((r) =>
                      r.id === item.id ? { ...r, title: e.target.value } : r,
                    ),
                  }))
                }
              />
              <textarea
                rows={2}
                className={`${field} mt-2`}
                value={item.description}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    requirements: prev.requirements.map((r) =>
                      r.id === item.id ? { ...r, description: e.target.value } : r,
                    ),
                  }))
                }
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-bold text-white">Visa fees</h2>
          <button
            type="button"
            onClick={() => {
              const item: VisaFee = {
                id: `fee-${Date.now().toString(36)}`,
                label: "New fee",
                price: "",
                note: "",
                visible: true,
              };
              setContent((prev) => ({ ...prev, fees: [...prev.fees, item] }));
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>Fees heading</span>
            <input className={field} value={content.feesHeading} onChange={(e) => update("feesHeading", e.target.value)} />
          </label>
          <label>
            <span className={label}>Fees intro</span>
            <input className={field} value={content.feesIntro} onChange={(e) => update("feesIntro", e.target.value)} />
          </label>
        </div>
        <div className="space-y-3">
          {content.fees.map((fee, index) => (
            <div key={fee.id} className="grid gap-2 rounded-xl border border-white/10 p-3 sm:grid-cols-3">
              <input
                className={field}
                value={fee.label}
                placeholder="Label"
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    fees: prev.fees.map((f) =>
                      f.id === fee.id ? { ...f, label: e.target.value } : f,
                    ),
                  }))
                }
              />
              <input
                className={field}
                value={fee.price}
                placeholder="Price"
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    fees: prev.fees.map((f) =>
                      f.id === fee.id ? { ...f, price: e.target.value } : f,
                    ),
                  }))
                }
              />
              <div className="flex gap-2">
                <input
                  className={field}
                  value={fee.note}
                  placeholder="Note"
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      fees: prev.fees.map((f) =>
                        f.id === fee.id ? { ...f, note: e.target.value } : f,
                      ),
                    }))
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      fees: prev.fees.filter((f) => f.id !== fee.id),
                    }))
                  }
                  className="shrink-0 text-red-200"
                  aria-label={`Remove fee ${index + 1}`}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Entry points</h2>
          <button
            type="button"
            onClick={() => update("entryPoints", [...content.entryPoints, "New entry point"])}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <label className="mb-3 block">
          <span className={label}>Heading</span>
          <input className={field} value={content.entryPointsHeading} onChange={(e) => update("entryPointsHeading", e.target.value)} />
        </label>
        <div className="space-y-2">
          {content.entryPoints.map((point, index) => (
            <div key={index} className="flex gap-2">
              <input
                className={field}
                value={point}
                onChange={(e) => {
                  const next = [...content.entryPoints];
                  next[index] = e.target.value;
                  update("entryPoints", next);
                }}
              />
              <button
                type="button"
                onClick={() =>
                  update(
                    "entryPoints",
                    content.entryPoints.filter((_, i) => i !== index),
                  )
                }
                className="text-red-200"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">Extension, transit & address</h2>
        <div className="grid gap-3">
          {(
            [
              ["extensionHeading", "Extension heading"],
              ["extensionBody", "Extension body"],
              ["transitHeading", "Transit heading"],
              ["transitBody", "Transit body"],
              ["addressHeading", "Address tip heading"],
              ["addressBody", "Address tip body"],
              ["notesHeading", "Notes heading"],
            ] as const
          ).map(([key, lab]) => (
            <label key={key}>
              <span className={label}>{lab}</span>
              {key.includes("Body") ? (
                <textarea rows={4} className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
              ) : (
                <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
              )}
            </label>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold text-white/60">Notes list</p>
            <button
              type="button"
              onClick={() => update("notes", [...content.notes, "New note"])}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 px-2 text-[11px]"
            >
              <Plus className="size-3" /> Add
            </button>
          </div>
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
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">CTA</h2>
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
