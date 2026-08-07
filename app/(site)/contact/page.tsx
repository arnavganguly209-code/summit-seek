import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { getContactContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactContent();
  const title = content.metaTitle || "Contact Us";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/contact` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/contact`,
    },
  };
}

export default async function ContactPage() {
  const content = await getContactContent();

  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <ContactPageClient content={content} />
    </>
  );
}
