import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getLangtangValleyContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLangtangValleyContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/langtang-valley` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/langtang-valley`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function LangtangValleyTrekPage() {
  const content = await getLangtangValleyContent();
  return <TrekPageView content={content} />;
}
