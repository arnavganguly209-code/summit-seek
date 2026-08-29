import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getKanchenjungaCircuitContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getKanchenjungaCircuitContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/kanchenjunga-circuit` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/kanchenjunga-circuit`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function KanchenjungaCircuitTrekPage() {
  const content = await getKanchenjungaCircuitContent();
  return <TrekPageView content={content} />;
}
