import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { PermitsTimsView } from "@/components/travel-guide/PermitsTimsView";
import { getPermitsTimsContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPermitsTimsContent();
  const title = content.metaTitle || "Trekking Permits & Entry Fees";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/travel-guide/permits-tims` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/travel-guide/permits-tims`,
    },
  };
}

export default async function PermitsTimsPage() {
  const content = await getPermitsTimsContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <PermitsTimsView content={content} />
    </>
  );
}
