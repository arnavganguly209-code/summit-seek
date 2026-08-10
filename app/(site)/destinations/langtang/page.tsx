import type { Metadata } from "next";
import { DestinationRegionView } from "@/components/destinations/DestinationRegionView";
import { getLangtangRegionContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLangtangRegionContent();
  const title = content.metaTitle || content.heading;
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/destinations/langtang` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/destinations/langtang`,
      ...(content.coverImageUrl ? { images: [{ url: content.coverImageUrl }] } : {}),
    },
  };
}

export default async function LangtangRegionPage() {
  const content = await getLangtangRegionContent();
  return <DestinationRegionView content={content} />;
}
