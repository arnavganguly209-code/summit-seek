import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { NepalVisaView } from "@/components/travel-guide/NepalVisaView";
import { getNepalVisaContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getNepalVisaContent();
  const title = content.metaTitle || "Nepal Visa Guide";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/travel-guide/nepal-visa` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/travel-guide/nepal-visa`,
    },
  };
}

export default async function NepalVisaPage() {
  const content = await getNepalVisaContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <NepalVisaView content={content} />
    </>
  );
}
