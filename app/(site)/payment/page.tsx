import type { Metadata } from "next";
import { PageCover } from "@/components/site/PageCover";
import { PaymentView } from "@/components/payment/PaymentView";
import { getPaymentContent } from "@/lib/orbit/store";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPaymentContent();
  const title = content.metaTitle || "Payment Procedure & Details";
  const description = content.metaDescription || SITE.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/payment` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/payment`,
    },
  };
}

export default async function PaymentPage() {
  const content = await getPaymentContent();
  return (
    <>
      <PageCover
        imageUrl={content.coverImageUrl}
        title={content.coverTitle}
        subtitle={content.coverSubtitle}
      />
      <PaymentView content={content} />
    </>
  );
}
