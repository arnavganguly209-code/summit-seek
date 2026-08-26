import { GosainkundaEditor } from "@/components/orbit/GosainkundaEditor";
import { getGosainkundaContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitGosainkundaPage() {
  const content = await getGosainkundaContent();
  return <GosainkundaEditor initial={content} />;
}
