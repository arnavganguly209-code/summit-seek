import type { Metadata } from "next";
import { DestinationRegionView } from "@/components/destinations/DestinationRegionView";
import { getAnnapurnaRegionContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAnnapurnaRegionContent();
  const title = content.metaTitle || content.heading;
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/destinations/annapurna-region` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/destinations/annapurna-region`,
      ...(content.coverImageUrl ? { images: [{ url: content.coverImageUrl }] } : {}),
    },
  };
}

export default async function AnnapurnaRegionPage() {
  const content = await getAnnapurnaRegionContent();
  return <DestinationRegionView content={content} />;
}
