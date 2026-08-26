import { RupinaLaEditor } from "@/components/orbit/RupinaLaEditor";
import { getRupinaLaContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitRupinaLaPage() {
  const content = await getRupinaLaContent();
  return <RupinaLaEditor initial={content} />;
}
