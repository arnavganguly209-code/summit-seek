import type { Metadata } from "next";
import { TrekPageView } from "@/components/treks/TrekPageView";
import { getMustangHeliVipContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMustangHeliVipContent();
  const title = content.metaTitle || content.title;
  const description = content.metaDescription || SITE.description;
  const ogImage = content.heroMainImageUrl || content.coverImageUrl;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/tours/mustang-heli-vip` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/tours/mustang-heli-vip`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function MustangHeliVipTourPage() {
  const content = await getMustangHeliVipContent();
  return <TrekPageView content={content} />;
}
