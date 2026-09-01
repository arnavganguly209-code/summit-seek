import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getChitwanJungleSafariContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getChitwanJungleSafariContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/tours/chitwan-jungle-safari` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/tours/chitwan-jungle-safari`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function ChitwanJungleSafariPage() {
  const content = await getChitwanJungleSafariContent();
  return <TrekPageView content={content} />;
}
