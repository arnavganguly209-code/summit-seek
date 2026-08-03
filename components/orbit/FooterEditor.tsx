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
import type { FooterContent, FooterPartner, FooterPayment } from "@/types/footer-cms";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";

type Props = { initial: FooterContent };

type UploadSlot =
  | "topLogo"
  | "brandLogo"
  | "travelersBadge"
  | `partner:${string}`
  | `payment:${string}`;

export function FooterEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<UploadSlot | null>(null);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof FooterContent>(key: K, value: FooterContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: FooterContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/footer", {
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
      setToast("Footer saved. Live site updated.");
      setSaving(false);
      router.refresh();
      return true;
    } catch {
      setError("Network error while saving.");
      setSaving(false);
      return false;
    }
  };

  const uploadTo = async (slot: UploadSlot, currentUrl: string, file: File) => {
    setUploading(slot);
    setProgress(2);
    setError("");
    try {
      const replaceUrl = currentUrl.startsWith("/media/library/")
        ? currentUrl.split("?")[0]
        : undefined;
      const item = await orbitUploadFile({
        file,
        replaceUrl,
        onProgress: setProgress,
      });
      const url = withCacheBust(item.url);
      let next = { ...contentRef.current };

      if (slot === "topLogo") next = { ...next, topLogoUrl: url };
      else if (slot === "brandLogo") next = { ...next, brandLogoUrl: url };
      else if (slot === "travelersBadge") next = { ...next, travelersChoiceBadgeUrl: url };
      else if (slot.startsWith("partner:")) {
        const id = slot.slice(8);
        next = {
          ...next,
          partners: next.partners.map((p) => (p.id === id ? { ...p, logoUrl: url } : p)),
        };
      } else if (slot.startsWith("payment:")) {
        const id = slot.slice(8);
        next = {
          ...next,
          payments: next.payments.map((p) => (p.id === id ? { ...p, imageUrl: url } : p)),
        };
      }

      setContent(next);
      contentRef.current = next;
      await save(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(null);
      setProgress(0);
    }
  };

  const ImageSlot = ({
    slot,
    url,
    label,
  }: {
    slot: UploadSlot;
    url: string;
    label: string;
  }) => (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-white/50">{label}</p>
      <div className="relative mb-3 flex h-24 items-center justify-center overflow-hidden rounded-lg bg-black/30">
        {uploading === slot ? (
          <div className="flex flex-col items-center gap-1 text-white/70">
            <Loader2 className="size-5 animate-spin" />
            <span className="text-xs">{progress}%</span>
          </div>
        ) : (
          <OrbitMediaPreview src={url} alt={label} className="max-h-full max-w-full object-contain p-2" />
        )}
      </div>
      <input
        ref={(el) => {
          fileRefs.current[slot] = el;
        }}
        type="file"
        accept="image/*,.svg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void uploadTo(slot, url, file);
        }}
      />
      <button
        type="button"
        disabled={!!uploading || saving}
        onClick={() => fileRefs.current[slot]?.click()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/15 disabled:opacity-50"
      >
        {url.startsWith("/media/") ? <Upload className="size-3.5" /> : <ImagePlus className="size-3.5" />}
        {url.startsWith("/media/") ? "Replace" : "Upload"}
      </button>
    </div>
  );

  const updatePartner = (id: string, patch: Partial<FooterPartner>) => {
    setContent((prev) => ({
      ...prev,
      partners: prev.partners.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  const updatePayment = (id: string, patch: Partial<FooterPayment>) => {
    setContent((prev) => ({
      ...prev,
      payments: prev.payments.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F58220]">Website</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Footer</h1>
          <p className="mt-1 max-w-xl text-sm text-white/55">
            Upload and replace every footer logo — partners, payment cards, brand marks, and badges.
          </p>
        </div>
        <button
          type="button"
          disabled={saving || !!uploading}
          onClick={() => void save()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#F58220] px-4 py-2.5 text-sm font-bold text-[#071526] transition hover:brightness-110 disabled:opacity-50"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save & Publish
        </button>
      </div>

      {toast ? (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          <CheckCircle2 className="size-4 shrink-0" />
          {toast}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white/70">Brand logos</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ImageSlot slot="topLogo" url={content.topLogoUrl} label="Top white logo" />
          <ImageSlot slot="brandLogo" url={content.brandLogoUrl} label="Navy brand logo" />
          <ImageSlot
            slot="travelersBadge"
            url={content.travelersChoiceBadgeUrl}
            label="Travelers' Choice badge"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-white/50">
            Brand tagline
            <textarea
              value={content.brandTagline}
              onChange={(e) => update("brandTagline", e.target.value)}
              rows={3}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-[#F58220]"
            />
          </label>
          <div className="space-y-3">
            <label className="block text-xs text-white/50">
              Newsletter heading
              <input
                value={content.newsletterHeading}
                onChange={(e) => update("newsletterHeading", e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-[#F58220]"
              />
            </label>
            <label className="block text-xs text-white/50">
              Newsletter description
              <input
                value={content.newsletterDescription}
                onChange={(e) => update("newsletterDescription", e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-[#F58220]"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/70">Partner logos</h2>
          <button
            type="button"
            onClick={() =>
              setContent((prev) => ({
                ...prev,
                partners: [
                  ...prev.partners,
                  {
                    id: `partner-${Date.now().toString(36)}`,
                    label: "New Partner",
                    href: "#",
                    logoUrl: "/partners/nepal-flag.svg",
                    visible: true,
                  },
                ],
              }))
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.partners.map((partner) => (
            <div key={partner.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
              <ImageSlot
                slot={`partner:${partner.id}`}
                url={partner.logoUrl}
                label={partner.label || "Partner"}
              />
              <div className="mt-3 space-y-2">
                <input
                  value={partner.label}
                  onChange={(e) => updatePartner(partner.id, { label: e.target.value })}
                  placeholder="Label"
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-[#F58220]"
                />
                <input
                  value={partner.href}
                  onChange={(e) => updatePartner(partner.id, { href: e.target.value })}
                  placeholder="https://"
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-[#F58220]"
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-white/60">
                    <input
                      type="checkbox"
                      checked={partner.visible}
                      onChange={(e) => updatePartner(partner.id, { visible: e.target.checked })}
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        partners: prev.partners.filter((p) => p.id !== partner.id),
                      }))
                    }
                    className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200"
                  >
                    <Trash2 className="size-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white/70">
              We Accept — payment logos
            </h2>
            <p className="mt-1 text-xs text-white/45">
              Shown in one centered row on the live footer. Upload your own Visa / Mastercard images.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={content.weAcceptLabel}
              onChange={(e) => update("weAcceptLabel", e.target.value)}
              className="w-36 rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white outline-none focus:border-[#F58220]"
            />
            <button
              type="button"
              onClick={() =>
                setContent((prev) => ({
                  ...prev,
                  payments: [
                    ...prev.payments,
                    {
                      id: `pay-${Date.now().toString(36)}`,
                      label: "New Card",
                      imageUrl: "/payments/visa.svg",
                      visible: true,
                    },
                  ],
                }))
              }
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15"
            >
              <Plus className="size-3.5" /> Add
            </button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.payments.map((pay) => (
            <div key={pay.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
              <ImageSlot slot={`payment:${pay.id}`} url={pay.imageUrl} label={pay.label} />
              <div className="mt-3 space-y-2">
                <input
                  value={pay.label}
                  onChange={(e) => updatePayment(pay.id, { label: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-[#F58220]"
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-white/60">
                    <input
                      type="checkbox"
                      checked={pay.visible}
                      onChange={(e) => updatePayment(pay.id, { visible: e.target.checked })}
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        payments: prev.payments.filter((p) => p.id !== pay.id),
                      }))
                    }
                    className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200"
                  >
                    <Trash2 className="size-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white/70">Bottom bar</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-white/50">
            Copyright text
            <input
              value={content.copyrightText}
              onChange={(e) => update("copyrightText", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-[#F58220]"
            />
          </label>
          <label className="block text-xs text-white/50">
            Developed-by name
            <input
              value={content.developedByName}
              onChange={(e) => update("developedByName", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-[#F58220]"
            />
          </label>
          <label className="block text-xs text-white/50">
            Developed-by label
            <input
              value={content.developedByLabel}
              onChange={(e) => update("developedByLabel", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-[#F58220]"
            />
          </label>
          <label className="block text-xs text-white/50">
            Developed-by URL
            <input
              value={content.developedByHref}
              onChange={(e) => update("developedByHref", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-[#F58220]"
            />
          </label>
        </div>
      </section>
    </div>
  );
}
