import { JanakpurCityEditor } from "@/components/orbit/JanakpurCityEditor";
import { getJanakpurCityContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitJanakpurCityPage() {
  const content = await getJanakpurCityContent();
  return <JanakpurCityEditor initial={content} />;
}
