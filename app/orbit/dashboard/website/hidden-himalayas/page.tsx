import { HiddenHimalayasRegionEditor } from "@/components/orbit/HiddenHimalayasRegionEditor";
import { getHiddenHimalayasRegionContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitHiddenHimalayasRegionPage() {
  const content = await getHiddenHimalayasRegionContent();
  return <HiddenHimalayasRegionEditor initial={content} />;
}
