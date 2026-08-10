import { AnnapurnaRegionEditor } from "@/components/orbit/AnnapurnaRegionEditor";
import { getAnnapurnaRegionContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitAnnapurnaRegionPage() {
  const content = await getAnnapurnaRegionContent();
  return <AnnapurnaRegionEditor initial={content} />;
}
