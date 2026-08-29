import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getKanchenjungaBcContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getKanchenjungaBcContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/kanchenjunga-bc` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/kanchenjunga-bc`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function KanchenjungaBcTrekPage() {
  const content = await getKanchenjungaBcContent();
  return <TrekPageView content={content} />;
}
