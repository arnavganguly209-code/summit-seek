import { MeraPeakEditor } from "@/components/orbit/MeraPeakEditor";
import { getMeraPeakContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitMeraPeakPage() {
  const content = await getMeraPeakContent();
  return <MeraPeakEditor initial={content} />;
}
