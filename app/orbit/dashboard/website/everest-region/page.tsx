import { EverestRegionEditor } from "@/components/orbit/EverestRegionEditor";
import { getEverestRegionContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitEverestRegionPage() {
  const content = await getEverestRegionContent();
  return <EverestRegionEditor initial={content} />;
}
