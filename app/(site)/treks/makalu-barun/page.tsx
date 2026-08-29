import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getMakaluBarunContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMakaluBarunContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/makalu-barun` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/makalu-barun`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function MakaluBarunTrekPage() {
  const content = await getMakaluBarunContent();
  return <TrekPageView content={content} />;
}
