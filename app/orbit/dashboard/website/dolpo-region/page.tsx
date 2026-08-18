import { DolpoRegionEditor } from "@/components/orbit/DolpoRegionEditor";
import { getDolpoRegionContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitDolpoRegionPage() {
  const content = await getDolpoRegionContent();
  return <DolpoRegionEditor initial={content} />;
}
