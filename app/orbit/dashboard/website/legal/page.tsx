import { LegalEditor } from "@/components/orbit/LegalEditor";
import { getLegalContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitLegalPage() {
  const content = await getLegalContent();
  return <LegalEditor initial={content} />;
}
