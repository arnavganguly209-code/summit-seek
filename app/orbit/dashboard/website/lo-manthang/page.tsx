import { LoManthangEditor } from "@/components/orbit/LoManthangEditor";
import { getLoManthangContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitLoManthangPage() {
  const content = await getLoManthangContent();
  return <LoManthangEditor initial={content} />;
}
