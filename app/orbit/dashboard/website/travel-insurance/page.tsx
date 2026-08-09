import { TravelInsuranceEditor } from "@/components/orbit/TravelInsuranceEditor";
import { getTravelInsuranceContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitTravelInsurancePage() {
  const content = await getTravelInsuranceContent();
  return <TravelInsuranceEditor initial={content} />;
}
