import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { LegalPageView } from "@/components/legal/LegalPageView";
import { getLegalContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalContent();
  const title = content.metaTitle || "Legal Documents";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/legal` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/legal`,
    },
  };
}

export default async function LegalPage() {
  const content = await getLegalContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <LegalPageView content={content} />
    </>
  );
}
