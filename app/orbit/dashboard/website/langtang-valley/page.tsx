import { LangtangValleyEditor } from "@/components/orbit/LangtangValleyEditor";
import { getLangtangValleyContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitLangtangValleyPage() {
  const content = await getLangtangValleyContent();
  return <LangtangValleyEditor initial={content} />;
}
