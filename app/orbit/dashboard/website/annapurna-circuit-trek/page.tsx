import { AnnapurnaCircuitTrekEditor } from "@/components/orbit/AnnapurnaCircuitTrekEditor";
import { getAnnapurnaCircuitTrekContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitAnnapurnaCircuitTrekPage() {
  const content = await getAnnapurnaCircuitTrekContent();
  return <AnnapurnaCircuitTrekEditor initial={content} />;
}
