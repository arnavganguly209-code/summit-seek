import { EverestHeliViewEditor } from "@/components/orbit/EverestHeliViewEditor";
import { getEverestHeliViewContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitEverestHeliViewPage() {
  const content = await getEverestHeliViewContent();
  return <EverestHeliViewEditor initial={content} />;
}
