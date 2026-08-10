"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Search, Trash2, Upload } from "lucide-react";
import type { MediaItem } from "@/types/hero";
import { ORBIT_MAX_UPLOAD_MB } from "@/lib/orbit/upload-limits";
import { orbitUploadFile } from "@/lib/orbit/client-upload";

export default function OrbitMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [renaming, setRenaming] = useState<string | null>(null);
  const [name, setName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orbit/media?q=${encodeURIComponent(q)}&sort=${sort}`);
      const data = (await res.json()) as { ok?: boolean; items?: MediaItem[]; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to load media library.");
        setLoading(false);
        return;
      }
      setItems(data.items || []);
    } catch {
      setError("Network error loading media.");
    } finally {
      setLoading(false);
    }
  }, [q, sort]);

  useEffect(() => {
    void load();
  }, [load]);

  const upload = async (file: File) => {
    setUploading(true);
    setProgress(2);
    setError("");
    setToast("");
    try {
      await orbitUploadFile({ file, onProgress: setProgress });
      setToast(`Uploaded “${file.name}”.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const remove = async (id: string) => {
    setError("");
    const res = await fetch(`/api/orbit/media?id=${encodeURIComponent(id)}`, {
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
    setItems((prev) => prev.filter((i) => i.id !== id));
    setToast("Media deleted.");
    void load();
  };

  const rename = async (id: string) => {
    const res = await fetch("/api/orbit/media", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setError(data.error || "Rename failed.");
      return;
    }
    setRenaming(null);
    setToast("Renamed.");
    void load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Assets
          </p>
          <h1 className="mt-1 text-[26px] font-bold tracking-tight">Media Library</h1>
          <p className="mt-1.5 text-[13px] text-white/55">
            Every upload from any Orbit page appears here. Pick files here or from each
            page&apos;s Media library button. Files stay forever unless you delete them on this
            page (max {ORBIT_MAX_UPLOAD_MB}MB).
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#F58220] px-4 text-[13px] font-bold text-[#08121E] shadow-[0_10px_28px_rgba(245,130,32,0.3)] disabled:opacity-60"
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {uploading ? `Uploading ${progress}%` : "Upload media"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/mp4,video/webm,video/quicktime"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
            e.target.value = "";
          }}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
          <Search className="size-4 text-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search media…"
            className="w-full bg-transparent text-[13px] outline-none"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-[13px]"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="name">Name</option>
          <option value="size">Size</option>
        </select>
      </div>

      {toast ? (
        <p className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-[13px] text-emerald-200">
          {toast}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-200">
          {error}
        </p>
      ) : null}

      {uploading ? (
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-[#F58220] transition-all" style={{ width: `${progress}%` }} />
        </div>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-16 text-white/50">
          <Loader2 className="size-6 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
          <Upload className="mx-auto size-8 text-white/30" />
          <p className="mt-3 text-[14px] text-white/55">No media yet. Upload an image or video.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            >
              <div className="aspect-video bg-black/40">
                {item.mimeType.startsWith("video/") ? (
                  <video src={item.url} className="h-full w-full object-cover" muted controls />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="space-y-2 p-3.5">
                {renaming === item.id ? (
                  <div className="flex gap-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 rounded-lg border border-white/15 bg-black/30 px-2 py-1.5 text-[12px]"
                    />
                    <button
                      type="button"
                      className="rounded-lg bg-[#F58220] px-2.5 text-[11px] font-bold text-[#08121E]"
                      onClick={() => void rename(item.id)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="truncate text-[13px] font-semibold">{item.name}</p>
                )}
                <p className="text-[11px] text-white/45">
                  {(item.size / 1024 / 1024).toFixed(1)} MB · {item.mimeType}
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    className="rounded-lg border border-white/15 px-2.5 py-1.5 text-[11px] font-semibold"
                    onClick={() => {
                      setRenaming(item.id);
                      setName(item.name);
                    }}
                  >
                    Rename
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg border border-red-400/30 px-2.5 py-1.5 text-[11px] font-semibold text-red-200"
                    onClick={() => {
                      if (
                        !window.confirm(
                          "Permanently delete this file from disk and media records?",
                        )
                      ) {
                        return;
                      }
                      void remove(item.id);
                    }}
                  >
                    <Trash2 className="size-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
