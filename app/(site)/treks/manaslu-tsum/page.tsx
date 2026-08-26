import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getManasluTsumContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getManasluTsumContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/manaslu-tsum` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/manaslu-tsum`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function ManasluTsumTrekPage() {
  const content = await getManasluTsumContent();
  return <TrekPageView content={content} />;
}
