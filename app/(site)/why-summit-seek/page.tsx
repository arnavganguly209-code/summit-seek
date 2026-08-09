import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { WhySummitSeekView } from "@/components/why/WhySummitSeekView";
import { getWhySummitSeekContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWhySummitSeekContent();
  const title = content.metaTitle || "Why Summit Seek";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/why-summit-seek` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/why-summit-seek`,
    },
  };
}

export default async function WhySummitSeekPage() {
  const content = await getWhySummitSeekContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <WhySummitSeekView content={content} />
    </>
  );
}
