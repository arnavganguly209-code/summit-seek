import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getTamangHeritageContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTamangHeritageContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/tamang-heritage` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/tamang-heritage`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function TamangHeritageTrekPage() {
  const content = await getTamangHeritageContent();
  return <TrekPageView content={content} />;
}
