import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getLobuchePeakContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLobuchePeakContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/lobuche-peak` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/lobuche-peak`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function LobuchePeakClimbingPage() {
  const content = await getLobuchePeakContent();
  return <TrekPageView content={content} />;
}
