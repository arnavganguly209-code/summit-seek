"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type { AboutPageContent, AboutTeamMember, AboutValue } from "@/types/about-page-cms";
import { OrbitImageField } from "@/components/orbit/OrbitImageField";

type Props = { initial: AboutPageContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

export function AboutPageEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
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

  const setImageAndSave = async (
    patch: Partial<AboutPageContent> | ((prev: AboutPageContent) => AboutPageContent),
  ) => {
    const next =
      typeof patch === "function" ? patch(contentRef.current) : { ...contentRef.current, ...patch };
    setContent(next);
    contentRef.current = next;
    await save(next);
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
            Edit `/about`, `/about/team`, and `/about/vision`. Upload new images or pick from Media
            library. Removing an image clears the website slot — library files stay available to reuse.
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
            <OrbitImageField
              label="About cover image"
              value={content.coverImageUrl}
              aspectClassName="aspect-[21/7]"
              onChange={(url) => update("coverImageUrl", url)}
              onAfterChange={(url) => setImageAndSave({ coverImageUrl: url })}
            />
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
            <label
              key={key}
              className={
                key.includes("Subtitle") || key.includes("Description") || key === "tagline"
                  ? "sm:col-span-2"
                  : ""
              }
            >
              <span className={label}>{lab}</span>
              <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
            </label>
          ))}
          <label className="sm:col-span-2">
            <span className={label}>Story body</span>
            <textarea
              rows={5}
              className={field}
              value={content.storyBody}
              onChange={(e) => update("storyBody", e.target.value)}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Mission body</span>
            <textarea
              rows={3}
              className={field}
              value={content.missionBody}
              onChange={(e) => update("missionBody", e.target.value)}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Vision body (about card)</span>
            <textarea
              rows={3}
              className={field}
              value={content.visionBody}
              onChange={(e) => update("visionBody", e.target.value)}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Responsible travel body</span>
            <textarea
              rows={3}
              className={field}
              value={content.responsibleBody}
              onChange={(e) => update("responsibleBody", e.target.value)}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>CTA body</span>
            <textarea
              rows={2}
              className={field}
              value={content.ctaBody}
              onChange={(e) => update("ctaBody", e.target.value)}
            />
          </label>
          <div className="sm:col-span-2">
            <OrbitImageField
              label="Story image"
              value={content.storyImageUrl}
              aspectClassName="aspect-video"
              onChange={(url) => update("storyImageUrl", url)}
              onAfterChange={(url) => setImageAndSave({ storyImageUrl: url })}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">Values</h2>
        <div className="space-y-3">
          {content.values.map((v) => (
            <div key={v.id} className="grid gap-2 rounded-xl border border-white/10 p-3 sm:grid-cols-2">
              <input
                className={field}
                value={v.title}
                onChange={(e) => updateValue(v.id, { title: e.target.value })}
                placeholder="Title"
              />
              <input
                className={field}
                value={v.description}
                onChange={(e) => updateValue(v.id, { description: e.target.value })}
                placeholder="Description"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-[14px] font-bold text-white">Team page (`/about/team`)</h2>
            <p className="mt-1 text-[12px] text-white/45">
              8 professional member boxes — photo, name, designation, and bio. Use Media library or
              upload.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const m: AboutTeamMember = {
                id: `t-${Date.now().toString(36)}`,
                name: "New Team Member",
                role: "Designation",
                bio: "",
                imageUrl: "",
                visible: true,
              };
              setContent((prev) => ({ ...prev, team: [...prev.team, m] }));
            }}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add member
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <OrbitImageField
            label="Team page cover"
            value={content.teamCoverImageUrl}
            aspectClassName="aspect-[21/7]"
            onChange={(url) => update("teamCoverImageUrl", url)}
            onAfterChange={(url) => setImageAndSave({ teamCoverImageUrl: url })}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className={label}>Team cover title</span>
              <input
                className={field}
                value={content.teamCoverTitle}
                onChange={(e) => update("teamCoverTitle", e.target.value)}
              />
            </label>
            <label>
              <span className={label}>Team meta title</span>
              <input
                className={field}
                value={content.teamMetaTitle}
                onChange={(e) => update("teamMetaTitle", e.target.value)}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Team cover subtitle</span>
              <input
                className={field}
                value={content.teamCoverSubtitle}
                onChange={(e) => update("teamCoverSubtitle", e.target.value)}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Team intro text</span>
              <textarea
                rows={3}
                className={field}
                value={content.teamIntro}
                onChange={(e) => update("teamIntro", e.target.value)}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Team meta description</span>
              <input
                className={field}
                value={content.teamMetaDescription}
                onChange={(e) => update("teamMetaDescription", e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {content.team.map((m, index) => (
            <div key={m.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[12px] font-bold uppercase tracking-wide text-white/50">
                  Member {index + 1}
                </p>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                    <input
                      type="checkbox"
                      checked={m.visible !== false}
                      onChange={(e) => updateMember(m.id, { visible: e.target.checked })}
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        team: prev.team.filter((x) => x.id !== m.id),
                      }))
                    }
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 px-2.5 text-[11px] font-semibold text-red-200"
                  >
                    <Trash2 className="size-3" /> Remove
                  </button>
                </div>
              </div>

              <OrbitImageField
                label="Photo"
                value={m.imageUrl}
                aspectClassName="aspect-[4/5]"
                onChange={(url) => updateMember(m.id, { imageUrl: url })}
                onAfterChange={(url) =>
                  setImageAndSave((prev) => ({
                    ...prev,
                    team: prev.team.map((x) => (x.id === m.id ? { ...x, imageUrl: url } : x)),
                  }))
                }
              />

              <div className="mt-3 grid gap-2">
                <label>
                  <span className={label}>Name</span>
                  <input
                    className={field}
                    value={m.name}
                    onChange={(e) => updateMember(m.id, { name: e.target.value })}
                    placeholder="Full name"
                  />
                </label>
                <label>
                  <span className={label}>Designation / Role</span>
                  <input
                    className={field}
                    value={m.role}
                    onChange={(e) => updateMember(m.id, { role: e.target.value })}
                    placeholder="e.g. Senior Trek Leader"
                  />
                </label>
                <label>
                  <span className={label}>Bio / Text</span>
                  <textarea
                    rows={3}
                    className={field}
                    value={m.bio}
                    onChange={(e) => updateMember(m.id, { bio: e.target.value })}
                    placeholder="Short professional bio"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-[14px] font-bold text-white">Vision page (`/about/vision`)</h2>
        <div className="mt-4 space-y-4">
          <OrbitImageField
            label="Vision page cover"
            value={content.visionCoverImageUrl}
            aspectClassName="aspect-[21/7]"
            onChange={(url) => update("visionCoverImageUrl", url)}
            onAfterChange={(url) => setImageAndSave({ visionCoverImageUrl: url })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className={label}>Vision page cover title</span>
              <input
                className={field}
                value={content.visionPageCoverTitle}
                onChange={(e) => update("visionPageCoverTitle", e.target.value)}
              />
            </label>
            <label>
              <span className={label}>Vision meta title</span>
              <input
                className={field}
                value={content.visionMetaTitle}
                onChange={(e) => update("visionMetaTitle", e.target.value)}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Vision page cover subtitle</span>
              <input
                className={field}
                value={content.visionPageCoverSubtitle}
                onChange={(e) => update("visionPageCoverSubtitle", e.target.value)}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Vision intro</span>
              <textarea
                rows={2}
                className={field}
                value={content.visionPageIntro}
                onChange={(e) => update("visionPageIntro", e.target.value)}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Vision page body</span>
              <textarea
                rows={8}
                className={field}
                value={content.visionPageBody}
                onChange={(e) => update("visionPageBody", e.target.value)}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Vision pillars heading</span>
              <input
                className={field}
                value={content.visionPillarsHeading}
                onChange={(e) => update("visionPillarsHeading", e.target.value)}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Vision meta description</span>
              <input
                className={field}
                value={content.visionMetaDescription}
                onChange={(e) => update("visionMetaDescription", e.target.value)}
              />
            </label>
          </div>
          <div className="space-y-3">
            <p className="text-[12px] font-semibold text-white/55">Vision pillars</p>
            {(content.visionPillars || []).map((v) => (
              <div key={v.id} className="grid gap-2 rounded-xl border border-white/10 p-3 sm:grid-cols-2">
                <input
                  className={field}
                  value={v.title}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      visionPillars: prev.visionPillars.map((p) =>
                        p.id === v.id ? { ...p, title: e.target.value } : p,
                      ),
                    }))
                  }
                  placeholder="Title"
                />
                <input
                  className={field}
                  value={v.description}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      visionPillars: prev.visionPillars.map((p) =>
                        p.id === v.id ? { ...p, description: e.target.value } : p,
                      ),
                    }))
                  }
                  placeholder="Description"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
