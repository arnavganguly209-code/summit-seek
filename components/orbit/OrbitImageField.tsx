"use client";

import { useRef, useState } from "react";
import { FolderOpen, Loader2, Trash2, Upload } from "lucide-react";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";
import { OrbitMediaLibraryModal } from "@/components/orbit/OrbitMediaLibraryModal";

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
  const [error, setError] = useState("");

  const apply = async (url: string) => {
    onChange(url);
    if (onAfterChange) await onAfterChange(url);
  };

  const upload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      // Never replace/delete the previous library file — keep all uploads
      const item = await orbitUploadFile({ file });
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

      <OrbitMediaLibraryModal
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onSelect={(url) => apply(url)}
        imagesOnly={imagesOnly}
      />
    </div>
  );
}
