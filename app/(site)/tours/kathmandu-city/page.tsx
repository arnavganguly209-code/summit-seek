import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getKathmanduCityContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getKathmanduCityContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/tours/kathmandu-city` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/tours/kathmandu-city`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function KathmanduCityTourPage() {
  const content = await getKathmanduCityContent();
  return <TrekPageView content={content} />;
}
