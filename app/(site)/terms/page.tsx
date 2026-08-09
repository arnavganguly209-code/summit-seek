import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { TermsView } from "@/components/terms/TermsView";
import { getTermsContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTermsContent();
  const title = content.metaTitle || "Terms & Conditions";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/terms` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/terms`,
    },
  };
}

export default async function TermsPage() {
  const content = await getTermsContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <TermsView content={content} />
    </>
  );
}
