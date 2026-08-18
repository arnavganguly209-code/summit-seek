import type { Metadata } from "next";
import { DestinationRegionView } from "@/components/destinations/DestinationRegionView";
import { getMustangRegionContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMustangRegionContent();
  const title = content.metaTitle || content.heading;
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/destinations/mustang-region` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/destinations/mustang-region`,
      ...(content.coverImageUrl ? { images: [{ url: content.coverImageUrl }] } : {}),
    },
  };
}

export default async function MustangRegionPage() {
  const content = await getMustangRegionContent();
  return <DestinationRegionView content={content} />;
}
