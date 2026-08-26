import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getAnnapurnaBaseCampContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAnnapurnaBaseCampContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/annapurna-base-camp` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/annapurna-base-camp`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function AnnapurnaBaseCampTrekPage() {
  const content = await getAnnapurnaBaseCampContent();
  return <TrekPageView content={content} />;
}
