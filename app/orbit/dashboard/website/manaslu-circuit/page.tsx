import { ManasluCircuitEditor } from "@/components/orbit/ManasluCircuitEditor";
import { getManasluCircuitContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitManasluCircuitPage() {
  const content = await getManasluCircuitContent();
  return <ManasluCircuitEditor initial={content} />;
}
