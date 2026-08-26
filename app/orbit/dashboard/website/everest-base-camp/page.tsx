import { EverestBaseCampEditor } from "@/components/orbit/EverestBaseCampEditor";
import { getEverestBaseCampContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitEverestBaseCampPage() {
  const content = await getEverestBaseCampContent();
  return <EverestBaseCampEditor initial={content} />;
}
