"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import type { WhatWeOfferCard, WhatWeOfferContent } from "@/types/what-we-offer";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";

type Props = { initial: WhatWeOfferContent };

function newCard(): WhatWeOfferCard {
  const id = `svc-${Date.now().toString(36)}`;
  return {
    id,
    title: "New Service",
    subtitle: "1 Experience",
    href: "/packages",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    ctaLabel: "Explore More",
    visible: true,
  };
}

export function WhatWeOfferEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const contentRef = useRef(content);
  contentRef.current = content;

  const updateMeta = <K extends keyof WhatWeOfferContent>(
    key: K,
    value: WhatWeOfferContent[K],
  ) => setContent((prev) => ({ ...prev, [key]: value }));

  const updateCard = (id: string, patch: Partial<WhatWeOfferCard>) => {
    setContent((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  };

  const save = async (next?: WhatWeOfferContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/what-we-offer", {
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
      contentRef.current = payload;
      setToast("What We Offer saved. Live homepage updated.");
      setSaving(false);
      router.refresh();
      return true;
    } catch {
      setError("Network error while saving.");
      setSaving(false);
      return false;
    }
  };

  const uploadImage = async (card: WhatWeOfferCard, file: File) => {
    setUploadingId(card.id);
    setProgress(2);
    setError("");
    try {
      const current =
        contentRef.current.cards.find((c) => c.id === card.id) || card;
      const replaceUrl = current.imageUrl.startsWith("/media/library/")
        ? current.imageUrl.split("?")[0]
        : undefined;
      const item = await orbitUploadFile({
        file,
        replaceUrl,
        onProgress: setProgress,
      });
      const imageUrl = withCacheBust(item.url);
      const next: WhatWeOfferContent = {
        ...contentRef.current,
        cards: contentRef.current.cards.map((c) =>
          c.id === card.id ? { ...c, imageUrl } : c,
        ),
      };
      setContent(next);
      contentRef.current = next;
      await save(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingId(null);
      setProgress(0);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Homepage
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">What We Offer</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Edit heading, description, service cards, images, and Explore More links.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setContent((prev) => ({ ...prev, cards: [...prev.cards, newCard()] }))
            }
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-[13px] font-semibold"
          >
            <Plus className="size-4" /> Add card
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
          <div className="h-full bg-[#F58220] transition-all" style={{ width: `${Math.max(progress, 4)}%` }} />
        </div>
      ) : null}

      <div className="grid gap-4 rounded-xl border border-white/10 bg-[#0d1420] p-4">
        <Field label="Eyebrow" value={content.eyebrow} onChange={(v) => updateMeta("eyebrow", v)} />
        <Field label="Heading" value={content.heading} onChange={(v) => updateMeta("heading", v)} />
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
            Description
          </span>
          <textarea
            value={content.description}
            onChange={(e) => updateMeta("description", e.target.value)}
            rows={3}
            className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-[13px] text-white outline-none focus:border-[#F58220]/50"
          />
        </label>
        <label className="flex items-center gap-2 text-[13px] text-white/70">
          <input
            type="checkbox"
            checked={content.visible}
            onChange={(e) => updateMeta("visible", e.target.checked)}
            className="size-3.5 accent-[#F58220]"
          />
          Section visible
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {content.cards.map((card, index) => (
          <div key={card.id} className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1420]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-[13px] font-bold">Card {index + 1}</p>
              <div className="flex items-center gap-3 text-[12px] text-white/55">
                <label className="inline-flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={card.visible !== false}
                    onChange={(e) => updateCard(card.id, { visible: e.target.checked })}
                    className="size-3.5 accent-[#F58220]"
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      cards: prev.cards.filter((c) => c.id !== card.id),
                    }))
                  }
                  className="inline-flex items-center gap-1 text-red-300"
                >
                  <Trash2 className="size-3.5" /> Remove
                </button>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black/40">
                {card.imageUrl ? (
                  <OrbitMediaPreview src={card.imageUrl} alt={card.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/30">
                    <ImagePlus className="size-8" />
                  </div>
                )}
                {uploadingId === card.id ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                    <Loader2 className="size-7 animate-spin text-[#F58220]" />
                  </div>
                ) : null}
              </div>
              <input
                ref={(el) => {
                  fileRefs.current[card.id] = el;
                }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void uploadImage(card, file);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => fileRefs.current[card.id]?.click()}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
              >
                <Upload className="size-3.5" /> Upload image
              </button>
              <Field label="Title" value={card.title} onChange={(v) => updateCard(card.id, { title: v })} />
              <Field label="Subtitle" value={card.subtitle} onChange={(v) => updateCard(card.id, { subtitle: v })} />
              <Field label="CTA label" value={card.ctaLabel} onChange={(v) => updateCard(card.id, { ctaLabel: v })} />
              <Field label="Link" value={card.href} onChange={(v) => updateCard(card.id, { href: v })} />
              <Field label="Image URL" value={card.imageUrl} onChange={(v) => updateCard(card.id, { imageUrl: v })} />
            </div>
          </div>
        ))}
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
