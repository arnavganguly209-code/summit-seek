"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import type {
  TrekAddon,
  TrekDay,
  TrekEquipGroup,
  TrekFact,
  TrekFaq,
  TrekGalleryImage,
  TrekInfoBlock,
  TrekPageContent,
} from "@/types/trek-page-cms";
import { OrbitImageField } from "@/components/orbit/OrbitImageField";

type Props = { initial: TrekPageContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

function LineList({
  title,
  items,
  onChange,
}: {
  title: string;
  items: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[14px] font-bold text-white">{title}</h2>
        <button
          type="button"
          onClick={() => onChange([...items, "New item"])}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
        >
          <Plus className="size-3.5" /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              className={field}
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[index] = e.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="text-red-200"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PoonHillEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef(content);
  contentRef.current = content;

  const update = <K extends keyof TrekPageContent>(key: K, value: TrekPageContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const save = async (next?: TrekPageContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/poon-hill", {
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
      setToast("Poon Hill trek page saved. Live site updated.");
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
    patch: Partial<TrekPageContent> | ((prev: TrekPageContent) => TrekPageContent),
  ) => {
    const next =
      typeof patch === "function" ? patch(contentRef.current) : { ...contentRef.current, ...patch };
    setContent(next);
    contentRef.current = next;
    await save(next);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">Trek Pages</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Poon Hill Trek</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Full control of `/treks/poon-hill` — cover, booking, itinerary, gallery, FAQs & more.
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
        <h2 className="mb-3 text-[14px] font-bold text-white">Cover & SEO</h2>
        <OrbitImageField
          label="Cover image"
          value={content.coverImageUrl}
          aspectClassName="aspect-[21/7]"
          onChange={(url) => update("coverImageUrl", url)}
          onAfterChange={(url) => void setImageAndSave({ coverImageUrl: url })}
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["coverTitle", "Cover title"],
              ["coverSubtitle", "Cover subtitle"],
              ["title", "Page title"],
              ["regionLabel", "Region label"],
              ["metaTitle", "Meta title"],
              ["metaDescription", "Meta description"],
            ] as const
          ).map(([key, lab]) => (
            <label
              key={key}
              className={
                key.includes("Subtitle") || key.includes("Description") || key === "title"
                  ? "sm:col-span-2"
                  : ""
              }
            >
              <span className={label}>{lab}</span>
              <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
            </label>
          ))}
          <label>
            <span className={label}>Rating</span>
            <input
              type="number"
              step="0.1"
              className={field}
              value={content.rating}
              onChange={(e) => update("rating", Number(e.target.value) || 0)}
            />
          </label>
          <label>
            <span className={label}>Review count</span>
            <input
              type="number"
              className={field}
              value={content.reviewCount}
              onChange={(e) => update("reviewCount", Number(e.target.value) || 0)}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">Booking sidebar</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>Price</span>
            <input
              type="number"
              className={field}
              value={content.price}
              onChange={(e) => update("price", Number(e.target.value) || 0)}
            />
          </label>
          <label>
            <span className={label}>Compare-at price</span>
            <input
              type="number"
              className={field}
              value={content.compareAtPrice ?? ""}
              onChange={(e) =>
                update("compareAtPrice", e.target.value === "" ? null : Number(e.target.value) || 0)
              }
            />
          </label>
          {(
            [
              ["currencyPrefix", "Currency prefix"],
              ["perPersonLabel", "Per person label"],
              ["discountBadge", "Discount badge"],
              ["durationLabel", "Duration"],
              ["difficultyLabel", "Difficulty"],
              ["groupSizeLabel", "Group size"],
              ["bookLabel", "Book button"],
              ["bookHref", "Book link"],
              ["enquireLabel", "Enquire button"],
              ["enquireHref", "Enquire link"],
              ["whatsappLabel", "WhatsApp label"],
              ["whatsappHref", "WhatsApp link"],
            ] as const
          ).map(([key, lab]) => (
            <label key={key}>
              <span className={label}>{lab}</span>
              <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
            </label>
          ))}
          <label className="sm:col-span-2">
            <span className={label}>Booking note</span>
            <textarea
              rows={3}
              className={field}
              value={content.bookingNote}
              onChange={(e) => update("bookingNote", e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Trip facts</h2>
          <button
            type="button"
            onClick={() => {
              const fact: TrekFact = {
                id: `f-${Date.now().toString(36)}`,
                label: "Label",
                value: "Value",
                visible: true,
              };
              update("facts", [...content.facts, fact]);
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {content.facts.map((fact) => (
            <div key={fact.id} className="grid gap-2 rounded-xl border border-white/10 p-3 sm:grid-cols-[1fr_1fr_auto_auto]">
              <input
                className={field}
                value={fact.label}
                onChange={(e) =>
                  update(
                    "facts",
                    content.facts.map((f) =>
                      f.id === fact.id ? { ...f, label: e.target.value } : f,
                    ),
                  )
                }
              />
              <input
                className={field}
                value={fact.value}
                onChange={(e) =>
                  update(
                    "facts",
                    content.facts.map((f) =>
                      f.id === fact.id ? { ...f, value: e.target.value } : f,
                    ),
                  )
                }
              />
              <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                <input
                  type="checkbox"
                  checked={fact.visible !== false}
                  onChange={(e) =>
                    update(
                      "facts",
                      content.facts.map((f) =>
                        f.id === fact.id ? { ...f, visible: e.target.checked } : f,
                      ),
                    )
                  }
                />
                Visible
              </label>
              <button
                type="button"
                onClick={() => update("facts", content.facts.filter((f) => f.id !== fact.id))}
                className="text-red-200"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">Overview</h2>
        <OrbitImageField
          label="Overview image"
          value={content.overviewImageUrl}
          aspectClassName="aspect-video"
          onChange={(url) => update("overviewImageUrl", url)}
          onAfterChange={(url) => void setImageAndSave({ overviewImageUrl: url })}
        />
        <div className="mt-4 grid gap-3">
          <label>
            <span className={label}>Overview heading</span>
            <input
              className={field}
              value={content.overviewHeading}
              onChange={(e) => update("overviewHeading", e.target.value)}
            />
          </label>
          <label>
            <span className={label}>Overview body</span>
            <textarea
              rows={6}
              className={field}
              value={content.overviewBody}
              onChange={(e) => update("overviewBody", e.target.value)}
            />
          </label>
          {(
            [
              ["highlightsHeading", "Highlights heading"],
              ["advantagesHeading", "Advantages heading"],
              ["whyHeading", "Why heading"],
              ["beginnersHeading", "Beginners heading"],
              ["prepHeading", "Prep heading"],
            ] as const
          ).map(([key, lab]) => (
            <label key={key}>
              <span className={label}>{lab}</span>
              <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
            </label>
          ))}
          <label>
            <span className={label}>Beginners body</span>
            <textarea
              rows={4}
              className={field}
              value={content.beginnersBody}
              onChange={(e) => update("beginnersBody", e.target.value)}
            />
          </label>
        </div>
      </section>

      <LineList title="Highlights" items={content.highlights} onChange={(v) => update("highlights", v)} />
      <LineList title="Advantages" items={content.advantages} onChange={(v) => update("advantages", v)} />
      <LineList title="Why points" items={content.whyPoints} onChange={(v) => update("whyPoints", v)} />
      <LineList title="Prep points" items={content.prepPoints} onChange={(v) => update("prepPoints", v)} />

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Itinerary days</h2>
          <button
            type="button"
            onClick={() => {
              const day: TrekDay = {
                id: `d-${Date.now().toString(36)}`,
                dayLabel: `Day ${content.days.length + 1}`,
                title: "New day",
                maxAltitude: "",
                meals: "",
                accommodation: "",
                description: "",
                imageUrl: "",
                visible: true,
              };
              update("days", [...content.days, day]);
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add day
          </button>
        </div>
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>Itinerary heading</span>
            <input
              className={field}
              value={content.itineraryHeading}
              onChange={(e) => update("itineraryHeading", e.target.value)}
            />
          </label>
          <label>
            <span className={label}>Itinerary intro</span>
            <input
              className={field}
              value={content.itineraryIntro}
              onChange={(e) => update("itineraryIntro", e.target.value)}
            />
          </label>
        </div>
        <div className="space-y-4">
          {content.days.map((day) => (
            <div key={day.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-2 flex justify-end gap-2">
                <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    checked={day.visible !== false}
                    onChange={(e) =>
                      update(
                        "days",
                        content.days.map((d) =>
                          d.id === day.id ? { ...d, visible: e.target.checked } : d,
                        ),
                      )
                    }
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() => update("days", content.days.filter((d) => d.id !== day.id))}
                  className="text-red-200"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <OrbitImageField
                label="Day image (optional)"
                value={day.imageUrl}
                aspectClassName="aspect-video"
                onChange={(url) =>
                  update(
                    "days",
                    content.days.map((d) => (d.id === day.id ? { ...d, imageUrl: url } : d)),
                  )
                }
                onAfterChange={(url) =>
                  void setImageAndSave((prev) => ({
                    ...prev,
                    days: prev.days.map((d) => (d.id === day.id ? { ...d, imageUrl: url } : d)),
                  }))
                }
              />
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {(
                  [
                    ["dayLabel", "Day label"],
                    ["title", "Title"],
                    ["maxAltitude", "Max altitude"],
                    ["meals", "Meals"],
                    ["accommodation", "Accommodation"],
                  ] as const
                ).map(([key, lab]) => (
                  <label key={key} className={key === "title" ? "sm:col-span-2" : ""}>
                    <span className={label}>{lab}</span>
                    <input
                      className={field}
                      value={day[key]}
                      onChange={(e) =>
                        update(
                          "days",
                          content.days.map((d) =>
                            d.id === day.id ? { ...d, [key]: e.target.value } : d,
                          ),
                        )
                      }
                    />
                  </label>
                ))}
                <label className="sm:col-span-2">
                  <span className={label}>Description</span>
                  <textarea
                    rows={4}
                    className={field}
                    value={day.description}
                    onChange={(e) =>
                      update(
                        "days",
                        content.days.map((d) =>
                          d.id === day.id ? { ...d, description: e.target.value } : d,
                        ),
                      )
                    }
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">Availability</h2>
        <div className="grid gap-3">
          <label>
            <span className={label}>Heading</span>
            <input
              className={field}
              value={content.availabilityHeading}
              onChange={(e) => update("availabilityHeading", e.target.value)}
            />
          </label>
          <label>
            <span className={label}>Body</span>
            <textarea
              rows={3}
              className={field}
              value={content.availabilityBody}
              onChange={(e) => update("availabilityBody", e.target.value)}
            />
          </label>
        </div>
      </section>
      <LineList
        title="Availability notes"
        items={content.availabilityNotes}
        onChange={(v) => update("availabilityNotes", v)}
      />

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Add-ons</h2>
          <button
            type="button"
            onClick={() => {
              const item: TrekAddon = {
                id: `a-${Date.now().toString(36)}`,
                title: "New add-on",
                description: "",
                priceLabel: "On request",
                visible: true,
              };
              update("addons", [...content.addons, item]);
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <label className="mb-3 block">
          <span className={label}>Add-ons heading</span>
          <input
            className={field}
            value={content.addonsHeading}
            onChange={(e) => update("addonsHeading", e.target.value)}
          />
        </label>
        <div className="space-y-3">
          {content.addons.map((addon) => (
            <div key={addon.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-2 flex justify-end gap-2">
                <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    checked={addon.visible !== false}
                    onChange={(e) =>
                      update(
                        "addons",
                        content.addons.map((a) =>
                          a.id === addon.id ? { ...a, visible: e.target.checked } : a,
                        ),
                      )
                    }
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() => update("addons", content.addons.filter((a) => a.id !== addon.id))}
                  className="text-red-200"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <input
                className={field}
                value={addon.title}
                onChange={(e) =>
                  update(
                    "addons",
                    content.addons.map((a) =>
                      a.id === addon.id ? { ...a, title: e.target.value } : a,
                    ),
                  )
                }
              />
              <textarea
                rows={2}
                className={`${field} mt-2`}
                value={addon.description}
                onChange={(e) =>
                  update(
                    "addons",
                    content.addons.map((a) =>
                      a.id === addon.id ? { ...a, description: e.target.value } : a,
                    ),
                  )
                }
              />
              <input
                className={`${field} mt-2`}
                value={addon.priceLabel}
                placeholder="Price label"
                onChange={(e) =>
                  update(
                    "addons",
                    content.addons.map((a) =>
                      a.id === addon.id ? { ...a, priceLabel: e.target.value } : a,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </section>

      <LineList title="Includes" items={content.includes} onChange={(v) => update("includes", v)} />
      <LineList title="Excludes" items={content.excludes} onChange={(v) => update("excludes", v)} />
      <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-2">
        <label>
          <span className={label}>Includes heading</span>
          <input
            className={field}
            value={content.includesHeading}
            onChange={(e) => update("includesHeading", e.target.value)}
          />
        </label>
        <label>
          <span className={label}>Excludes heading</span>
          <input
            className={field}
            value={content.excludesHeading}
            onChange={(e) => update("excludesHeading", e.target.value)}
          />
        </label>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Gallery</h2>
          <button
            type="button"
            onClick={() => {
              const item: TrekGalleryImage = {
                id: `g-${Date.now().toString(36)}`,
                url: "",
                caption: "",
                visible: true,
              };
              update("gallery", [...content.gallery, item]);
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add image
          </button>
        </div>
        <label className="mb-3 block">
          <span className={label}>Gallery heading</span>
          <input
            className={field}
            value={content.galleryHeading}
            onChange={(e) => update("galleryHeading", e.target.value)}
          />
        </label>
        <div className="space-y-4">
          {content.gallery.map((img) => (
            <div key={img.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-2 flex justify-end gap-2">
                <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    checked={img.visible !== false}
                    onChange={(e) =>
                      update(
                        "gallery",
                        content.gallery.map((g) =>
                          g.id === img.id ? { ...g, visible: e.target.checked } : g,
                        ),
                      )
                    }
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() =>
                    update(
                      "gallery",
                      content.gallery.filter((g) => g.id !== img.id),
                    )
                  }
                  className="text-red-200"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <OrbitImageField
                label="Gallery image"
                value={img.url}
                aspectClassName="aspect-video"
                onChange={(url) =>
                  update(
                    "gallery",
                    content.gallery.map((g) => (g.id === img.id ? { ...g, url } : g)),
                  )
                }
                onAfterChange={(url) =>
                  void setImageAndSave((prev) => ({
                    ...prev,
                    gallery: prev.gallery.map((g) => (g.id === img.id ? { ...g, url } : g)),
                  }))
                }
              />
              <input
                className={`${field} mt-2`}
                value={img.caption}
                placeholder="Caption"
                onChange={(e) =>
                  update(
                    "gallery",
                    content.gallery.map((g) =>
                      g.id === img.id ? { ...g, caption: e.target.value } : g,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Essential info blocks</h2>
          <button
            type="button"
            onClick={() => {
              const item: TrekInfoBlock = {
                id: `e-${Date.now().toString(36)}`,
                title: "New block",
                body: "",
                imageUrl: "",
                visible: true,
              };
              update("essentialBlocks", [...content.essentialBlocks, item]);
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <label className="mb-3 block">
          <span className={label}>Essential heading</span>
          <input
            className={field}
            value={content.essentialHeading}
            onChange={(e) => update("essentialHeading", e.target.value)}
          />
        </label>
        <div className="space-y-4">
          {content.essentialBlocks.map((block) => (
            <div key={block.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-2 flex justify-end gap-2">
                <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    checked={block.visible !== false}
                    onChange={(e) =>
                      update(
                        "essentialBlocks",
                        content.essentialBlocks.map((b) =>
                          b.id === block.id ? { ...b, visible: e.target.checked } : b,
                        ),
                      )
                    }
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() =>
                    update(
                      "essentialBlocks",
                      content.essentialBlocks.filter((b) => b.id !== block.id),
                    )
                  }
                  className="text-red-200"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <OrbitImageField
                label="Block image (optional)"
                value={block.imageUrl}
                aspectClassName="aspect-video"
                onChange={(url) =>
                  update(
                    "essentialBlocks",
                    content.essentialBlocks.map((b) =>
                      b.id === block.id ? { ...b, imageUrl: url } : b,
                    ),
                  )
                }
                onAfterChange={(url) =>
                  void setImageAndSave((prev) => ({
                    ...prev,
                    essentialBlocks: prev.essentialBlocks.map((b) =>
                      b.id === block.id ? { ...b, imageUrl: url } : b,
                    ),
                  }))
                }
              />
              <input
                className={`${field} mt-2`}
                value={block.title}
                onChange={(e) =>
                  update(
                    "essentialBlocks",
                    content.essentialBlocks.map((b) =>
                      b.id === block.id ? { ...b, title: e.target.value } : b,
                    ),
                  )
                }
              />
              <textarea
                rows={3}
                className={`${field} mt-2`}
                value={block.body}
                onChange={(e) =>
                  update(
                    "essentialBlocks",
                    content.essentialBlocks.map((b) =>
                      b.id === block.id ? { ...b, body: e.target.value } : b,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">Equipment groups</h2>
          <button
            type="button"
            onClick={() => {
              const item: TrekEquipGroup = {
                id: `eq-${Date.now().toString(36)}`,
                title: "New group",
                items: [],
                visible: true,
              };
              update("equipmentGroups", [...content.equipmentGroups, item]);
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <div className="mb-3 grid gap-3">
          <label>
            <span className={label}>Equipment heading</span>
            <input
              className={field}
              value={content.equipmentHeading}
              onChange={(e) => update("equipmentHeading", e.target.value)}
            />
          </label>
          <label>
            <span className={label}>Equipment intro</span>
            <textarea
              rows={2}
              className={field}
              value={content.equipmentIntro}
              onChange={(e) => update("equipmentIntro", e.target.value)}
            />
          </label>
        </div>
        <div className="space-y-3">
          {content.equipmentGroups.map((group) => (
            <div key={group.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-2 flex justify-end gap-2">
                <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    checked={group.visible !== false}
                    onChange={(e) =>
                      update(
                        "equipmentGroups",
                        content.equipmentGroups.map((g) =>
                          g.id === group.id ? { ...g, visible: e.target.checked } : g,
                        ),
                      )
                    }
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() =>
                    update(
                      "equipmentGroups",
                      content.equipmentGroups.filter((g) => g.id !== group.id),
                    )
                  }
                  className="text-red-200"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <input
                className={field}
                value={group.title}
                onChange={(e) =>
                  update(
                    "equipmentGroups",
                    content.equipmentGroups.map((g) =>
                      g.id === group.id ? { ...g, title: e.target.value } : g,
                    ),
                  )
                }
              />
              <label className="mt-2 block">
                <span className={label}>Items (one per line)</span>
                <textarea
                  rows={5}
                  className={field}
                  value={group.items.join("\n")}
                  onChange={(e) =>
                    update(
                      "equipmentGroups",
                      content.equipmentGroups.map((g) =>
                        g.id === group.id
                          ? {
                              ...g,
                              items: e.target.value
                                .split("\n")
                                .map((l) => l.trim())
                                .filter(Boolean),
                            }
                          : g,
                      ),
                    )
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <LineList
        title="Company provides"
        items={content.companyProvides}
        onChange={(v) => update("companyProvides", v)}
      />
      <label className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <span className={label}>Company provides heading</span>
        <input
          className={field}
          value={content.companyProvidesHeading}
          onChange={(e) => update("companyProvidesHeading", e.target.value)}
        />
      </label>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-white">FAQs</h2>
          <button
            type="button"
            onClick={() => {
              const item: TrekFaq = {
                id: `q-${Date.now().toString(36)}`,
                question: "New question?",
                answer: "",
                visible: true,
              };
              update("faqs", [...content.faqs, item]);
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
          >
            <Plus className="size-3.5" /> Add FAQ
          </button>
        </div>
        <label className="mb-3 block">
          <span className={label}>FAQs heading</span>
          <input
            className={field}
            value={content.faqsHeading}
            onChange={(e) => update("faqsHeading", e.target.value)}
          />
        </label>
        <div className="space-y-3">
          {content.faqs.map((faq) => (
            <div key={faq.id} className="rounded-xl border border-white/10 p-3">
              <div className="mb-2 flex justify-end gap-2">
                <label className="inline-flex items-center gap-1.5 text-[11px] text-white/60">
                  <input
                    type="checkbox"
                    checked={faq.visible !== false}
                    onChange={(e) =>
                      update(
                        "faqs",
                        content.faqs.map((f) =>
                          f.id === faq.id ? { ...f, visible: e.target.checked } : f,
                        ),
                      )
                    }
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() => update("faqs", content.faqs.filter((f) => f.id !== faq.id))}
                  className="text-red-200"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <input
                className={field}
                value={faq.question}
                onChange={(e) =>
                  update(
                    "faqs",
                    content.faqs.map((f) =>
                      f.id === faq.id ? { ...f, question: e.target.value } : f,
                    ),
                  )
                }
              />
              <textarea
                rows={3}
                className={`${field} mt-2`}
                value={faq.answer}
                onChange={(e) =>
                  update(
                    "faqs",
                    content.faqs.map((f) =>
                      f.id === faq.id ? { ...f, answer: e.target.value } : f,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-3 text-[14px] font-bold text-white">CTA</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ["ctaHeading", "CTA heading"],
              ["ctaBody", "CTA body"],
              ["ctaPrimaryLabel", "Primary label"],
              ["ctaPrimaryHref", "Primary link"],
              ["ctaSecondaryLabel", "Secondary label"],
              ["ctaSecondaryHref", "Secondary link"],
            ] as const
          ).map(([key, lab]) => (
            <label key={key} className={key === "ctaBody" ? "sm:col-span-2" : ""}>
              <span className={label}>{lab}</span>
              <input className={field} value={content[key]} onChange={(e) => update(key, e.target.value)} />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
