import { TermsEditor } from "@/components/orbit/TermsEditor";
import { getTermsContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitTermsPage() {
  const content = await getTermsContent();
  return <TermsEditor initial={content} />;
}
