import { HealthSafetyEditor } from "@/components/orbit/HealthSafetyEditor";
import { getHealthSafetyContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitHealthSafetyPage() {
  const content = await getHealthSafetyContent();
  return <HealthSafetyEditor initial={content} />;
}
