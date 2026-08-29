import { BhaktapurCityEditor } from "@/components/orbit/BhaktapurCityEditor";
import { getBhaktapurCityContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitBhaktapurCityPage() {
  const content = await getBhaktapurCityContent();
  return <BhaktapurCityEditor initial={content} />;
}
