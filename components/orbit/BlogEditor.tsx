"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ChevronDown,
  FolderOpen,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import type { BlogPageContent, BlogPost } from "@/types/blog-cms";
import { orbitUploadFile, withCacheBust } from "@/lib/orbit/client-upload";
import { OrbitMediaPreview } from "@/components/orbit/OrbitMediaPreview";
import { OrbitMediaLibraryModal } from "@/components/orbit/OrbitMediaLibraryModal";

type Props = { initial: BlogPageContent };

const field =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#F58220]/60";
const label = "mb-1 block text-[11px] font-medium text-white/55";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function newPost(): BlogPost {
  const id = `blog-${Date.now().toString(36)}`;
  return {
    id,
    slug: id,
    title: "New Blog Post",
    excerpt: "Short summary for the blog listing card.",
    content:
      "Write your article here.\n\nUse a blank line between paragraphs for clean spacing on the live page.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    author: "Summit Seek",
    category: "Travel Tips",
    tags: ["Nepal", "Trekking"],
    keywords: "nepal trekking, himalaya blog",
    metaTitle: "New Blog Post",
    metaDescription: "Short SEO description for search engines.",
    dateLabel: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    publishedAt: new Date().toISOString().slice(0, 10),
    visible: true,
  };
}

export function BlogEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [openId, setOpenId] = useState<string | null>(initial.posts[0]?.id || null);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [libraryTarget, setLibraryTarget] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const contentRef = useRef(content);
  contentRef.current = content;

  const openPost = useMemo(
    () => content.posts.find((p) => p.id === openId) || null,
    [content.posts, openId],
  );

  const updatePage = <K extends keyof BlogPageContent>(key: K, value: BlogPageContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const updatePost = (id: string, patch: Partial<BlogPost>) => {
    setContent((prev) => ({
      ...prev,
      posts: prev.posts.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  const save = async (next?: BlogPageContent) => {
    const payload = next || contentRef.current;
    setSaving(true);
    setError("");
    setToast("");
    try {
      const res = await fetch("/api/orbit/blog", {
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
      setToast("Blog saved. Live site updated.");
      setSaving(false);
      router.refresh();
      return true;
    } catch {
      setError("Network error while saving.");
      setSaving(false);
      return false;
    }
  };

  const uploadCover = async (post: BlogPost, file: File) => {
    setUploadingId(post.id);
    setError("");
    try {
      const current = contentRef.current.posts.find((p) => p.id === post.id) || post;
      const item = await orbitUploadFile({ file });
      const coverImageUrl = withCacheBust(item.url);
      const next: BlogPageContent = {
        ...contentRef.current,
        posts: contentRef.current.posts.map((p) =>
          p.id === post.id ? { ...p, coverImageUrl } : p,
        ),
      };
      setContent(next);
      contentRef.current = next;
      await save(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingId(null);
    }
  };

  const uploadPageCover = async (file: File) => {
    setUploadingId("page-cover");
    setError("");
    try {
      const item = await orbitUploadFile({ file });
      const next = { ...contentRef.current, coverImageUrl: withCacheBust(item.url) };
      setContent(next);
      contentRef.current = next;
      await save(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">Website</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Blog</h1>
          <p className="mt-1.5 max-w-xl text-[14px] text-white/55">
            Full WordPress-style control: page cover, categories, SEO, and every post’s title,
            slug, tags, keywords, meta, and article body.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const p = newPost();
              setContent((prev) => ({ ...prev, posts: [p, ...prev.posts] }));
              setOpenId(p.id);
            }}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-[13px] font-semibold"
          >
            <Plus className="size-4" /> New post
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
        <h2 className="text-[14px] font-bold text-white">Blog page settings</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <div className="relative mb-3 aspect-[21/7] overflow-hidden rounded-xl border border-white/10">
              <OrbitMediaPreview
                src={content.coverImageUrl}
                alt="Blog cover"
                className="h-full w-full object-cover"
              />
            </div>
            <input
              ref={(el) => {
                fileRefs.current["page-cover"] = el;
              }}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void uploadPageCover(f);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              disabled={uploadingId === "page-cover"}
              onClick={() => fileRefs.current["page-cover"]?.click()}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
            >
              {uploadingId === "page-cover" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              Upload page cover
            </button>
            <button
              type="button"
              onClick={() => setLibraryTarget("page-cover")}
              className="ml-2 inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
            >
              <FolderOpen className="size-4" /> Media library
            </button>
          </div>
          <label>
            <span className={label}>Cover title</span>
            <input className={field} value={content.coverTitle} onChange={(e) => updatePage("coverTitle", e.target.value)} />
          </label>
          <label>
            <span className={label}>Cover subtitle</span>
            <input className={field} value={content.coverSubtitle} onChange={(e) => updatePage("coverSubtitle", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={label}>Intro text</span>
            <textarea rows={3} className={field} value={content.intro} onChange={(e) => updatePage("intro", e.target.value)} />
          </label>
          <label>
            <span className={label}>Latest heading</span>
            <input className={field} value={content.latestHeading} onChange={(e) => updatePage("latestHeading", e.target.value)} />
          </label>
          <label>
            <span className={label}>Categories (comma separated)</span>
            <input
              className={field}
              value={content.categories.join(", ")}
              onChange={(e) =>
                updatePage(
                  "categories",
                  e.target.value.split(",").map((c) => c.trim()).filter(Boolean),
                )
              }
            />
          </label>
          <label>
            <span className={label}>Meta title</span>
            <input className={field} value={content.metaTitle} onChange={(e) => updatePage("metaTitle", e.target.value)} />
          </label>
          <label>
            <span className={label}>Meta description</span>
            <input className={field} value={content.metaDescription} onChange={(e) => updatePage("metaDescription", e.target.value)} />
          </label>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[14px] font-bold text-white">
          Posts ({content.posts.length})
        </h2>
        {content.posts.map((post) => {
          const open = openId === post.id;
          return (
            <div key={post.id} className="rounded-2xl border border-white/10 bg-white/[0.04]">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                onClick={() => setOpenId(open ? null : post.id)}
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-white">{post.title}</p>
                  <p className="truncate text-[12px] text-white/45">
                    /blog/{post.slug} · {post.category} · {post.visible ? "Published" : "Hidden"}
                  </p>
                </div>
                <ChevronDown className={`size-4 shrink-0 text-white/50 transition ${open ? "rotate-180" : ""}`} />
              </button>

              {open && openPost?.id === post.id ? (
                <div className="space-y-3 border-t border-white/10 px-4 py-4">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
                    <OrbitMediaPreview
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <input
                    ref={(el) => {
                      fileRefs.current[post.id] = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) void uploadCover(post, f);
                      e.target.value = "";
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={uploadingId === post.id}
                      onClick={() => fileRefs.current[post.id]?.click()}
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
                    >
                      {uploadingId === post.id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Upload className="size-3.5" />
                      )}
                      Upload image
                    </button>
                    <button
                      type="button"
                      onClick={() => setLibraryTarget(post.id)}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-[12px] font-semibold"
                    >
                      <FolderOpen className="size-3.5" /> Library
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setContent((prev) => ({
                          ...prev,
                          posts: prev.posts.filter((p) => p.id !== post.id),
                        }));
                        setOpenId(null);
                      }}
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 text-[12px] font-semibold text-red-200"
                    >
                      <Trash2 className="size-3.5" /> Delete
                    </button>
                    <label className="inline-flex h-9 items-center gap-2 px-2 text-[12px] text-white/60">
                      <input
                        type="checkbox"
                        checked={post.visible !== false}
                        onChange={(e) => updatePost(post.id, { visible: e.target.checked })}
                      />
                      Published
                    </label>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="sm:col-span-2">
                      <span className={label}>Post title</span>
                      <input
                        className={field}
                        value={post.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          updatePost(post.id, {
                            title,
                            metaTitle: post.metaTitle === post.title ? title : post.metaTitle,
                          });
                        }}
                      />
                    </label>
                    <label>
                      <span className={label}>Slug (URL)</span>
                      <input
                        className={field}
                        value={post.slug}
                        onChange={(e) => updatePost(post.id, { slug: slugify(e.target.value) || post.slug })}
                      />
                    </label>
                    <label>
                      <span className={label}>Auto-slug from title</span>
                      <button
                        type="button"
                        className="inline-flex h-[42px] w-full items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[12px] font-semibold"
                        onClick={() => updatePost(post.id, { slug: slugify(post.title) || post.slug })}
                      >
                        Generate slug
                      </button>
                    </label>
                    <label>
                      <span className={label}>Author</span>
                      <input className={field} value={post.author} onChange={(e) => updatePost(post.id, { author: e.target.value })} />
                    </label>
                    <label>
                      <span className={label}>Category</span>
                      <input className={field} value={post.category} onChange={(e) => updatePost(post.id, { category: e.target.value })} />
                    </label>
                    <label>
                      <span className={label}>Date label</span>
                      <input className={field} value={post.dateLabel} onChange={(e) => updatePost(post.id, { dateLabel: e.target.value })} />
                    </label>
                    <label>
                      <span className={label}>Published date (YYYY-MM-DD)</span>
                      <input className={field} value={post.publishedAt} onChange={(e) => updatePost(post.id, { publishedAt: e.target.value })} />
                    </label>
                    <label className="sm:col-span-2">
                      <span className={label}>Tags (comma separated)</span>
                      <input
                        className={field}
                        value={post.tags.join(", ")}
                        onChange={(e) =>
                          updatePost(post.id, {
                            tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                          })
                        }
                      />
                    </label>
                    <label className="sm:col-span-2">
                      <span className={label}>Keywords</span>
                      <input className={field} value={post.keywords} onChange={(e) => updatePost(post.id, { keywords: e.target.value })} />
                    </label>
                    <label>
                      <span className={label}>Meta title</span>
                      <input className={field} value={post.metaTitle} onChange={(e) => updatePost(post.id, { metaTitle: e.target.value })} />
                    </label>
                    <label>
                      <span className={label}>Meta description</span>
                      <input className={field} value={post.metaDescription} onChange={(e) => updatePost(post.id, { metaDescription: e.target.value })} />
                    </label>
                    <label className="sm:col-span-2">
                      <span className={label}>Excerpt</span>
                      <textarea rows={2} className={field} value={post.excerpt} onChange={(e) => updatePost(post.id, { excerpt: e.target.value })} />
                    </label>
                    <label className="sm:col-span-2">
                      <span className={label}>Cover image URL</span>
                      <input className={field} value={post.coverImageUrl} onChange={(e) => updatePost(post.id, { coverImageUrl: e.target.value })} />
                    </label>
                    <label className="sm:col-span-2">
                      <span className={label}>Article body (blank line = new paragraph)</span>
                      <textarea
                        rows={12}
                        className={`${field} font-mono text-[12.5px] leading-relaxed`}
                        value={post.content}
                        onChange={(e) => updatePost(post.id, { content: e.target.value })}
                      />
                    </label>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </section>

      <OrbitMediaLibraryModal
        open={!!libraryTarget}
        onClose={() => setLibraryTarget(null)}
        onSelect={async (url) => {
          if (libraryTarget === "page-cover") {
            const next = { ...contentRef.current, coverImageUrl: url };
            setContent(next);
            contentRef.current = next;
            await save(next);
            return;
          }
          const next = {
            ...contentRef.current,
            posts: contentRef.current.posts.map((p) =>
              p.id === libraryTarget ? { ...p, coverImageUrl: url } : p,
            ),
          };
          setContent(next);
          contentRef.current = next;
          await save(next);
        }}
      />
    </div>
  );
}
