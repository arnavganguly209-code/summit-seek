import { EverestBaseCampHelicopterTourEditor } from "@/components/orbit/EverestBaseCampHelicopterTourEditor";
import { getEverestBaseCampHelicopterTourContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitEverestBaseCampHelicopterTourPage() {
  const content = await getEverestBaseCampHelicopterTourContent();
  return <EverestBaseCampHelicopterTourEditor initial={content} />;
}
