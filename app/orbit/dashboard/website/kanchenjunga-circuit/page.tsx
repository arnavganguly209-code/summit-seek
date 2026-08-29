import { KanchenjungaCircuitEditor } from "@/components/orbit/KanchenjungaCircuitEditor";
import { getKanchenjungaCircuitContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitKanchenjungaCircuitPage() {
  const content = await getKanchenjungaCircuitContent();
  return <KanchenjungaCircuitEditor initial={content} />;
}
