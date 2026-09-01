import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getBardiyaJungleSafariContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBardiyaJungleSafariContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/tours/bardiya-jungle-safari` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/tours/bardiya-jungle-safari`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function BardiyaJungleSafariPage() {
  const content = await getBardiyaJungleSafariContent();
  return <TrekPageView content={content} />;
}
