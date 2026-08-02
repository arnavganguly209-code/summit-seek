"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import type {
  FeaturedPackage,
  FeaturedPackagesContent,
} from "@/types/featured-packages";
import { ORBIT_MAX_UPLOAD_BYTES, ORBIT_MAX_UPLOAD_MB } from "@/lib/orbit/upload-limits";
import { cn } from "@/lib/utils";

type Props = {
  initial: FeaturedPackagesContent;
};

function emptyImageFallback() {
  return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80";
}

export function FeaturedPackagesEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [activeCat, setActiveCat] = useState(initial.categories[0]?.id ?? "");
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const category =
    content.categories.find((c) => c.id === activeCat) ?? content.categories[0];

  const updatePackage = (
    categoryId: string,
    packageId: string,
    patch: Partial<FeaturedPackage>,
  ) => {
    setContent((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id !== categoryId
          ? cat
          : {
              ...cat,
              packages: cat.packages.map((pkg) =>
                pkg.id === packageId ? { ...pkg, ...patch } : pkg,
              ),
            },
      ),
    }));
  };

  const updateCategoryLabel = (categoryId: string, label: string) => {
    setContent((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, label } : cat,
      ),
    }));
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/featured-packages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to save packages.");
        setSaving(false);
        return;
      }
      setToast("Featured packages saved. Live homepage updated.");
      setSaving(false);
      router.refresh();
    } catch {
      setError("Network error while saving. Please retry.");
      setSaving(false);
    }
  };

  const uploadImage = (pkg: FeaturedPackage, file: File) => {
    if (!category) return;
    const maxBytes = ORBIT_MAX_UPLOAD_BYTES;
    if (file.size <= 0) {
      setError("Empty file. Choose a valid image.");
      return;
    }
    if (file.size > maxBytes) {
      setError(
        `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max ${ORBIT_MAX_UPLOAD_MB}MB.`,
      );
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const ok =
      ["png", "jpg", "jpeg", "webp", "gif"].includes(ext) ||
      file.type.startsWith("image/");
    if (!ok) {
      setError("Use png, jpg, jpeg, webp, or gif.");
      return;
    }

    setUploadingId(pkg.id);
    setError("");
    setToast("");

    const form = new FormData();
    form.append("file", file);
    const prev = pkg.imageUrl;
    if (prev.startsWith("/media/library/")) {
      form.append("replaceUrl", prev.split("?")[0]);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/orbit/media");
    xhr.onload = () => {
      setUploadingId(null);
      try {
        const data = JSON.parse(xhr.responseText) as {
          ok?: boolean;
          error?: string;
          item?: { url: string };
        };
        if (xhr.status >= 400 || !data.ok || !data.item?.url) {
          setError(data.error || `Upload failed (HTTP ${xhr.status}).`);
          return;
        }
        updatePackage(category.id, pkg.id, {
          imageUrl: `${data.item.url}?t=${Date.now()}`,
        });
        setToast(`Image updated for “${pkg.title}”. Click Save to publish.`);
      } catch {
        setError("Upload response was invalid.");
      }
    };
    xhr.onerror = () => {
      setUploadingId(null);
      setError("Network error during upload.");
    };
    xhr.send(form);
  };

  const removeImage = async (pkg: FeaturedPackage) => {
    if (!category) return;
    const url = pkg.imageUrl.split("?")[0];
    if (url.startsWith("/media/library/")) {
      try {
        await fetch(
          `/api/orbit/media?url=${encodeURIComponent(url)}`,
          { method: "DELETE" },
        );
      } catch {
        // still clear from package
      }
    }
    updatePackage(category.id, pkg.id, { imageUrl: emptyImageFallback() });
    setToast("Image removed. Upload a new one, then Save.");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Homepage
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">Featured Packages</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Edit the 4 tabs under the hero — Top Treks, Peak Climbing, Nepal Tours,
            Luxury & VIP. Each tab shows exactly 4 packages with images, prices, and
            details.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#F58220] px-5 text-[13px] font-bold text-[#08121E] transition hover:bg-[#ff9440] disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          {saving ? "Saving…" : "Save & Publish"}
        </button>
      </div>

      {toast ? (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-[13px] text-emerald-300">
          <CheckCircle2 className="size-4 shrink-0" />
          {toast}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-300">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {content.categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCat(cat.id)}
            className={cn(
              "rounded-lg px-3.5 py-2 text-[13px] font-semibold transition",
              cat.id === category?.id
                ? "bg-[#F58220]/15 text-[#F58220]"
                : "text-white/60 hover:bg-white/5 hover:text-white",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {category ? (
        <div className="space-y-5">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Tab label
            </span>
            <input
              value={category.label}
              onChange={(e) => updateCategoryLabel(category.id, e.target.value)}
              className="h-11 w-full max-w-md rounded-lg border border-white/10 bg-[#0d1420] px-3.5 text-[14px] text-white outline-none focus:border-[#F58220]/50"
            />
          </label>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {category.packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1420]"
              >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <p className="text-[13px] font-bold text-white">
                    Package {index + 1}
                  </p>
                  <label className="inline-flex items-center gap-2 text-[12px] text-white/55">
                    <input
                      type="checkbox"
                      checked={pkg.visible !== false}
                      onChange={(e) =>
                        updatePackage(category.id, pkg.id, {
                          visible: e.target.checked,
                        })
                      }
                      className="size-3.5 accent-[#F58220]"
                    />
                    Visible
                  </label>
                </div>

                <div className="space-y-3.5 p-4">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black/40">
                    {pkg.imageUrl ? (
                      <Image
                        src={pkg.imageUrl}
                        alt={pkg.title || "Package image"}
                        fill
                        className="object-cover"
                        sizes="400px"
                        unoptimized={pkg.imageUrl.startsWith("/media/")}
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
                        if (file) uploadImage(pkg, file);
                        e.target.value = "";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileRefs.current[pkg.id]?.click()}
                      disabled={uploadingId === pkg.id}
                      className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 text-[12px] font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
                    >
                      <Upload className="size-3.5" />
                      {pkg.imageUrl.startsWith("/media/") ? "Replace" : "Upload"}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(pkg)}
                      className="inline-flex h-9 items-center gap-1.5 rounded-md border border-red-500/30 bg-red-500/10 px-3 text-[12px] font-semibold text-red-300 transition hover:bg-red-500/20"
                    >
                      <Trash2 className="size-3.5" />
                      Remove
                    </button>
                  </div>

                  <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                      Title
                    </span>
                    <input
                      value={pkg.title}
                      onChange={(e) =>
                        updatePackage(category.id, pkg.id, {
                          title: e.target.value,
                        })
                      }
                      className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                        Duration (days)
                      </span>
                      <input
                        type="number"
                        min={1}
                        value={pkg.durationDays}
                        onChange={(e) =>
                          updatePackage(category.id, pkg.id, {
                            durationDays: Number(e.target.value) || 1,
                          })
                        }
                        className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                        Link (href)
                      </span>
                      <input
                        value={pkg.href}
                        onChange={(e) =>
                          updatePackage(category.id, pkg.id, {
                            href: e.target.value,
                          })
                        }
                        className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                        Start
                      </span>
                      <input
                        value={pkg.startLocation}
                        onChange={(e) =>
                          updatePackage(category.id, pkg.id, {
                            startLocation: e.target.value,
                          })
                        }
                        className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                        End
                      </span>
                      <input
                        value={pkg.endLocation}
                        onChange={(e) =>
                          updatePackage(category.id, pkg.id, {
                            endLocation: e.target.value,
                          })
                        }
                        className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                        Price (USD)
                      </span>
                      <input
                        type="number"
                        min={0}
                        value={pkg.price}
                        onChange={(e) =>
                          updatePackage(category.id, pkg.id, {
                            price: Number(e.target.value) || 0,
                          })
                        }
                        className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                        Compare at
                      </span>
                      <input
                        type="number"
                        min={0}
                        value={pkg.compareAtPrice ?? ""}
                        onChange={(e) =>
                          updatePackage(category.id, pkg.id, {
                            compareAtPrice: e.target.value
                              ? Number(e.target.value)
                              : null,
                          })
                        }
                        className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                        Rating
                      </span>
                      <input
                        type="number"
                        min={0}
                        max={5}
                        step={0.1}
                        value={pkg.rating}
                        onChange={(e) =>
                          updatePackage(category.id, pkg.id, {
                            rating: Number(e.target.value) || 0,
                          })
                        }
                        className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                        Reviews
                      </span>
                      <input
                        type="number"
                        min={0}
                        value={pkg.reviewCount}
                        onChange={(e) =>
                          updatePackage(category.id, pkg.id, {
                            reviewCount: Number(e.target.value) || 0,
                          })
                        }
                        className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                      Image URL
                    </span>
                    <input
                      value={pkg.imageUrl}
                      onChange={(e) =>
                        updatePackage(category.id, pkg.id, {
                          imageUrl: e.target.value,
                        })
                      }
                      className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[12px] text-white/90 outline-none focus:border-[#F58220]/50"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
