"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPageContent } from "@/types/blog-cms";

export function BlogListingClient({ content }: { content: BlogPageContent }) {
  const [category, setCategory] = useState("All");
  const posts = useMemo(() => {
    const visible = content.posts.filter((p) => p.visible !== false);
    if (category === "All") return visible;
    return visible.filter((p) => p.category === category);
  }, [content.posts, category]);

  const cats = ["All", ...content.categories];

  return (
    <div className="bg-[#f7f8fb]">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
        <p className="max-w-3xl font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
          {content.intro}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={
                  active
                    ? "rounded-full bg-[#0b1524] px-3.5 py-1.5 text-[12px] font-semibold text-white"
                    : "rounded-full border border-[#d8dee8] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#3d4656] hover:border-[#0b1524]/30"
                }
              >
                {c}
              </button>
            );
          })}
        </div>

        <h2 className="mt-10 font-[family-name:var(--font-display)] text-[1.55rem] font-bold text-[#0b1524] sm:text-[1.75rem]">
          {content.latestHeading}
        </h2>
        <div className="mt-2 h-[2px] w-10 rounded-full bg-[#F58220]" />

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-[#e6ebf2] bg-white shadow-[0_8px_28px_rgba(8,18,30,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(8,18,30,0.1)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[family-name:var(--font-ui)] text-[12px] text-[#7a8496]">
                  <span className="font-semibold text-[#F58220]">{post.category}</span>
                  <span aria-hidden>·</span>
                  <span>By {post.author}</span>
                  <span aria-hidden>·</span>
                  <span>{post.dateLabel}</span>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.15rem] font-bold leading-snug text-[#0b1524] transition group-hover:text-[#1d4ed8] sm:text-[1.25rem]">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 font-[family-name:var(--font-ui)] text-[13.5px] leading-relaxed text-[#5a6577]">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="mt-8 text-center text-[14px] text-[#5a6577]">No posts in this category yet.</p>
        ) : null}
      </div>
    </div>
  );
}
