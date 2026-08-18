import type { Metadata } from "next";
import { DestinationRegionView } from "@/components/destinations/DestinationRegionView";
import { getKanchenjungaRegionContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getKanchenjungaRegionContent();
  const title = content.metaTitle || content.heading;
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/destinations/kanchenjunga-region` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/destinations/kanchenjunga-region`,
      ...(content.coverImageUrl ? { images: [{ url: content.coverImageUrl }] } : {}),
    },
  };
}

export default async function KanchenjungaRegionPage() {
  const content = await getKanchenjungaRegionContent();
  return <DestinationRegionView content={content} />;
}
