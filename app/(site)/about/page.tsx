import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { AboutPageView } from "@/components/about/AboutPageView";
import { getAboutPageContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPageContent();
  const title = content.metaTitle || "About Us";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/about` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/about`,
    },
  };
}

export default async function AboutPage() {
  const content = await getAboutPageContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <AboutPageView content={content} />
    </>
  );
}
