import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getShivapuriYogaHikeContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getShivapuriYogaHikeContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/tours/shivapuri-yoga-hike` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/tours/shivapuri-yoga-hike`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function ShivapuriYogaHikePage() {
  const content = await getShivapuriYogaHikeContent();
  return <TrekPageView content={content} />;
}
