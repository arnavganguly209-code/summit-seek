"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Loader2,
  Monitor,
  Smartphone,
  Tablet,
  Upload,
  Trash2,
} from "lucide-react";
import { Hero } from "@/components/home/Hero";
import type { HeroContent, HeroFeature, MediaItem } from "@/types/hero";
import { ORBIT_MAX_UPLOAD_MB } from "@/lib/orbit/upload-limits";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { cn } from "@/lib/utils";

type Props = {
  initial: HeroContent;
};

type Device = "desktop" | "tablet" | "mobile";

export function HeroEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState<HeroContent>(initial);
  const [device, setDevice] = useState<Device>("desktop");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadMeta, setUploadMeta] = useState<MediaItem | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const previewWidth = useMemo(() => {
    if (device === "mobile") return 390;
    if (device === "tablet") return 768;
    return 1280;
  }, [device]);

  const update = <K extends keyof HeroContent>(key: K, value: HeroContent[K]) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const updateFeature = (id: string, patch: Partial<HeroFeature>) => {
    setContent((prev) => ({
      ...prev,
      features: prev.features.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const raw = await res.text();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = JSON.parse(raw) as { ok?: boolean; error?: string };
      } catch {
        setError(
          res.status === 413
            ? "File/request too large for the server. Compress the video and retry."
            : `Save failed (HTTP ${res.status}).`,
        );
        setSaving(false);
        return;
      }
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to save hero content.");
        setSaving(false);
        return;
      }
      setToast("Hero saved. Live site updated.");
      setSaving(false);
      router.refresh();
    } catch {
      setError("Network error while saving. Please retry.");
      setSaving(false);
    }
  };

  const uploadVideo = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const okExt = ["mp4", "mov", "webm"].includes(ext);
    const okMime = ["video/mp4", "video/quicktime", "video/webm", ""].includes(file.type);
    if (!okExt && !okMime) {
      setError("Unsupported format. Use mp4, mov, or webm.");
      return;
    }

    setUploading(true);
    setProgress(2);
    setError("");
    setUploadMeta(null);
    setToast("");

    try {
      const replaceUrl =
        content.videoUrl && !content.videoUrl.includes("/media/hero/hero.mp4")
          ? content.videoUrl.split("?")[0]
          : undefined;

      const item = await orbitUploadFile({
        file,
        setAsHero: true,
        replaceUrl,
        onProgress: setProgress,
      });

      setUploadMeta(item);
      update("videoUrl", withCacheBust(item.url));
      setToast("Video uploaded and saved to hero. You can still tweak copy and click Save Changes.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please retry.");
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const resetToDefaultVideo = async () => {
    setError("");
    setToast("");
    update("videoUrl", "/media/hero/hero.mp4");
    setUploadMeta(null);
    setToast("Switched to default hero video. Click Save Changes to publish.");
  };

  const permanentlyDeleteCurrentVideo = async () => {
    const url = content.videoUrl.split("?")[0];
    if (url === "/media/hero/hero.mp4") {
      setError("Default hero video cannot be permanently deleted.");
      return;
    }
    setError("");
    setToast("");
    try {
      const res = await fetch(`/api/orbit/media?url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        clearedHero?: boolean;
      };
      if (!res.ok || !data.ok) {
        setError(data.error || "Delete failed.");
        return;
      }
      update("videoUrl", "/media/hero/hero.mp4");
      setUploadMeta(null);
      setToast("Uploaded video deleted. Hero reset to default video.");
      router.refresh();
    } catch {
      setError("Network error while deleting. Please retry.");
    }
  };

  const onDrop = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    uploadVideo(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight">Hero Section</h1>
          <p className="mt-1 text-[13px] text-white/55">
            Edit video, copy, search, features, overlay, and visibility.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-[#F58220] px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_10px_28px_rgba(245,130,32,0.35)] disabled:opacity-70"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : null}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {toast ? (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-[13px] text-emerald-200">
          <CheckCircle2 className="size-4" />
          {toast}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <section className="space-y-3">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/45">
              Hero Video
            </h2>
            <div
              className="rounded-xl border border-dashed border-white/20 bg-black/30 p-4 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onDrop(e.dataTransfer.files);
              }}
            >
              <Upload className="mx-auto size-6 text-white/50" />
              <p className="mt-2 text-[13px] text-white/70">
                Drag & drop mp4 / mov / webm (max {ORBIT_MAX_UPLOAD_MB}MB)
              </p>
              <button
                type="button"
                className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-[12px] font-semibold"
                onClick={() => fileRef.current?.click()}
              >
                Choose Video
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="hidden"
                onChange={(e) => onDrop(e.target.files)}
              />
              {uploading ? (
                <div className="mt-3">
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-[#F58220] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-white/50">{progress}%</p>
                </div>
              ) : null}
            </div>
            <video
              key={content.videoUrl}
              src={content.videoUrl}
              className="aspect-video w-full rounded-xl object-cover"
              muted
              playsInline
              controls
            />
            {uploadMeta ? (
              <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-[12px] text-white/65">
                <p>
                  <span className="text-white/40">File:</span> {uploadMeta.name}
                </p>
                <p>
                  <span className="text-white/40">Size:</span>{" "}
                  {(uploadMeta.size / 1024 / 1024).toFixed(1)} MB
                </p>
                <p>
                  <span className="text-white/40">Uploaded:</span>{" "}
                  {new Date(uploadMeta.uploadedAt).toLocaleString()}
                </p>
                <p>
                  <span className="text-white/40">Status:</span> {uploadMeta.status}
                </p>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-[12px] font-semibold text-white/80 transition hover:bg-white/5"
                onClick={() => void resetToDefaultVideo()}
              >
                Use default video
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-400/30 px-3 py-2 text-[12px] font-semibold text-red-300 transition hover:bg-red-500/10"
                onClick={() => void permanentlyDeleteCurrentVideo()}
              >
                <Trash2 className="size-3.5" /> Delete uploaded video
              </button>
            </div>
            <p className="text-[11px] text-white/40">
              Upload is saved to the live hero immediately. Delete removes the file from
              storage. Default starter video is protected.
            </p>
          </section>

          <Field
            label="Eyebrow"
            value={content.eyebrow}
            onChange={(v) => update("eyebrow", v)}
          />
          <Field
            label="Heading line 1"
            value={content.headingLine1}
            onChange={(v) => update("headingLine1", v)}
          />
          <Field
            label="Heading line 2"
            value={content.headingLine2}
            onChange={(v) => update("headingLine2", v)}
          />
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-white/55">
              Description
            </span>
            <textarea
              value={content.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/50"
            />
          </label>
          <Field
            label="Search placeholder"
            value={content.searchPlaceholder}
            onChange={(v) => update("searchPlaceholder", v)}
          />
          <Field
            label="Search button label"
            value={content.searchButtonLabel}
            onChange={(v) => update("searchButtonLabel", v)}
          />
          <Field
            label="Logo (scrolled / light bg)"
            value={content.logoUrl}
            onChange={(v) => update("logoUrl", v)}
          />
          <Field
            label="Logo (transparent header)"
            value={content.logoUrlLight}
            onChange={(v) => update("logoUrlLight", v)}
          />

          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-white/55">
              Overlay darkness ({content.overlayOpacity.toFixed(2)})
            </span>
            <input
              type="range"
              min={0}
              max={0.9}
              step={0.01}
              value={content.overlayOpacity}
              onChange={(e) => update("overlayOpacity", Number(e.target.value))}
              className="w-full"
            />
          </label>

          <label className="flex items-center gap-2 text-[13px] text-white/75">
            <input
              type="checkbox"
              checked={content.headlineAnimation}
              onChange={(e) => update("headlineAnimation", e.target.checked)}
            />
            Headline animation (once)
          </label>
          <label className="flex items-center gap-2 text-[13px] text-white/75">
            <input
              type="checkbox"
              checked={content.visible}
              onChange={(e) => update("visible", e.target.checked)}
            />
            Hero visible
          </label>

          <div className="space-y-3 border-t border-white/10 pt-4">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/45">
              Feature Cards
            </h2>
            {content.features.map((f) => (
              <div key={f.id} className="space-y-2 rounded-xl border border-white/10 p-3">
                <Field
                  label="Title"
                  value={f.title}
                  onChange={(v) => updateFeature(f.id, { title: v })}
                />
                <Field
                  label="Subtitle"
                  value={f.subtitle}
                  onChange={(v) => updateFeature(f.id, { subtitle: v })}
                />
                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-medium text-white/55">
                    Icon
                  </span>
                  <select
                    value={f.icon}
                    onChange={(e) =>
                      updateFeature(f.id, {
                        icon: e.target.value as HeroFeature["icon"],
                      })
                    }
                    className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white"
                  >
                    <option value="shield">Shield</option>
                    <option value="mountain">Mountain</option>
                    <option value="compass">Compass</option>
                    <option value="headset">Headset</option>
                  </select>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {(
              [
                ["desktop", Monitor],
                ["tablet", Tablet],
                ["mobile", Smartphone],
              ] as const
            ).map(([id, Icon]) => (
              <button
                key={id}
                type="button"
                onClick={() => setDevice(id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-semibold",
                  device === id
                    ? "border-[#F58220]/50 bg-[#F58220]/15 text-[#F58220]"
                    : "border-white/10 text-white/60",
                )}
              >
                <Icon className="size-3.5" />
                {id}
              </button>
            ))}
          </div>
          <div className="overflow-auto rounded-2xl border border-white/10 bg-black/40 p-3">
            <div
              className="mx-auto overflow-hidden rounded-xl border border-white/10"
              style={{ width: "100%", maxWidth: previewWidth }}
            >
              <div className="origin-top scale-[0.92] sm:scale-100">
                <Hero content={content} preview />
              </div>
            </div>
          </div>
        </div>
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
        className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/50"
      />
    </label>
  );
}
