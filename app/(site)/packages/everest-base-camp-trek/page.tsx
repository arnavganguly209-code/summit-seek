import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getEverestBaseCampTrekContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getEverestBaseCampTrekContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/packages/everest-base-camp-trek` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/packages/everest-base-camp-trek`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function PackagesEverestBaseCampTrekPage() {
  const content = await getEverestBaseCampTrekContent();
  return <TrekPageView content={content} />;
}
