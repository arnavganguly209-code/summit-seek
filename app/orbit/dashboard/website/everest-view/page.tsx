import { EverestViewEditor } from "@/components/orbit/EverestViewEditor";
import { getEverestViewContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitEverestViewPage() {
  const content = await getEverestViewContent();
  return <EverestViewEditor initial={content} />;
}
