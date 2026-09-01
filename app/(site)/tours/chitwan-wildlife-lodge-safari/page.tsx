import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getChitwanWildlifeLodgeSafariContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getChitwanWildlifeLodgeSafariContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/tours/chitwan-wildlife-lodge-safari` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/tours/chitwan-wildlife-lodge-safari`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function ChitwanWildlifeLodgeSafariPage() {
  const content = await getChitwanWildlifeLodgeSafariContent();
  return <TrekPageView content={content} />;
}
