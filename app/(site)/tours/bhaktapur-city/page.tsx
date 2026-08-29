import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getBhaktapurCityContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBhaktapurCityContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/tours/bhaktapur-city` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/tours/bhaktapur-city`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function BhaktapurCityTourPage() {
  const content = await getBhaktapurCityContent();
  return <TrekPageView content={content} />;
}
