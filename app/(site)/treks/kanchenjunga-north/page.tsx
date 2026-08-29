import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getKanchenjungaNorthContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getKanchenjungaNorthContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/kanchenjunga-north` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/kanchenjunga-north`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function KanchenjungaNorthTrekPage() {
  const content = await getKanchenjungaNorthContent();
  return <TrekPageView content={content} />;
}
