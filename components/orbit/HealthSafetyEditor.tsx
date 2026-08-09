"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type { HealthSafetyContent, HealthTopic } from "@/types/health-safety-cms";
import { OrbitImageField } from "@/components/orbit/OrbitImageField";

type Props = { initial: HealthSafetyContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

export function HealthSafetyEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof HealthSafetyContent>(key: K, value: HealthSafetyContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: HealthSafetyContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/health-safety", {
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
      setToast("Health & Safety page saved. Live site updated.");
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

  const updateTopic = (id: string, patch: Partial<HealthTopic>) => {
    setContent((prev) => ({
      ...prev,
      topics: prev.topics.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  };

  const lineList = (
    title: string,
    key: "tips" | "notes",
    addLabel: string,
  ) => (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[14px] font-bold text-white">{title}</h2>
        <button
          type="button"
          onClick={() => update(key, [...content[key], "New item"])}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
        >
          <Plus className="size-3.5" /> {addLabel}
        </button>
      </div>
      <div className="space-y-2">
        {content[key].map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              className={field}
              value={item}
              onChange={(e) => {
                const next = [...content[key]];
                next[index] = e.target.value;
                update(key, next);
              }}
            />
            <button
              type="button"
              onClick={() => update(key, content[key].filter((_, i) => i !== index))}
              className="text-red-200"
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
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Travel Guide
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">Health & Safety</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Full control of `/travel-guide/health-safety` — cover, topics, tips, notes, CTA.
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
        <div className="grid gap-3">
          {(
            [
              ["introEyebrow", "Eyebrow"],
              ["introHeading", "Heading"],
              ["introBody", "Intro body"],
              ["alertText", "Alert note"],
              ["topicsHeading", "Topics heading"],
              ["topicsIntro", "Topics intro"],
              ["tipsHeading", "Tips heading"],
              ["notesHeading", "Notes heading"],
            ] as const
          ).map(([key, lab]) => (
            <label key={key}>
              <span className={label}>{lab}</span>
              {key.includes("Body") || key.includes("Text") || key.includes("Intro") ? (
                <textarea rows={3} className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
              ) : (
                <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
              )}
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Topics</h2>
          <button
            type="button"
            onClick={() => {
              const topic: HealthTopic = {
                id: `hs-${Date.now().toString(36)}`,
                title: "New topic",
                description: "",
                points: [],
                visible: true,
              };
              setContent((prev) => ({ ...prev, topics: [...prev.topics, topic] }));
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add topic
          </button>
        </div>
        <div className="space-y-4">
          {content.topics.map((topic) => (
            <div key={topic.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-2 flex justify-end gap-2">
                <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    checked={topic.visible !== false}
                    onChange={(e) => updateTopic(topic.id, { visible: e.target.checked })}
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      topics: prev.topics.filter((t) => t.id !== topic.id),
                    }))
                  }
                  className="text-red-200"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <input
                className={field}
                value={topic.title}
                placeholder="Title"
                onChange={(e) => updateTopic(topic.id, { title: e.target.value })}
              />
              <textarea
                rows={2}
                className={`${field} mt-2`}
                value={topic.description}
                placeholder="Description"
                onChange={(e) => updateTopic(topic.id, { description: e.target.value })}
              />
              <label className="mt-2 block">
                <span className={label}>Points (one per line)</span>
                <textarea
                  rows={4}
                  className={field}
                  value={topic.points.join("\n")}
                  onChange={(e) =>
                    updateTopic(topic.id, {
                      points: e.target.value
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      {lineList("Tips", "tips", "Add tip")}
      {lineList("Notes", "notes", "Add note")}

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
