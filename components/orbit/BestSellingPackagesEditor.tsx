"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  FolderOpen,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import type {
  BestSellingPackage,
  BestSellingPackagesContent,
} from "@/types/best-selling-packages";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";
import { OrbitMediaLibraryModal } from "@/components/orbit/OrbitMediaLibraryModal";

type Props = { initial: BestSellingPackagesContent };

function newPackage(): BestSellingPackage {
  const id = `bs-${Date.now().toString(36)}`;
  return {
    id,
    title: "New Package",
    price: 999,
    compareAtPrice: 1299,
    reviewCount: 0,
    rating: 5,
    durationDays: 10,
    href: `/packages/${id}`,
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    showOnHome: true,
    visible: true,
  };
}

export function BestSellingPackagesEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [libraryPkgId, setLibraryPkgId] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const contentRef = useRef(content);
  contentRef.current = content;

  const updateMeta = <K extends keyof BestSellingPackagesContent>(
    key: K,
    value: BestSellingPackagesContent[K],
  ) => setContent((prev) => ({ ...prev, [key]: value }));

  const updatePackage = (id: string, patch: Partial<BestSellingPackage>) => {
    setContent((prev) => ({
      ...prev,
      packages: prev.packages.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  const save = async (next?: BestSellingPackagesContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/best-selling", {
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
        setError(data.error || "Failed to save packages.");
        setSaving(false);
        return false;
      }
      setContent(payload);
      contentRef.current = payload;
      setToast("Best selling packages saved. Live site updated.");
      setSaving(false);
      router.refresh();
      return true;
    } catch {
      setError("Network error while saving.");
      setSaving(false);
      return false;
    }
  };

  const uploadImage = async (pkg: BestSellingPackage, file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const ok =
      ["png", "jpg", "jpeg", "webp", "gif"].includes(ext) ||
      file.type.startsWith("image/");
    if (!ok) {
      setError("Use png, jpg, jpeg, webp, or gif.");
      return;
    }

    setUploadingId(pkg.id);
    setProgress(2);
    setError("");
    setToast("");
    try {
      const item = await orbitUploadFile({
        file,
        onProgress: setProgress,
      });
      await applyPackageImage(pkg, withCacheBust(item.url), true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingId(null);
      setProgress(0);
    }
  };

  const applyPackageImage = async (
    pkg: BestSellingPackage,
    imageUrl: string,
    fromUpload: boolean,
  ) => {
    const next: BestSellingPackagesContent = {
      ...contentRef.current,
      packages: contentRef.current.packages.map((p) =>
        p.id === pkg.id ? { ...p, imageUrl } : p,
      ),
    };
    setContent(next);
    contentRef.current = next;
    const saved = await save(next);
    if (saved) {
      setToast(
        fromUpload
          ? `Image saved for “${pkg.title}”.`
          : `Library image selected for “${pkg.title}”.`,
      );
    } else setError((e) => e || "Image set — click Save & Publish.");
  };

  const addPackage = () => {
    setContent((prev) => ({
      ...prev,
      packages: [...prev.packages, newPackage()],
    }));
  };

  const removePackage = (id: string) => {
    if (!window.confirm("Remove this package from the list?")) return;
    setContent((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== id),
    }));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Homepage
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">Best Selling Packages</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Homepage shows up to 6 packages marked “Show on home” in a 3×2 grid. All
            visible packages appear on /packages.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={addPackage}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-[13px] font-semibold text-white"
          >
            <Plus className="size-4" />
            Add package
          </button>
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
      {uploadingId ? (
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-[#F58220] transition-all"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      ) : null}

      <div className="grid gap-4 rounded-xl border border-white/10 bg-[#0d1420] p-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[12px] font-medium text-white/55">Heading</span>
          <input
            value={content.heading}
            onChange={(e) => updateMeta("heading", e.target.value)}
            className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-white/55">
            View all label
          </span>
          <input
            value={content.viewAllLabel}
            onChange={(e) => updateMeta("viewAllLabel", e.target.value)}
            className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-white/55">
            View all link
          </span>
          <input
            value={content.viewAllHref}
            onChange={(e) => updateMeta("viewAllHref", e.target.value)}
            className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
          />
        </label>
        <label className="flex items-center gap-2 text-[13px] text-white/70 sm:col-span-2">
          <input
            type="checkbox"
            checked={content.visible}
            onChange={(e) => updateMeta("visible", e.target.checked)}
            className="size-3.5 accent-[#F58220]"
          />
          Section visible on homepage
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {content.packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1420]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-[13px] font-bold text-white">Package {index + 1}</p>
              <div className="flex items-center gap-3 text-[12px] text-white/55">
                <label className="inline-flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={pkg.showOnHome !== false}
                    onChange={(e) =>
                      updatePackage(pkg.id, { showOnHome: e.target.checked })
                    }
                    className="size-3.5 accent-[#F58220]"
                  />
                  Home
                </label>
                <label className="inline-flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={pkg.visible !== false}
                    onChange={(e) =>
                      updatePackage(pkg.id, { visible: e.target.checked })
                    }
                    className="size-3.5 accent-[#F58220]"
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() => removePackage(pkg.id)}
                  className="inline-flex items-center gap-1 text-red-300 hover:text-red-200"
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </button>
              </div>
            </div>

            <div className="space-y-3.5 p-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black/40">
                {pkg.imageUrl ? (
                  <OrbitMediaPreview
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/30">
                    <ImagePlus className="size-8" />
                  </div>
                )}
                {uploadingId === pkg.id ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                    <Loader2 className="size-7 animate-spin text-[#F58220]" />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2">
                <input
                  ref={(el) => {
                    fileRefs.current[pkg.id] = el;
                  }}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadImage(pkg, file);
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileRefs.current[pkg.id]?.click()}
                  disabled={uploadingId === pkg.id}
                  className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 text-[12px] font-semibold disabled:opacity-50"
                >
                  <Upload className="size-3.5" />
                  Upload image
                </button>
                <button
                  type="button"
                  onClick={() => setLibraryPkgId(pkg.id)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
                >
                  <FolderOpen className="size-3.5" />
                  Media library
                </button>
              </div>

              <Field
                label="Title"
                value={pkg.title}
                onChange={(v) => updatePackage(pkg.id, { title: v })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Price (USD)"
                  type="number"
                  value={String(pkg.price)}
                  onChange={(v) => updatePackage(pkg.id, { price: Number(v) || 0 })}
                />
                <Field
                  label="Compare at"
                  type="number"
                  value={pkg.compareAtPrice == null ? "" : String(pkg.compareAtPrice)}
                  onChange={(v) =>
                    updatePackage(pkg.id, {
                      compareAtPrice: v === "" ? null : Number(v) || 0,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Field
                  label="Days"
                  type="number"
                  value={String(pkg.durationDays)}
                  onChange={(v) =>
                    updatePackage(pkg.id, { durationDays: Number(v) || 1 })
                  }
                />
                <Field
                  label="Reviews"
                  type="number"
                  value={String(pkg.reviewCount)}
                  onChange={(v) =>
                    updatePackage(pkg.id, { reviewCount: Number(v) || 0 })
                  }
                />
                <Field
                  label="Rating"
                  type="number"
                  value={String(pkg.rating)}
                  onChange={(v) => updatePackage(pkg.id, { rating: Number(v) || 5 })}
                />
              </div>
              <Field
                label="Link (href)"
                value={pkg.href}
                onChange={(v) => updatePackage(pkg.id, { href: v })}
              />
              <Field
                label="Image URL"
                value={pkg.imageUrl}
                onChange={(v) => updatePackage(pkg.id, { imageUrl: v })}
              />
            </div>
          </div>
        ))}
      </div>

      <OrbitMediaLibraryModal
        open={!!libraryPkgId}
        onClose={() => setLibraryPkgId(null)}
        onSelect={async (url) => {
          const pkg = content.packages.find((p) => p.id === libraryPkgId);
          if (pkg) await applyPackageImage(pkg, url, false);
        }}
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
      />
    </label>
  );
}
