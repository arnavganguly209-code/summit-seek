import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { getBlogPostBySlug } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Blog Post" };
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  return {
    title,
    description,
    keywords: post.keywords || undefined,
    alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/blog/${post.slug}`,
      images: [{ url: post.coverImageUrl }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();
  return <BlogArticle post={post} />;
}
