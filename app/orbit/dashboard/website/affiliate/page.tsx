import { AffiliateEditor } from "@/components/orbit/AffiliateEditor";
import { getAffiliateContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitAffiliatePage() {
  const content = await getAffiliateContent();
  return <AffiliateEditor initial={content} />;
}
