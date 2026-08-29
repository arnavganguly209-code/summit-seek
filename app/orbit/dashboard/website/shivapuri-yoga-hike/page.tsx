import { ShivapuriYogaHikeEditor } from "@/components/orbit/ShivapuriYogaHikeEditor";
import { getShivapuriYogaHikeContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitShivapuriYogaHikePage() {
  const content = await getShivapuriYogaHikeContent();
  return <ShivapuriYogaHikeEditor initial={content} />;
}
