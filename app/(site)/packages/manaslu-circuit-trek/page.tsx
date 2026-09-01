import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getManasluCircuitTrekContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getManasluCircuitTrekContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/packages/manaslu-circuit-trek` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/packages/manaslu-circuit-trek`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function PackagesManasluCircuitTrekPage() {
  const content = await getManasluCircuitTrekContent();
  return <TrekPageView content={content} />;
}
