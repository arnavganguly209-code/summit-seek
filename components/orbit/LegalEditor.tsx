"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type { LegalDocument, LegalPageContent } from "@/types/legal-cms";
import { OrbitImageField } from "@/components/orbit/OrbitImageField";

type Props = { initial: LegalPageContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

export function LegalEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof LegalPageContent>(key: K, value: LegalPageContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: LegalPageContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/legal", {
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
      setToast("Legal page saved. Live site updated.");
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
    patch: Partial<LegalPageContent> | ((prev: LegalPageContent) => LegalPageContent),
  ) => {
    const next =
      typeof patch === "function" ? patch(contentRef.current) : { ...contentRef.current, ...patch };
    setContent(next);
    contentRef.current = next;
    await save(next);
  };

  const updateDoc = (id: string, patch: Partial<LegalDocument>) => {
    setContent((prev) => ({
      ...prev,
      documents: prev.documents.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    }));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">Website</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Legal Documents</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Upload registration certificates for `/legal`. Images show as static previews on the
            website — no zoom and no download buttons.
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
        <OrbitImageField
          label="Page cover (optional)"
          value={content.coverImageUrl}
          aspectClassName="aspect-[21/7]"
          onChange={(url) => update("coverImageUrl", url)}
          onAfterChange={(url) => setImageAndSave({ coverImageUrl: url })}
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>Cover title</span>
            <input
              className={field}
              value={content.coverTitle}
              onChange={(e) => update("coverTitle", e.target.value)}
            />
          </label>
          <label>
            <span className={label}>Meta title</span>
            <input
              className={field}
              value={content.metaTitle}
              onChange={(e) => update("metaTitle", e.target.value)}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Cover subtitle</span>
            <input
              className={field}
              value={content.coverSubtitle}
              onChange={(e) => update("coverSubtitle", e.target.value)}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Intro text</span>
            <textarea
              rows={3}
              className={field}
              value={content.intro}
              onChange={(e) => update("intro", e.target.value)}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Meta description</span>
            <input
              className={field}
              value={content.metaDescription}
              onChange={(e) => update("metaDescription", e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-bold text-white">Documents</h2>
          <button
            type="button"
            onClick={() => {
              const doc: LegalDocument = {
                id: `doc-${Date.now().toString(36)}`,
                title: "New Document",
                description: "",
                imageUrl: "",
                visible: true,
              };
              setContent((prev) => ({ ...prev, documents: [...prev.documents, doc] }));
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add document
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {content.documents.map((doc, index) => (
            <div key={doc.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[12px] font-bold uppercase tracking-wide text-white/50">
                  Document {index + 1}
                </p>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                    <input
                      type="checkbox"
                      checked={doc.visible !== false}
                      onChange={(e) => updateDoc(doc.id, { visible: e.target.checked })}
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        documents: prev.documents.filter((d) => d.id !== doc.id),
                      }))
                    }
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 px-2.5 text-[11px] font-semibold text-red-200"
                  >
                    <Trash2 className="size-3" /> Remove
                  </button>
                </div>
              </div>

              <OrbitImageField
                label="Certificate / document image"
                value={doc.imageUrl}
                aspectClassName="aspect-[4/3]"
                onChange={(url) => updateDoc(doc.id, { imageUrl: url })}
                onAfterChange={(url) =>
                  setImageAndSave((prev) => ({
                    ...prev,
                    documents: prev.documents.map((d) =>
                      d.id === doc.id ? { ...d, imageUrl: url } : d,
                    ),
                  }))
                }
              />

              <div className="mt-3 grid gap-2">
                <label>
                  <span className={label}>Title</span>
                  <input
                    className={field}
                    value={doc.title}
                    onChange={(e) => updateDoc(doc.id, { title: e.target.value })}
                  />
                </label>
                <label>
                  <span className={label}>Short description</span>
                  <input
                    className={field}
                    value={doc.description}
                    onChange={(e) => updateDoc(doc.id, { description: e.target.value })}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
