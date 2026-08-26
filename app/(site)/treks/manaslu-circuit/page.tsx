import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getManasluCircuitContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getManasluCircuitContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/manaslu-circuit` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/manaslu-circuit`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function ManasluCircuitTrekPage() {
  const content = await getManasluCircuitContent();
  return <TrekPageView content={content} />;
}
