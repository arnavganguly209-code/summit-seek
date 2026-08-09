import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { HealthSafetyView } from "@/components/travel-guide/HealthSafetyView";
import { getHealthSafetyContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHealthSafetyContent();
  const title = content.metaTitle || "Health & Safety";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/travel-guide/health-safety` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/travel-guide/health-safety`,
    },
  };
}

export default async function HealthSafetyPage() {
  const content = await getHealthSafetyContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <HealthSafetyView content={content} />
    </>
  );
}
