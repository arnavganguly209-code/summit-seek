import { LuxuryEverestBaseCampEditor } from "@/components/orbit/LuxuryEverestBaseCampEditor";
import { getLuxuryEverestBaseCampContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitLuxuryEverestBaseCampPage() {
  const content = await getLuxuryEverestBaseCampContent();
  return <LuxuryEverestBaseCampEditor initial={content} />;
}
