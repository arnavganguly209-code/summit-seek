import { PrivacyEditor } from "@/components/orbit/PrivacyEditor";
import { getPrivacyContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitPrivacyPage() {
  const content = await getPrivacyContent();
  return <PrivacyEditor initial={content} />;
}
