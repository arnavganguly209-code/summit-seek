"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, FolderOpen, Loader2, Plus, Save, Trash2, Upload } from "lucide-react";
import type {
  TravelerReviewItem,
  TravelerReviewsContent,
} from "@/types/traveler-reviews";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";
import { OrbitMediaLibraryModal } from "@/components/orbit/OrbitMediaLibraryModal";

type Props = { initial: TravelerReviewsContent };

function newReview(): TravelerReviewItem {
  return {
    id: `tr-${Date.now().toString(36)}`,
    title: "New Trek Review",
    body: "Write the traveler review here.",
    rating: 5,
    author: "Traveler Name",
    country: "Country",
    date: "01 Jan. 2026",
    initial: "T",
    visible: true,
  };
}

export function TravelerReviewsEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const update = <K extends keyof TravelerReviewsContent>(
    key: K,
    value: TravelerReviewsContent[K],
  ) => setContent((prev) => ({ ...prev, [key]: value }));

  const updateReview = (id: string, patch: Partial<TravelerReviewItem>) => {
    setContent((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
  };

  const save = async (next?: TravelerReviewsContent) => {
    const payload = next || content;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/traveler-reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to save.");
        setSaving(false);
        return false;
      }
      setContent(payload);
      setToast("Traveler reviews saved. Live homepage updated.");
      setSaving(false);
      router.refresh();
      return true;
    } catch {
      setError("Network error while saving.");
      setSaving(false);
      return false;
    }
  };

  const uploadPromoImage = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const item = await orbitUploadFile({ file });
      const next = { ...content, promoImageUrl: withCacheBust(item.url) };
      setContent(next);
      await save(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Homepage
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">Traveler Reviews</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Edit the glass promo banner, review cards, platform links, and View All
            Reviews.
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

      <div className="space-y-3 rounded-xl border border-white/10 bg-[#0d1420] p-4">
        <p className="text-[13px] font-bold text-white">Glass promo banner</p>
        <label className="flex items-center gap-2 text-[13px] text-white/70">
          <input
            type="checkbox"
            checked={content.promoVisible}
            onChange={(e) => update("promoVisible", e.target.checked)}
            className="size-3.5 accent-[#F58220]"
          />
          Promo visible
        </label>
        <div className="relative aspect-[16/9] max-w-md overflow-hidden rounded-lg bg-black/40">
          <OrbitMediaPreview
            src={content.promoImageUrl}
            alt="Promo"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 text-[12px] font-semibold">
            <Upload className="size-3.5" />
            {uploading ? "Uploading…" : "Upload promo image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void uploadPromoImage(file);
                e.target.value = "";
              }}
            />
          </label>
          <button
            type="button"
            onClick={() => setLibraryOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <FolderOpen className="size-3.5" /> Media library
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Promo eyebrow" value={content.promoEyebrow} onChange={(v) => update("promoEyebrow", v)} />
          <Field label="Promo CTA" value={content.promoCtaLabel} onChange={(v) => update("promoCtaLabel", v)} />
          <Field label="Promo CTA link" value={content.promoCtaHref} onChange={(v) => update("promoCtaHref", v)} />
          <Field label="Video label" value={content.promoVideoLabel} onChange={(v) => update("promoVideoLabel", v)} />
          <Field label="Video link" value={content.promoVideoHref} onChange={(v) => update("promoVideoHref", v)} />
          <Field label="Promo image URL" value={content.promoImageUrl} onChange={(v) => update("promoImageUrl", v)} />
        </div>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
            Promo heading
          </span>
          <input
            value={content.promoHeading}
            onChange={(e) => update("promoHeading", e.target.value)}
            className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
            Promo description
          </span>
          <textarea
            value={content.promoDescription}
            onChange={(e) => update("promoDescription", e.target.value)}
            rows={3}
            className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-[13px] text-white outline-none focus:border-[#F58220]/50"
          />
        </label>
      </div>

      <div className="grid gap-3 rounded-xl border border-white/10 bg-[#0d1420] p-4 sm:grid-cols-2">
        <Field label="Eyebrow" value={content.eyebrow} onChange={(v) => update("eyebrow", v)} />
        <Field label="Heading" value={content.heading} onChange={(v) => update("heading", v)} />
        <Field label="View all label" value={content.viewAllLabel} onChange={(v) => update("viewAllLabel", v)} />
        <Field label="View all link" value={content.viewAllHref} onChange={(v) => update("viewAllHref", v)} />
        <label className="flex items-center gap-2 text-[13px] text-white/70 sm:col-span-2">
          <input
            type="checkbox"
            checked={content.visible}
            onChange={(e) => update("visible", e.target.checked)}
            className="size-3.5 accent-[#F58220]"
          />
          Section visible
        </label>
      </div>

      <div className="space-y-3 rounded-xl border border-white/10 bg-[#0d1420] p-4">
        <p className="text-[13px] font-bold">Platforms</p>
        {content.platforms.map((p, i) => (
          <div key={p.id} className="grid gap-3 sm:grid-cols-2">
            <Field
              label={`Platform ${i + 1} name`}
              value={p.name}
              onChange={(v) =>
                update(
                  "platforms",
                  content.platforms.map((x) => (x.id === p.id ? { ...x, name: v } : x)),
                )
              }
            />
            <Field
              label="Link"
              value={p.href}
              onChange={(v) =>
                update(
                  "platforms",
                  content.platforms.map((x) => (x.id === p.id ? { ...x, href: v } : x)),
                )
              }
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => update("reviews", [...content.reviews, newReview()])}
          className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/15 px-3 text-[12px] font-semibold"
        >
          <Plus className="size-3.5" /> Add review
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {content.reviews.map((review, index) => (
          <div key={review.id} className="space-y-3 rounded-xl border border-white/10 bg-[#0d1420] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-bold">Review {index + 1}</p>
              <div className="flex items-center gap-3 text-[12px] text-white/55">
                <label className="inline-flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={review.visible !== false}
                    onChange={(e) => updateReview(review.id, { visible: e.target.checked })}
                    className="size-3.5 accent-[#F58220]"
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() =>
                    update(
                      "reviews",
                      content.reviews.filter((r) => r.id !== review.id),
                    )
                  }
                  className="inline-flex items-center gap-1 text-red-300"
                >
                  <Trash2 className="size-3.5" /> Remove
                </button>
              </div>
            </div>
            <Field label="Title" value={review.title} onChange={(v) => updateReview(review.id, { title: v })} />
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                Body
              </span>
              <textarea
                value={review.body}
                onChange={(e) => updateReview(review.id, { body: e.target.value })}
                rows={4}
                className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-[13px] text-white outline-none focus:border-[#F58220]/50"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Author" value={review.author} onChange={(v) => updateReview(review.id, { author: v })} />
              <Field label="Country" value={review.country} onChange={(v) => updateReview(review.id, { country: v })} />
              <Field label="Date" value={review.date} onChange={(v) => updateReview(review.id, { date: v })} />
              <Field label="Initial" value={review.initial} onChange={(v) => updateReview(review.id, { initial: v.slice(0, 1) })} />
              <Field
                label="Rating"
                value={String(review.rating)}
                onChange={(v) => updateReview(review.id, { rating: Number(v) || 5 })}
              />
            </div>
          </div>
        ))}
      </div>

      <OrbitMediaLibraryModal
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onSelect={async (url) => {
          const next = { ...content, promoImageUrl: url };
          setContent(next);
          await save(next);
        }}
      />
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
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50"
      />
    </label>
  );
}
