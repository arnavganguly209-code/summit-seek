import { KanchenjungaRegionEditor } from "@/components/orbit/KanchenjungaRegionEditor";
import { getKanchenjungaRegionContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitKanchenjungaRegionPage() {
  const content = await getKanchenjungaRegionContent();
  return <KanchenjungaRegionEditor initial={content} />;
}
