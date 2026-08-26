import { UpperMustangEditor } from "@/components/orbit/UpperMustangEditor";
import { getUpperMustangContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitUpperMustangPage() {
  const content = await getUpperMustangContent();
  return <UpperMustangEditor initial={content} />;
}
