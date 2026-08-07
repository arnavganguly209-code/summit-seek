"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Save, Upload } from "lucide-react";
import type { ContactPageContent, ContactSocialLink } from "@/types/contact-cms";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";

type Props = { initial: ContactPageContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

export function ContactEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof ContactPageContent>(key: K, value: ContactPageContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const updateSocial = (id: string, patch: Partial<ContactSocialLink>) => {
    setContent((prev) => ({
      ...prev,
      socials: prev.socials.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  };

  const save = async (next?: ContactPageContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/contact", {
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
      setToast("Contact page saved. Live site updated.");
      setSaving(false);
      router.refresh();
      return true;
    } catch {
      setError("Network error while saving.");
      setSaving(false);
      return false;
    }
  };

  const uploadCover = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const replaceUrl = contentRef.current.coverImageUrl.startsWith("/media/library/")
        ? contentRef.current.coverImageUrl.split("?")[0]
        : undefined;
      const item = await orbitUploadFile({ file, replaceUrl });
      const next = { ...contentRef.current, coverImageUrl: withCacheBust(item.url) };
      setContent(next);
      contentRef.current = next;
      await save(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">Website</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Contact Page</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Edit cover, contact details, social links, form copy, map embed, and SEO meta.
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
        <p className="flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-[13px] text-emerald-100">
          <CheckCircle2 className="size-4" /> {toast}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">
          {error}
        </p>
      ) : null}

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-[14px] font-bold text-white">Cover & SEO</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <div className="relative mb-3 aspect-[21/7] overflow-hidden rounded-xl border border-white/10">
              <OrbitMediaPreview
                src={content.coverImageUrl}
                alt="Cover"
                className="h-full w-full object-cover"
              />
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void uploadCover(f);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
            >
              {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
              {uploading ? "Uploading…" : "Upload cover"}
            </button>
            <label className="mt-3 block">
              <span className={label}>Cover image URL</span>
              <input
                className={field}
                value={content.coverImageUrl}
                onChange={(e) => update("coverImageUrl", e.target.value)}
              />
            </label>
          </div>
          <label>
            <span className={label}>Cover title</span>
            <input className={field} value={content.coverTitle} onChange={(e) => update("coverTitle", e.target.value)} />
          </label>
          <label>
            <span className={label}>Cover subtitle</span>
            <input className={field} value={content.coverSubtitle} onChange={(e) => update("coverSubtitle", e.target.value)} />
          </label>
          <label>
            <span className={label}>Meta title</span>
            <input className={field} value={content.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} />
          </label>
          <label>
            <span className={label}>Meta description</span>
            <input className={field} value={content.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-[14px] font-bold text-white">Contact details</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["detailsHeading", "Details heading"],
              ["detailsIntro", "Details intro"],
              ["addressLabel", "Address label"],
              ["address", "Address"],
              ["emailLabel", "Email label"],
              ["email", "Email"],
              ["phoneLabel", "Phone label"],
              ["phone", "Phone (tel link)"],
              ["phoneDisplay", "Phone display"],
              ["whatsappLabel", "WhatsApp label"],
              ["whatsapp", "WhatsApp number"],
              ["whatsappDisplay", "WhatsApp display"],
              ["hoursLabel", "Hours label"],
              ["hours", "Hours"],
              ["socialHeading", "Social heading"],
              ["formHeading", "Form heading"],
              ["formIntro", "Form intro"],
              ["mapHeading", "Map heading"],
            ] as const
          ).map(([key, lab]) => (
            <label key={key} className={key.includes("Intro") || key === "address" || key === "hours" ? "sm:col-span-2" : ""}>
              <span className={label}>{lab}</span>
              {key.includes("Intro") ? (
                <textarea
                  rows={2}
                  className={field}
                  value={content[key]}
                  onChange={(e) => update(key, e.target.value)}
                />
              ) : (
                <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
              )}
            </label>
          ))}
          <label className="sm:col-span-2">
            <span className={label}>Google Maps embed URL</span>
            <textarea
              rows={3}
              className={field}
              value={content.mapEmbedUrl}
              onChange={(e) => update("mapEmbedUrl", e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-4 text-[14px] font-bold text-white">Social links</h2>
        <div className="space-y-3">
          {content.socials.map((s) => (
            <div key={s.id} className="grid gap-2 rounded-xl border border-white/10 p-3 sm:grid-cols-[1fr_1.4fr_auto]">
              <input
                className={field}
                value={s.label}
                onChange={(e) => updateSocial(s.id, { label: e.target.value })}
                placeholder="Label"
              />
              <input
                className={field}
                value={s.href}
                onChange={(e) => updateSocial(s.id, { href: e.target.value })}
                placeholder="URL"
              />
              <label className="inline-flex items-center gap-2 text-[12px] text-white/60">
                <input
                  type="checkbox"
                  checked={s.visible !== false}
                  onChange={(e) => updateSocial(s.id, { visible: e.target.checked })}
                />
                Visible
              </label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
