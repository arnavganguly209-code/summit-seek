import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getEverestBaseCampContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getEverestBaseCampContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/everest-base-camp` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/everest-base-camp`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function EverestBaseCampTrekPage() {
  const content = await getEverestBaseCampContent();
  return <TrekPageView content={content} />;
}
