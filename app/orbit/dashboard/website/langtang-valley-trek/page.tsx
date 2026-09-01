import { LangtangValleyTrekEditor } from "@/components/orbit/LangtangValleyTrekEditor";
import { getLangtangValleyTrekContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitLangtangValleyTrekPage() {
  const content = await getLangtangValleyTrekContent();
  return <LangtangValleyTrekEditor initial={content} />;
}
