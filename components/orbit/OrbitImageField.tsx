"use client";

import { useEffect, useRef, useState } from "react";
import { FolderOpen, Loader2, Trash2, Upload, X } from "lucide-react";
import type { MediaItem } from "@/types/hero";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onAfterChange?: (url: string) => void | Promise<void>;
  aspectClassName?: string;
  imagesOnly?: boolean;
};

export function OrbitImageField({
  label,
  value,
  onChange,
  onAfterChange,
  aspectClassName = "aspect-[16/10]",
  imagesOnly = true,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [error, setError] = useState("");

  const apply = async (url: string) => {
    onChange(url);
    if (onAfterChange) await onAfterChange(url);
  };

  const loadLibrary = async () => {
    setLoadingLibrary(true);
    setError("");
    try {
      const res = await fetch("/api/orbit/media?sort=newest");
      const data = (await res.json()) as { ok?: boolean; items?: MediaItem[]; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not load media library.");
        setItems([]);
        return;
      }
      const list = data.items || [];
      setItems(
        imagesOnly
          ? list.filter((i) => (i.mimeType || "").startsWith("image/"))
          : list,
      );
    } catch {
      setError("Network error loading media library.");
      setItems([]);
    } finally {
      setLoadingLibrary(false);
    }
  };

  useEffect(() => {
    if (!libraryOpen) return;
    void loadLibrary();
  }, [libraryOpen]);

  const upload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const replaceUrl = value.startsWith("/media/library/") ? value.split("?")[0] : undefined;
      const item = await orbitUploadFile({ file, replaceUrl });
      await apply(withCacheBust(item.url));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const remove = async () => {
    setError("");
    // Clear CMS reference only — keep file in media library for reuse
    await apply("");
  };

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-white/55">{label}</span>
        {value ? (
          <button
            type="button"
            onClick={() => void remove()}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-200/90 hover:text-red-100"
          >
            <Trash2 className="size-3" /> Remove image
          </button>
        ) : null}
      </div>

      <div
        className={`relative overflow-hidden rounded-xl border border-white/10 bg-black/30 ${aspectClassName}`}
      >
        <OrbitMediaPreview src={value} alt={label} className="h-full w-full object-cover" />
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void upload(f);
          e.target.value = "";
        }}
      />

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold disabled:opacity-60"
        >
          {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
          Upload
        </button>
        <button
          type="button"
          onClick={() => setLibraryOpen(true)}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
        >
          <FolderOpen className="size-3.5" /> Media library
        </button>
      </div>

      {error ? (
        <p className="mt-2 text-[12px] text-red-200">{error}</p>
      ) : null}

      {libraryOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4">
          <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0d1520] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="text-[14px] font-bold text-white">Media library</p>
                <p className="text-[12px] text-white/50">Pick an already uploaded image</p>
              </div>
              <button
                type="button"
                onClick={() => setLibraryOpen(false)}
                className="rounded-lg border border-white/15 p-1.5 text-white/70 hover:bg-white/5"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              {loadingLibrary ? (
                <div className="flex items-center justify-center gap-2 py-16 text-white/50">
                  <Loader2 className="size-5 animate-spin" /> Loading…
                </div>
              ) : items.length === 0 ? (
                <p className="py-16 text-center text-[13px] text-white/45">
                  No images in the library yet. Upload one first.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        void apply(withCacheBust(item.url));
                        setLibraryOpen(false);
                      }}
                      className="group overflow-hidden rounded-xl border border-white/10 bg-black/30 text-left transition hover:border-[#F58220]/50"
                    >
                      <div className="aspect-square overflow-hidden">
                        <OrbitMediaPreview
                          src={item.url}
                          alt={item.name}
                          className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="truncate px-2 py-1.5 text-[11px] text-white/60">{item.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
