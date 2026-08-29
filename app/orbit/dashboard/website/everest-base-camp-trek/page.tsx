import { EverestBaseCampTrekEditor } from "@/components/orbit/EverestBaseCampTrekEditor";
import { getEverestBaseCampTrekContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitEverestBaseCampTrekPage() {
  const content = await getEverestBaseCampTrekContent();
  return <EverestBaseCampTrekEditor initial={content} />;
}
