"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Search, Trash2 } from "lucide-react";
import type { MediaItem } from "@/types/hero";

export default function OrbitMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [renaming, setRenaming] = useState<string | null>(null);
  const [name, setName] = useState("");

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

  const remove = async (id: string) => {
    const res = await fetch(`/api/orbit/media?id=${id}`, { method: "DELETE" });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setError(data.error || "Delete failed.");
      return;
    }
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
    void load();
  };

  return (
    <div>
      <h1 className="text-[26px] font-bold">Media Library</h1>
      <p className="mt-2 text-[13px] text-white/55">
        Preview, rename, delete, search, filter, and reuse uploaded assets.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-3 py-2">
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
          className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px]"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="name">Name</option>
          <option value="size">Size</option>
        </select>
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">
          {error}
        </p>
      ) : null}

      {loading ? (
        <div className="mt-10 flex justify-center text-white/50">
          <Loader2 className="size-6 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <p className="mt-10 text-[14px] text-white/45">
          No media yet. Upload from Hero editor to populate the library.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="aspect-video bg-black/40">
                {item.mimeType.startsWith("video/") ? (
                  <video src={item.url} className="h-full w-full object-cover" muted />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="space-y-2 p-3">
                {renaming === item.id ? (
                  <div className="flex gap-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 rounded-lg border border-white/15 bg-black/30 px-2 py-1.5 text-[12px]"
                    />
                    <button
                      type="button"
                      className="rounded-lg bg-[#F58220] px-2 text-[11px] font-bold"
                      onClick={() => void rename(item.id)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="truncate text-[13px] font-semibold">{item.name}</p>
                )}
                <p className="text-[11px] text-white/45">
                  {(item.size / 1024 / 1024).toFixed(1)} MB · {item.mimeType} · {item.status}
                </p>
                <p className="truncate text-[11px] text-white/35">{item.url}</p>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    className="rounded-lg border border-white/15 px-2 py-1 text-[11px]"
                    onClick={() => {
                      setRenaming(item.id);
                      setName(item.name);
                    }}
                  >
                    Rename
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg border border-red-400/30 px-2 py-1 text-[11px] text-red-200"
                    onClick={() => void remove(item.id)}
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
