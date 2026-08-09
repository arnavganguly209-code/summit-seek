import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { TravelInsuranceView } from "@/components/travel-guide/TravelInsuranceView";
import { getTravelInsuranceContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTravelInsuranceContent();
  const title = content.metaTitle || "Travel Insurance for Nepal Treks";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/travel-guide/travel-insurance` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/travel-guide/travel-insurance`,
    },
  };
}

export default async function TravelInsurancePage() {
  const content = await getTravelInsuranceContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <TravelInsuranceView content={content} />
    </>
  );
}
