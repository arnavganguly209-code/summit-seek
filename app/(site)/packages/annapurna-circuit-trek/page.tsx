import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getAnnapurnaCircuitTrekContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAnnapurnaCircuitTrekContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE.url}/packages/annapurna-circuit-trek`,
    },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/packages/annapurna-circuit-trek`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function PackagesAnnapurnaCircuitTrekPage() {
  const content = await getAnnapurnaCircuitTrekContent();
  return <TrekPageView content={content} />;
}
