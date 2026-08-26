import { AnnapurnaCircuitEditor } from "@/components/orbit/AnnapurnaCircuitEditor";
import { getAnnapurnaCircuitContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitAnnapurnaCircuitPage() {
  const content = await getAnnapurnaCircuitContent();
  return <AnnapurnaCircuitEditor initial={content} />;
}
