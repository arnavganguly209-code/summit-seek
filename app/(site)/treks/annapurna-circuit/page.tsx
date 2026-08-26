import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getAnnapurnaCircuitContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAnnapurnaCircuitContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/annapurna-circuit` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/annapurna-circuit`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function AnnapurnaCircuitTrekPage() {
  const content = await getAnnapurnaCircuitContent();
  return <TrekPageView content={content} />;
}
