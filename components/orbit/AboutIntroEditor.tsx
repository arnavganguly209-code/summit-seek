"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import type { AboutIntroContent } from "@/types/about-intro";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";

type Props = { initial: AboutIntroContent };

export function AboutIntroEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<"main" | "circle" | null>(null);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const mainRef = useRef<HTMLInputElement>(null);
  const circleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof AboutIntroContent>(
    key: K,
    value: AboutIntroContent[K],
  ) => setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: AboutIntroContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/about-intro", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const raw = await res.text();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = JSON.parse(raw) as { ok?: boolean; error?: string };
      } catch {
        setError(`Save failed (HTTP ${res.status}).`);
        setSaving(false);
        return false;
      }
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to save About section.");
        setSaving(false);
        return false;
      }
      setContent(payload);
      contentRef.current = payload;
      setToast("About section saved. Live homepage updated.");
      setSaving(false);
      router.refresh();
      return true;
    } catch {
      setError("Network error while saving.");
      setSaving(false);
      return false;
    }
  };

  const uploadSlot = async (slot: "main" | "circle", file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const ok =
      ["png", "jpg", "jpeg", "webp", "gif"].includes(ext) ||
      file.type.startsWith("image/");
    if (!ok) {
      setError("Use png, jpg, jpeg, webp, or gif (not HEIC/RAW).");
      return;
    }

    setUploading(slot);
    setProgress(2);
    setError("");
    setToast("");
    try {
      const prevUrl =
        slot === "main"
          ? contentRef.current.mainImageUrl
          : contentRef.current.circleImageUrl;
      const replaceUrl = prevUrl.startsWith("/media/library/")
        ? prevUrl.split("?")[0]
        : undefined;

      const item = await orbitUploadFile({
        file,
        replaceUrl,
        onProgress: setProgress,
      });
      const url = withCacheBust(item.url);

      const next: AboutIntroContent =
        slot === "main"
          ? { ...contentRef.current, mainImageUrl: url }
          : { ...contentRef.current, circleImageUrl: url };
      setContent(next);
      contentRef.current = next;

      const saved = await save(next);
      if (saved) {
        setToast(
          slot === "main"
            ? "Main image uploaded and saved."
            : "Circle image uploaded and saved.",
        );
      } else {
        setError((e) => e || "Image uploaded, but saving failed. Click Save & Publish.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(null);
      setProgress(0);
    }
  };

  const removeSlot = async (slot: "main" | "circle") => {
    // Clear CMS reference only — keep file in media library for reuse
    const next =
      slot === "main"
        ? { ...content, mainImageUrl: "" }
        : { ...content, circleImageUrl: "" };
    setContent(next);
    await save(next);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Homepage
          </p>
          <h1 className="mt-1 text-2xl font-bold">Get to Know Us</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Edit both images, experience badge, copy, checklist, and Discover More
            button. Changes publish to the live homepage.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#F58220] px-5 text-[13px] font-bold text-[#08121E] disabled:opacity-60"
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
      {uploading ? (
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-[#F58220] transition-all"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      ) : null}

      <label className="flex items-center gap-2 text-[13px] text-white/70">
        <input
          type="checkbox"
          checked={content.visible}
          onChange={(e) => update("visible", e.target.checked)}
          className="size-3.5 accent-[#F58220]"
        />
        Section visible on homepage
      </label>

      <div className="grid gap-5 lg:grid-cols-2">
        {(
          [
            ["main", "Main image", content.mainImageUrl, mainRef],
            ["circle", "Circle image", content.circleImageUrl, circleRef],
          ] as const
        ).map(([slot, label, url, ref]) => (
          <div
            key={slot}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1420]"
          >
            <div className="border-b border-white/10 px-4 py-3 text-[13px] font-bold">
              {label}
            </div>
            <div className="space-y-3 p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black/40">
                {url ? (
                  <OrbitMediaPreview src={url} alt={label} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/30">
                    <ImagePlus className="size-8" />
                  </div>
                )}
                {uploading === slot ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                    <Loader2 className="size-7 animate-spin text-[#F58220]" />
                  </div>
                ) : null}
              </div>
              <input
                ref={ref}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void uploadSlot(slot, file);
                  e.target.value = "";
                }}
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => ref.current?.click()}
                  disabled={uploading === slot}
                  className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 text-[12px] font-semibold disabled:opacity-50"
                >
                  <Upload className="size-3.5" />
                  {url.startsWith("/media/") ? "Replace" : "Upload"}
                </button>
                <button
                  type="button"
                  onClick={() => void removeSlot(slot)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-md border border-red-500/30 bg-red-500/10 px-3 text-[12px] font-semibold text-red-300"
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 rounded-xl border border-white/10 bg-[#0d1420] p-4 sm:grid-cols-2">
        <Field label="Eyebrow" value={content.eyebrow} onChange={(v) => update("eyebrow", v)} />
        <Field
          label="Experience prefix"
          value={content.experiencePrefix}
          onChange={(v) => update("experiencePrefix", v)}
        />
        <Field
          label="Experience highlight (bold)"
          value={content.experienceHighlight}
          onChange={(v) => update("experienceHighlight", v)}
        />
        <Field
          label="CTA label"
          value={content.ctaLabel}
          onChange={(v) => update("ctaLabel", v)}
        />
        <Field
          label="CTA link"
          value={content.ctaHref}
          onChange={(v) => update("ctaHref", v)}
        />
        <Field
          label="Main image alt"
          value={content.mainImageAlt}
          onChange={(v) => update("mainImageAlt", v)}
        />
        <Field
          label="Circle image alt"
          value={content.circleImageAlt}
          onChange={(v) => update("circleImageAlt", v)}
        />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[12px] font-medium text-white/55">Heading</span>
        <textarea
          value={content.heading}
          onChange={(e) => update("heading", e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/50"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[12px] font-medium text-white/55">Description</span>
        <textarea
          value={content.description}
          onChange={(e) => update("description", e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/50"
        />
      </label>

      <div className="space-y-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
          Checklist (3 items)
        </p>
        {content.highlights.map((item, i) => (
          <Field
            key={i}
            label={`Highlight ${i + 1}`}
            value={item}
            onChange={(v) => {
              const next = [...content.highlights] as AboutIntroContent["highlights"];
              next[i] = v;
              update("highlights", next);
            }}
          />
        ))}
      </div>
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
      <span className="mb-1.5 block text-[12px] font-medium text-white/55">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
      />
    </label>
  );
}
