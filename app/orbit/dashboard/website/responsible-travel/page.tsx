import { ResponsibleTravelEditor } from "@/components/orbit/ResponsibleTravelEditor";
import { getResponsibleTravelContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitResponsibleTravelPage() {
  const content = await getResponsibleTravelContent();
  return <ResponsibleTravelEditor initial={content} />;
}
