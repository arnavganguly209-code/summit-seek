"use client";

import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import type { MediaItem } from "@/types/hero";
import { withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void | Promise<void>;
  imagesOnly?: boolean;
  title?: string;
  subtitle?: string;
};

export function OrbitMediaLibraryModal({
  open,
  onClose,
  onSelect,
  imagesOnly = true,
  title = "Media library",
  subtitle = "Pick an already uploaded file — uploads from any Orbit page appear here",
}: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/orbit/media?sort=newest");
        const data = (await res.json()) as {
          ok?: boolean;
          items?: MediaItem[];
          error?: string;
        };
        if (cancelled) return;
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
        if (!cancelled) {
          setError("Network error loading media library.");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [open, imagesOnly]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0d1520] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <p className="text-[14px] font-bold text-white">{title}</p>
            <p className="text-[12px] text-white/50">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 p-1.5 text-white/70 hover:bg-white/5"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-white/50">
              <Loader2 className="size-5 animate-spin" /> Loading…
            </div>
          ) : error ? (
            <p className="py-16 text-center text-[13px] text-red-200">{error}</p>
          ) : items.length === 0 ? (
            <p className="py-16 text-center text-[13px] text-white/45">
              No media in the library yet. Upload from any Orbit page first.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    void onSelect(withCacheBust(item.url));
                    onClose();
                  }}
                  className="group overflow-hidden rounded-xl border border-white/10 bg-black/30 text-left transition hover:border-[#F58220]/50"
                >
                  <div className="aspect-square overflow-hidden">
                    {item.mimeType.startsWith("video/") ? (
                      <video
                        src={item.url}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                      />
                    ) : (
                      <OrbitMediaPreview
                        src={item.url}
                        alt={item.name}
                        className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p className="truncate px-2 py-1.5 text-[11px] text-white/60">{item.name}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
