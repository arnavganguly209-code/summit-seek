"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type {
  ParkEntryRow,
  PermitFeeRow,
  PermitsTimsContent,
} from "@/types/permits-tims-cms";
import { OrbitImageField } from "@/components/orbit/OrbitImageField";

type Props = { initial: PermitsTimsContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

export function PermitsTimsEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof PermitsTimsContent>(key: K, value: PermitsTimsContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: PermitsTimsContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/permits-tims", {
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
      setToast("Permits & TIMS page saved. Live site updated.");
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
          <h1 className="mt-1 text-2xl font-bold text-white">Permits & TIMS</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Full control of `/travel-guide/permits-tims` — cover, TIMS copy, restricted fees, park
            entry fees, and notes.
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
        <h2 className="mb-3 text-[14px] font-bold text-white">Intro & TIMS</h2>
        <div className="grid gap-3">
          {(
            [
              ["introEyebrow", "Eyebrow"],
              ["introHeading", "Intro heading"],
              ["introBody", "Intro body"],
              ["timsHeading", "TIMS heading"],
              ["timsBody", "TIMS body"],
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
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Restricted area permits</h2>
          <button
            type="button"
            onClick={() => {
              const item: PermitFeeRow = {
                id: `rp-${Date.now().toString(36)}`,
                region: "New region",
                fee: "",
                visible: true,
              };
              setContent((prev) => ({
                ...prev,
                restrictedPermits: [...prev.restrictedPermits, item],
              }));
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>Heading</span>
            <input className={field} value={content.restrictedHeading} onChange={(e) => update("restrictedHeading", e.target.value)} />
          </label>
          <label>
            <span className={label}>Intro</span>
            <input className={field} value={content.restrictedIntro} onChange={(e) => update("restrictedIntro", e.target.value)} />
          </label>
        </div>
        <div className="space-y-3">
          {content.restrictedPermits.map((row) => (
            <div key={row.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-2 flex justify-end gap-2">
                <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    checked={row.visible !== false}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        restrictedPermits: prev.restrictedPermits.map((r) =>
                          r.id === row.id ? { ...r, visible: e.target.checked } : r,
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
                      restrictedPermits: prev.restrictedPermits.filter((r) => r.id !== row.id),
                    }))
                  }
                  className="text-red-200"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <textarea
                rows={2}
                className={field}
                value={row.region}
                placeholder="Region"
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    restrictedPermits: prev.restrictedPermits.map((r) =>
                      r.id === row.id ? { ...r, region: e.target.value } : r,
                    ),
                  }))
                }
              />
              <textarea
                rows={2}
                className={`${field} mt-2`}
                value={row.fee}
                placeholder="Fee"
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    restrictedPermits: prev.restrictedPermits.map((r) =>
                      r.id === row.id ? { ...r, fee: e.target.value } : r,
                    ),
                  }))
                }
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Park / conservation entry fees</h2>
          <button
            type="button"
            onClick={() => {
              const item: ParkEntryRow = {
                id: `pk-${Date.now().toString(36)}`,
                name: "New park",
                nepali: "",
                saarc: "",
                foreigner: "",
                childNote: "Below 10 yrs free",
                whereToPay: "",
                visible: true,
              };
              setContent((prev) => ({ ...prev, parkEntries: [...prev.parkEntries, item] }));
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>Heading</span>
            <input className={field} value={content.parksHeading} onChange={(e) => update("parksHeading", e.target.value)} />
          </label>
          <label>
            <span className={label}>Intro</span>
            <input className={field} value={content.parksIntro} onChange={(e) => update("parksIntro", e.target.value)} />
          </label>
        </div>
        <div className="space-y-4">
          {content.parkEntries.map((park) => (
            <div key={park.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-2 flex justify-end gap-2">
                <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    checked={park.visible !== false}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        parkEntries: prev.parkEntries.map((p) =>
                          p.id === park.id ? { ...p, visible: e.target.checked } : p,
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
                      parkEntries: prev.parkEntries.filter((p) => p.id !== park.id),
                    }))
                  }
                  className="text-red-200"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <input
                className={field}
                value={park.name}
                placeholder="Park name"
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    parkEntries: prev.parkEntries.map((p) =>
                      p.id === park.id ? { ...p, name: e.target.value } : p,
                    ),
                  }))
                }
              />
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                <input
                  className={field}
                  value={park.nepali}
                  placeholder="Nepali fee"
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      parkEntries: prev.parkEntries.map((p) =>
                        p.id === park.id ? { ...p, nepali: e.target.value } : p,
                      ),
                    }))
                  }
                />
                <input
                  className={field}
                  value={park.saarc}
                  placeholder="SAARC fee"
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      parkEntries: prev.parkEntries.map((p) =>
                        p.id === park.id ? { ...p, saarc: e.target.value } : p,
                      ),
                    }))
                  }
                />
                <input
                  className={field}
                  value={park.foreigner}
                  placeholder="Foreigner fee"
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      parkEntries: prev.parkEntries.map((p) =>
                        p.id === park.id ? { ...p, foreigner: e.target.value } : p,
                      ),
                    }))
                  }
                />
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <input
                  className={field}
                  value={park.childNote}
                  placeholder="Child note"
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      parkEntries: prev.parkEntries.map((p) =>
                        p.id === park.id ? { ...p, childNote: e.target.value } : p,
                      ),
                    }))
                  }
                />
                <input
                  className={field}
                  value={park.whereToPay}
                  placeholder="Where to pay"
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      parkEntries: prev.parkEntries.map((p) =>
                        p.id === park.id ? { ...p, whereToPay: e.target.value } : p,
                      ),
                    }))
                  }
                />
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
        <label className="mb-3 block">
          <span className={label}>Notes heading</span>
          <input className={field} value={content.notesHeading} onChange={(e) => update("notesHeading", e.target.value)} />
        </label>
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
