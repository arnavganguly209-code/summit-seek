import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { AboutTeamView } from "@/components/about/AboutTeamView";
import { getAboutPageContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPageContent();
  const title = content.teamMetaTitle || "Our Team";
  const description = content.teamMetaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/about/team` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/about/team`,
    },
  };
}

export default async function AboutTeamPage() {
  const content = await getAboutPageContent();
  return (
    <>
      <PageCover
        imageUrl={content.teamCoverImageUrl || content.coverImageUrl}
        title={content.teamCoverTitle}
        subtitle={content.teamCoverSubtitle}
      />
      <AboutTeamView content={content} />
    </>
  );
}
