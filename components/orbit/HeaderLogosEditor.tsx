"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Save, Upload } from "lucide-react";
import type { HeroContent } from "@/types/hero";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";

type Props = { initial: HeroContent };
type LogoSlot = "logoUrl" | "logoUrlLight";

function cleanUrl(url: string) {
  return url.split("?")[0].trim();
}

function isLibraryLogo(url: string) {
  return cleanUrl(url).startsWith("/media/library/");
}

export function HeaderLogosEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<LogoSlot | null>(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const fileRefs = useRef<Record<LogoSlot, HTMLInputElement | null>>({
    logoUrl: null,
    logoUrlLight: null,
  });
  const contentRef = useRef(content);
  contentRef.current = content;

  const save = async (next?: HeroContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to save header logos.");
        setSaving(false);
        return false;
      }
      setContent(payload);
      contentRef.current = payload;
      setToast("Header logos saved. Live header updated instantly.");
      setSaving(false);
      router.refresh();
      return true;
    } catch {
      setError("Network error while saving.");
      setSaving(false);
      return false;
    }
  };

  const uploadLogo = async (slot: LogoSlot, file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image (PNG, JPG, WEBP, or SVG).");
      return;
    }
    setUploading(slot);
    setError("");
    setToast("");
    const previous = cleanUrl(contentRef.current[slot]);

    try {
      // Always upload as a NEW library file first — never delete-before-swap
      // (that was causing a brief flash of the old/missing logo).
      const item = await orbitUploadFile({ file });
      const nextUrl = withCacheBust(item.url);
      const next: HeroContent = { ...contentRef.current, [slot]: nextUrl };
      setContent(next);
      contentRef.current = next;
      const ok = await save(next);
      if (ok && isLibraryLogo(previous) && cleanUrl(previous) !== cleanUrl(nextUrl)) {
        // Remove previous library logo only AFTER the new one is live
        void fetch(`/api/orbit/media?url=${encodeURIComponent(previous)}`, {
          method: "DELETE",
        }).catch(() => undefined);
      }
      setToast(
        slot === "logoUrlLight"
          ? "White header logo replaced."
          : "Blue (scrolled) header logo replaced.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logo upload failed.");
    } finally {
      setUploading(null);
    }
  };

  const slots: { key: LogoSlot; title: string; hint: string }[] = [
    {
      key: "logoUrlLight",
      title: "White logo (transparent header)",
      hint: "Shown at the top of the hero before scroll — usually a white / light logo.",
    },
    {
      key: "logoUrl",
      title: "Blue logo (scrolled header)",
      hint: "Shown after scroll on the white glass header — usually the blue brand logo.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">Website</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Header Logos</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Replace the white and blue header logos. New logo goes live immediately — old logo is
            removed only after the new one is saved (no flash).
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

      <div className="grid gap-5 sm:grid-cols-2">
        {slots.map((slot) => (
          <section
            key={slot.key}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
          >
            <h2 className="text-[14px] font-bold text-white">{slot.title}</h2>
            <p className="mt-1 text-[12px] text-white/50">{slot.hint}</p>
            <div
              className={`mt-4 flex aspect-[16/7] items-center justify-center overflow-hidden rounded-xl border border-white/10 p-4 ${
                slot.key === "logoUrlLight" ? "bg-[#0b1524]" : "bg-white"
              }`}
            >
              <OrbitMediaPreview
                key={content[slot.key]}
                src={content[slot.key]}
                alt={slot.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <input
              ref={(el) => {
                fileRefs.current[slot.key] = el;
              }}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void uploadLogo(slot.key, f);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              disabled={uploading === slot.key}
              onClick={() => fileRefs.current[slot.key]?.click()}
              className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 text-[12px] font-semibold disabled:opacity-60"
            >
              {uploading === slot.key ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              {uploading === slot.key ? "Uploading…" : "Upload & replace"}
            </button>
            <label className="mt-3 block">
              <span className="mb-1 block text-[11px] font-medium text-white/55">Logo URL</span>
              <input
                value={content[slot.key]}
                onChange={(e) =>
                  setContent((prev) => ({ ...prev, [slot.key]: e.target.value }))
                }
                className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[12px] text-white outline-none focus:border-[#F58220]/60"
              />
            </label>
          </section>
        ))}
      </div>
    </div>
  );
}
