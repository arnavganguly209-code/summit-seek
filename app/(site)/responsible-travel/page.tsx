import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { ResponsibleTravelView } from "@/components/responsible/ResponsibleTravelView";
import { getResponsibleTravelContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getResponsibleTravelContent();
  const title = content.metaTitle || "Responsible Travel";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/responsible-travel` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/responsible-travel`,
    },
  };
}

export default async function ResponsibleTravelPage() {
  const content = await getResponsibleTravelContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <ResponsibleTravelView content={content} />
    </>
  );
}
