import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { PackingChecklistView } from "@/components/travel-guide/PackingChecklistView";
import { getPackingChecklistContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPackingChecklistContent();
  const title = content.metaTitle || "Packing Checklist";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/travel-guide/packing-checklist` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/travel-guide/packing-checklist`,
    },
  };
}

export default async function PackingChecklistPage() {
  const content = await getPackingChecklistContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <PackingChecklistView content={content} />
    </>
  );
}
