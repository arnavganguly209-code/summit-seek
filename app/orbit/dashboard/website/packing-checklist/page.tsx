import { PackingChecklistEditor } from "@/components/orbit/PackingChecklistEditor";
import { getPackingChecklistContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitPackingChecklistPage() {
  const content = await getPackingChecklistContent();
  return <PackingChecklistEditor initial={content} />;
}
