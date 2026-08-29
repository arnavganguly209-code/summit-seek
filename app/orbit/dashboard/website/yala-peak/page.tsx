import { YalaPeakEditor } from "@/components/orbit/YalaPeakEditor";
import { getYalaPeakContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitYalaPeakPage() {
  const content = await getYalaPeakContent();
  return <YalaPeakEditor initial={content} />;
}
