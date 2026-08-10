import { LangtangRegionEditor } from "@/components/orbit/LangtangRegionEditor";
import { getLangtangRegionContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitLangtangRegionPage() {
  const content = await getLangtangRegionContent();
  return <LangtangRegionEditor initial={content} />;
}
