import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getEverestHeliViewContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getEverestHeliViewContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/everest-heli-view` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/everest-heli-view`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function EverestHeliViewTrekPage() {
  const content = await getEverestHeliViewContent();
  return <TrekPageView content={content} />;
}
