import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getKanchenjungaSouthContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getKanchenjungaSouthContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/kanchenjunga-south` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/kanchenjunga-south`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function KanchenjungaSouthTrekPage() {
  const content = await getKanchenjungaSouthContent();
  return <TrekPageView content={content} />;
}
