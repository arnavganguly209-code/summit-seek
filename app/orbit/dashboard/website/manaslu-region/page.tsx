import { ManasluRegionEditor } from "@/components/orbit/ManasluRegionEditor";
import { getManasluRegionContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitManasluRegionPage() {
  const content = await getManasluRegionContent();
  return <ManasluRegionEditor initial={content} />;
}
