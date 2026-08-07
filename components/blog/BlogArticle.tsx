import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog-cms";
import { PageCover } from "@/components/site/PageCover";

export function BlogArticle({ post }: { post: BlogPost }) {
  const paragraphs = post.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="bg-[#f7f8fb]">
      <PageCover
        imageUrl={post.coverImageUrl}
        title={post.title}
        subtitle={`${post.category} · By ${post.author} · ${post.dateLabel}`}
      />

      <div className="mx-auto w-full max-w-[820px] px-5 py-10 sm:px-8 lg:py-12">
        <div className="overflow-hidden rounded-2xl border border-[#e6ebf2] bg-white p-6 shadow-[0_10px_40px_rgba(8,18,30,0.06)] sm:p-9">
          <div className="relative mb-7 aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              unoptimized
              className="object-cover"
              sizes="820px"
            />
          </div>

          {post.tags.length > 0 ? (
            <div className="mb-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#0b1524]/06 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0b1524]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="space-y-4 font-[family-name:var(--font-ui)] text-[15.5px] leading-[1.8] text-[#2f3848]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-[#eef1f6] pt-6">
            <Link
              href="/blog"
              className="inline-flex text-[14px] font-semibold text-[#1d4ed8] hover:underline"
            >
              ← Back to all blogs
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
