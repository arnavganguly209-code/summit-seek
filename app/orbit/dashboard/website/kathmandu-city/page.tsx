import { KathmanduCityEditor } from "@/components/orbit/KathmanduCityEditor";
import { getKathmanduCityContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitKathmanduCityPage() {
  const content = await getKathmanduCityContent();
  return <KathmanduCityEditor initial={content} />;
}
