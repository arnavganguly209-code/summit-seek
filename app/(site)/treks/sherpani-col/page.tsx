import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getSherpaniColContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSherpaniColContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/sherpani-col` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/sherpani-col`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function SherpaniColTrekPage() {
  const content = await getSherpaniColContent();
  return <TrekPageView content={content} />;
}
