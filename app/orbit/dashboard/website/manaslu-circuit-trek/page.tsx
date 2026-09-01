import { ManasluCircuitTrekEditor } from "@/components/orbit/ManasluCircuitTrekEditor";
import { getManasluCircuitTrekContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitManasluCircuitTrekPage() {
  const content = await getManasluCircuitTrekContent();
  return <ManasluCircuitTrekEditor initial={content} />;
}
