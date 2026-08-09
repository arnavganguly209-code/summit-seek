import { NepalVisaEditor } from "@/components/orbit/NepalVisaEditor";
import { getNepalVisaContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitNepalVisaPage() {
  const content = await getNepalVisaContent();
  return <NepalVisaEditor initial={content} />;
}
