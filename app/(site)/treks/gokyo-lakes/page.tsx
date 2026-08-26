import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getGokyoLakesContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getGokyoLakesContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/gokyo-lakes` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/gokyo-lakes`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function GokyoLakesTrekPage() {
  const content = await getGokyoLakesContent();
  return <TrekPageView content={content} />;
}
