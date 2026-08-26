import { MardiHimalEditor } from "@/components/orbit/MardiHimalEditor";
import { getMardiHimalContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitMardiHimalPage() {
  const content = await getMardiHimalContent();
  return <MardiHimalEditor initial={content} />;
}
