import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getUpperDolpoContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getUpperDolpoContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/treks/upper-dolpo` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/treks/upper-dolpo`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function UpperDolpoTrekPage() {
  const content = await getUpperDolpoContent();
  return <TrekPageView content={content} />;
}
