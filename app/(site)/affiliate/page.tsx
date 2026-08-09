import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { AffiliateView } from "@/components/affiliate/AffiliateView";
import { getAffiliateContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAffiliateContent();
  const title = content.metaTitle || "Affiliate Program";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/affiliate` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/affiliate`,
    },
  };
}

export default async function AffiliatePage() {
  const content = await getAffiliateContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <AffiliateView content={content} />
    </>
  );
}
