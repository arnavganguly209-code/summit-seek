import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { MoneyCurrencyView } from "@/components/travel-guide/MoneyCurrencyView";
import { getMoneyCurrencyContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMoneyCurrencyContent();
  const title = content.metaTitle || "Money & Currency";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/travel-guide/money-currency` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/travel-guide/money-currency`,
    },
  };
}

export default async function MoneyCurrencyPage() {
  const content = await getMoneyCurrencyContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <MoneyCurrencyView content={content} />
    </>
  );
}
