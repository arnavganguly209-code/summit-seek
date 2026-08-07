import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { AboutVisionView } from "@/components/about/AboutVisionView";
import { getAboutPageContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPageContent();
  const title = content.visionMetaTitle || "Our Vision";
  const description = content.visionMetaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/about/vision` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/about/vision`,
    },
  };
}

export default async function AboutVisionPage() {
  const content = await getAboutPageContent();
  return (
    <>
      <PageCover
        imageUrl={content.visionCoverImageUrl || content.coverImageUrl}
        title={content.visionPageCoverTitle}
        subtitle={content.visionPageCoverSubtitle}
      />
      <AboutVisionView content={content} />
    </>
  );
}
