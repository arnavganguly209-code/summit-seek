"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2, Upload } from "lucide-react";
import type { AboutPageContent, AboutTeamMember, AboutValue } from "@/types/about-page-cms";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";

type Props = { initial: AboutPageContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

export function AboutPageEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof AboutPageContent>(key: K, value: AboutPageContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: AboutPageContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/about-page", {
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
      setToast("About pages saved. Live site updated.");
      setSaving(false);
      router.refresh();
      return true;
    } catch {
      setError("Network error while saving.");
      setSaving(false);
      return false;
    }
  };

  const upload = async (slot: "cover" | "story" | `team:${string}`, currentUrl: string, file: File) => {
    setUploading(slot);
    setError("");
    try {
      const replaceUrl = currentUrl.startsWith("/media/library/")
        ? currentUrl.split("?")[0]
        : undefined;
      const item = await orbitUploadFile({ file, replaceUrl });
      const url = withCacheBust(item.url);
      let next = { ...contentRef.current };
      if (slot === "cover") next = { ...next, coverImageUrl: url };
      else if (slot === "story") next = { ...next, storyImageUrl: url };
      else {
        const id = slot.slice(5);
        next = {
          ...next,
          team: next.team.map((m) => (m.id === id ? { ...m, imageUrl: url } : m)),
        };
      }
      setContent(next);
      contentRef.current = next;
      await save(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(null);
    }
  };

  const updateValue = (id: string, patch: Partial<AboutValue>) => {
    setContent((prev) => ({
      ...prev,
      values: prev.values.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    }));
  };

  const updateMember = (id: string, patch: Partial<AboutTeamMember>) => {
    setContent((prev) => ({
      ...prev,
      team: prev.team.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">Website</p>
          <h1 className="mt-1 text-2xl font-bold text-white">About / Team / Vision</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Edit `/about`, `/about/team`, and `/about/vision` — cover, story, mission, values, team, and SEO.
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
        <h2 className="text-[14px] font-bold text-white">About page</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <div className="relative mb-3 aspect-[21/7] overflow-hidden rounded-xl border border-white/10">
              <OrbitMediaPreview src={content.coverImageUrl} alt="Cover" className="h-full w-full object-cover" />
            </div>
            <input
              ref={(el) => {
                fileRefs.current.cover = el;
              }}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void upload("cover", content.coverImageUrl, f);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              disabled={uploading === "cover"}
              onClick={() => fileRefs.current.cover?.click()}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
            >
              {uploading === "cover" ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
              Upload cover
            </button>
          </div>
          {(
            [
              ["coverTitle", "Cover title"],
              ["coverSubtitle", "Cover subtitle"],
              ["companyName", "Company name"],
              ["tagline", "Tagline"],
              ["storyHeading", "Story heading"],
              ["metaTitle", "Meta title"],
              ["metaDescription", "Meta description"],
              ["missionHeading", "Mission heading"],
              ["visionHeading", "Vision heading"],
              ["valuesHeading", "Values heading"],
              ["responsibleHeading", "Responsible heading"],
              ["ctaHeading", "CTA heading"],
              ["ctaLabel", "CTA label"],
              ["ctaHref", "CTA link"],
            ] as const
          ).map(([key, lab]) => (
            <label key={key} className={key.includes("Subtitle") || key.includes("Description") || key === "tagline" ? "sm:col-span-2" : ""}>
              <span className={label}>{lab}</span>
              <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
            </label>
          ))}
          <label className="sm:col-span-2">
            <span className={label}>Story body</span>
            <textarea rows={5} className={field} value={content.storyBody} onChange={(e) => update("storyBody", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Mission body</span>
            <textarea rows={3} className={field} value={content.missionBody} onChange={(e) => update("missionBody", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Vision body (about card)</span>
            <textarea rows={3} className={field} value={content.visionBody} onChange={(e) => update("visionBody", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Responsible travel body</span>
            <textarea rows={3} className={field} value={content.responsibleBody} onChange={(e) => update("responsibleBody", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>CTA body</span>
            <textarea rows={2} className={field} value={content.ctaBody} onChange={(e) => update("ctaBody", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Story image URL</span>
            <div className="mb-2 aspect-video overflow-hidden rounded-xl border border-white/10">
              <OrbitMediaPreview src={content.storyImageUrl} alt="Story" className="h-full w-full object-cover" />
            </div>
            <input
              ref={(el) => {
                fileRefs.current.story = el;
              }}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void upload("story", content.storyImageUrl, f);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              disabled={uploading === "story"}
              onClick={() => fileRefs.current.story?.click()}
              className="mb-2 inline-flex h-9 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
            >
              {uploading === "story" ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
              Upload story image
            </button>
            <input className={field} value={content.storyImageUrl} onChange={(e) => update("storyImageUrl", e.target.value)} />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">Values</h2>
        <div className="space-y-3">
          {content.values.map((v) => (
            <div key={v.id} className="grid gap-2 rounded-xl border border-white/10 p-3 sm:grid-cols-2">
              <input className={field} value={v.title} onChange={(e) => updateValue(v.id, { title: e.target.value })} placeholder="Title" />
              <input className={field} value={v.description} onChange={(e) => updateValue(v.id, { description: e.target.value })} placeholder="Description" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[14px] font-bold text-white">Team page</h2>
          <button
            type="button"
            onClick={() => {
              const m: AboutTeamMember = {
                id: `t-${Date.now().toString(36)}`,
                name: "New Team Member",
                role: "Role",
                bio: "Short bio.",
                imageUrl:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
                visible: true,
              };
              setContent((prev) => ({ ...prev, team: [...prev.team, m] }));
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add member
          </button>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>Team cover title</span>
            <input className={field} value={content.teamCoverTitle} onChange={(e) => update("teamCoverTitle", e.target.value)} />
          </label>
          <label>
            <span className={label}>Team meta title</span>
            <input className={field} value={content.teamMetaTitle} onChange={(e) => update("teamMetaTitle", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Team cover subtitle</span>
            <input className={field} value={content.teamCoverSubtitle} onChange={(e) => update("teamCoverSubtitle", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Team intro</span>
            <textarea rows={2} className={field} value={content.teamIntro} onChange={(e) => update("teamIntro", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Team meta description</span>
            <input className={field} value={content.teamMetaDescription} onChange={(e) => update("teamMetaDescription", e.target.value)} />
          </label>
        </div>
        <div className="mt-4 space-y-3">
          {content.team.map((m) => (
            <div key={m.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-2 flex aspect-[16/9] overflow-hidden rounded-lg border border-white/10 sm:aspect-[21/9]">
                <OrbitMediaPreview src={m.imageUrl} alt={m.name} className="h-full w-full object-cover" />
              </div>
              <input
                ref={(el) => {
                  fileRefs.current[`team:${m.id}`] = el;
                }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void upload(`team:${m.id}`, m.imageUrl, f);
                  e.target.value = "";
                }}
              />
              <div className="mb-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={uploading === `team:${m.id}`}
                  onClick={() => fileRefs.current[`team:${m.id}`]?.click()}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 text-[11px] font-semibold"
                >
                  {uploading === `team:${m.id}` ? <Loader2 className="size-3 animate-spin" /> : <Upload className="size-3" />}
                  Photo
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setContent((prev) => ({ ...prev, team: prev.team.filter((x) => x.id !== m.id) }))
                  }
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 px-2.5 text-[11px] font-semibold text-red-200"
                >
                  <Trash2 className="size-3" /> Remove
                </button>
                <label className="inline-flex h-8 items-center gap-1.5 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    checked={m.visible !== false}
                    onChange={(e) => updateMember(m.id, { visible: e.target.checked })}
                  />
                  Visible
                </label>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <input className={field} value={m.name} onChange={(e) => updateMember(m.id, { name: e.target.value })} placeholder="Name" />
                <input className={field} value={m.role} onChange={(e) => updateMember(m.id, { role: e.target.value })} placeholder="Role" />
                <textarea
                  rows={2}
                  className={`${field} sm:col-span-2`}
                  value={m.bio}
                  onChange={(e) => updateMember(m.id, { bio: e.target.value })}
                  placeholder="Bio"
                />
                <input
                  className={`${field} sm:col-span-2`}
                  value={m.imageUrl}
                  onChange={(e) => updateMember(m.id, { imageUrl: e.target.value })}
                  placeholder="Image URL"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-[14px] font-bold text-white">Vision page</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>Vision page cover title</span>
            <input className={field} value={content.visionPageCoverTitle} onChange={(e) => update("visionPageCoverTitle", e.target.value)} />
          </label>
          <label>
            <span className={label}>Vision meta title</span>
            <input className={field} value={content.visionMetaTitle} onChange={(e) => update("visionMetaTitle", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Vision page cover subtitle</span>
            <input className={field} value={content.visionPageCoverSubtitle} onChange={(e) => update("visionPageCoverSubtitle", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Vision page body</span>
            <textarea rows={6} className={field} value={content.visionPageBody} onChange={(e) => update("visionPageBody", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Vision meta description</span>
            <input className={field} value={content.visionMetaDescription} onChange={(e) => update("visionMetaDescription", e.target.value)} />
          </label>
        </div>
      </section>
    </div>
  );
}
