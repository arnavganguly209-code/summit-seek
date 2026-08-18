import { MustangRegionEditor } from "@/components/orbit/MustangRegionEditor";
import { getMustangRegionContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitMustangRegionPage() {
  const content = await getMustangRegionContent();
  return <MustangRegionEditor initial={content} />;
}
