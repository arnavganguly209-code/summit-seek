import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { BlogListingClient } from "@/components/blog/BlogListingClient";
import { getBlogContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBlogContent();
  const title = content.metaTitle || "Travel Blogs";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/blog` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/blog`,
    },
  };
}

export default async function BlogPage() {
  const content = await getBlogContent();

  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <BlogListingClient content={content} />
    </>
  );
}
