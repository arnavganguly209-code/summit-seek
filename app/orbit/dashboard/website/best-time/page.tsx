import { BestTimeEditor } from "@/components/orbit/BestTimeEditor";
import { getBestTimeContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitBestTimePage() {
  const content = await getBestTimeContent();
  return <BestTimeEditor initial={content} />;
}
