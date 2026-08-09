import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { BestTimeView } from "@/components/travel-guide/BestTimeView";
import { getBestTimeContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBestTimeContent();
  const title = content.metaTitle || "Best Time to Visit Nepal";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/travel-guide/best-time-to-visit` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/travel-guide/best-time-to-visit`,
    },
  };
}

export default async function BestTimeToVisitPage() {
  const content = await getBestTimeContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <BestTimeView content={content} />
    </>
  );
}
