import type { Metadata } from "next";
import { EverestRegionView } from "@/components/destinations/EverestRegionView";
import { getEverestRegionContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getEverestRegionContent();
  const title = content.metaTitle || content.heading;
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/destinations/everest-region` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/destinations/everest-region`,
      ...(content.coverImageUrl ? { images: [{ url: content.coverImageUrl }] } : {}),
    },
  };
}

export default async function EverestRegionPage() {
  const content = await getEverestRegionContent();
  return <EverestRegionView content={content} />;
}
