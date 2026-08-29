import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getJanakpurCityContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getJanakpurCityContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/tours/janakpur-city` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/tours/janakpur-city`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function JanakpurCityTourPage() {
  const content = await getJanakpurCityContent();
  return <TrekPageView content={content} />;
}
