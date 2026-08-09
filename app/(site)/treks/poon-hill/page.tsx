import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getPoonHillContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPoonHillContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/poon-hill` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/poon-hill`,
    },
  };
}

export default async function PoonHillTrekPage() {
  const content = await getPoonHillContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <TrekPageView content={content} />
    </>
  );
}
