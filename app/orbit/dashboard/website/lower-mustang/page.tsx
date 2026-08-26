import { LowerMustangEditor } from "@/components/orbit/LowerMustangEditor";
import { getLowerMustangContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitLowerMustangPage() {
  const content = await getLowerMustangContent();
  return <LowerMustangEditor initial={content} />;
}
