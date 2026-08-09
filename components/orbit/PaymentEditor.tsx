"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type {
  PaymentBankField,
  PaymentContent,
  PaymentMethod,
} from "@/types/payment-cms";
import { OrbitImageField } from "@/components/orbit/OrbitImageField";

type Props = { initial: PaymentContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

export function PaymentEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof PaymentContent>(key: K, value: PaymentContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: PaymentContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/payment", {
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
      setToast("Payment page saved. Live site updated.");
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
    patch: Partial<PaymentContent> | ((prev: PaymentContent) => PaymentContent),
  ) => {
    const next =
      typeof patch === "function" ? patch(contentRef.current) : { ...contentRef.current, ...patch };
    setContent(next);
    contentRef.current = next;
    await save(next);
  };

  const updateMethod = (id: string, patch: Partial<PaymentMethod>) => {
    setContent((prev) => ({
      ...prev,
      methods: prev.methods.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));
  };

  const updateBankField = (id: string, patch: Partial<PaymentBankField>) => {
    setContent((prev) => ({
      ...prev,
      bankFields: prev.bankFields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));
  };

  const stringListEditor = (
    listKey: "notes" | "importantNotes",
    heading: string,
  ) => (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[14px] font-bold text-white">{heading}</h2>
        <button
          type="button"
          onClick={() => update(listKey, [...content[listKey], "New point"])}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
        >
          <Plus className="size-3.5" /> Add
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {content[listKey].map((point, index) => (
          <div key={index} className="flex gap-2">
            <input
              className={field}
              value={point}
              onChange={(e) => {
                const next = [...content[listKey]];
                next[index] = e.target.value;
                update(listKey, next);
              }}
            />
            <button
              type="button"
              onClick={() =>
                update(
                  listKey,
                  content[listKey].filter((_, i) => i !== index),
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
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">Website</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Payment Procedure</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Full control of `/payment` — cover, methods, bank details, notes, security copy, and CTA.
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
            <span className={label}>Booking note</span>
            <textarea rows={3} className={field} value={content.noteText} onChange={(e) => update("noteText", e.target.value)} />
          </label>
          <label>
            <span className={label}>Methods heading</span>
            <input className={field} value={content.methodsHeading} onChange={(e) => update("methodsHeading", e.target.value)} />
          </label>
          <label>
            <span className={label}>Methods intro</span>
            <input className={field} value={content.methodsIntro} onChange={(e) => update("methodsIntro", e.target.value)} />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-bold text-white">Payment methods</h2>
          <button
            type="button"
            onClick={() => {
              const item: PaymentMethod = {
                id: `pm-${Date.now().toString(36)}`,
                title: "New method",
                description: "",
                imageUrl: "",
                visible: true,
              };
              setContent((prev) => ({ ...prev, methods: [...prev.methods, item] }));
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {content.methods.map((item, index) => (
            <div key={item.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[12px] font-bold uppercase tracking-wide text-white/50">
                  Method {index + 1}
                </p>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                    <input
                      type="checkbox"
                      checked={item.visible !== false}
                      onChange={(e) => updateMethod(item.id, { visible: e.target.checked })}
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        methods: prev.methods.filter((m) => m.id !== item.id),
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
                aspectClassName="aspect-[16/9]"
                onChange={(url) => updateMethod(item.id, { imageUrl: url })}
                onAfterChange={(url) =>
                  setImageAndSave((prev) => ({
                    ...prev,
                    methods: prev.methods.map((m) =>
                      m.id === item.id ? { ...m, imageUrl: url } : m,
                    ),
                  }))
                }
              />
              <div className="mt-3 grid gap-2">
                <input
                  className={field}
                  value={item.title}
                  onChange={(e) => updateMethod(item.id, { title: e.target.value })}
                  placeholder="Title"
                />
                <textarea
                  rows={3}
                  className={field}
                  value={item.description}
                  onChange={(e) => updateMethod(item.id, { description: e.target.value })}
                  placeholder="Description"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">Charges, security & privacy</h2>
        <div className="grid gap-3">
          {(
            [
              ["chargesHeading", "Charges heading"],
              ["chargesBody", "Charges body"],
              ["securityHeading", "Security heading"],
              ["securityBody", "Security body"],
              ["privacyHeading", "Privacy heading"],
              ["privacyBody", "Privacy body"],
              ["notesHeading", "Notes section heading"],
              ["importantHeading", "Important notes heading"],
              ["bankHeading", "Bank section heading"],
              ["bankIntro", "Bank intro"],
            ] as const
          ).map(([key, lab]) => (
            <label key={key}>
              <span className={label}>{lab}</span>
              {key.includes("Body") || key.includes("Intro") ? (
                <textarea rows={3} className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
              ) : (
                <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
              )}
            </label>
          ))}
        </div>
      </section>

      {stringListEditor("notes", "How payments work — points")}
      {stringListEditor("importantNotes", "Important reminders")}

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-bold text-white">Bank details fields</h2>
          <button
            type="button"
            onClick={() => {
              const item: PaymentBankField = {
                id: `bf-${Date.now().toString(36)}`,
                label: "New field",
                value: "",
              };
              setContent((prev) => ({ ...prev, bankFields: [...prev.bankFields, item] }));
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add field
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {content.bankFields.map((bf) => (
            <div key={bf.id} className="grid gap-2 rounded-xl border border-white/10 p-3 sm:grid-cols-[1fr_1.4fr_auto]">
              <input
                className={field}
                value={bf.label}
                onChange={(e) => updateBankField(bf.id, { label: e.target.value })}
                placeholder="Label"
              />
              <input
                className={field}
                value={bf.value}
                onChange={(e) => updateBankField(bf.id, { value: e.target.value })}
                placeholder="Value"
              />
              <button
                type="button"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    bankFields: prev.bankFields.filter((f) => f.id !== bf.id),
                  }))
                }
                className="inline-flex h-10 items-center justify-center rounded-lg border border-red-400/30 bg-red-500/10 px-3 text-red-200"
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
              ["ctaPrimaryLabel", "Primary button label"],
              ["ctaPrimaryHref", "Primary button link"],
              ["ctaSecondaryLabel", "Secondary button label"],
              ["ctaSecondaryHref", "Secondary button link"],
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
