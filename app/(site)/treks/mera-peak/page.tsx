import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getMeraPeakContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMeraPeakContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/mera-peak` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/mera-peak`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function MeraPeakClimbingPage() {
  const content = await getMeraPeakContent();
  return <TrekPageView content={content} />;
}
