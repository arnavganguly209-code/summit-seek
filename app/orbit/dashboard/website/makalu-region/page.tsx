import { MakaluRegionEditor } from "@/components/orbit/MakaluRegionEditor";
import { getMakaluRegionContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitMakaluRegionPage() {
  const content = await getMakaluRegionContent();
  return <MakaluRegionEditor initial={content} />;
}
