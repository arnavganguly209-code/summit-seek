import { AnnapurnaLuxuryLodgeEditor } from "@/components/orbit/AnnapurnaLuxuryLodgeEditor";
import { getAnnapurnaLuxuryLodgeContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitAnnapurnaLuxuryLodgePage() {
  const content = await getAnnapurnaLuxuryLodgeContent();
  return <AnnapurnaLuxuryLodgeEditor initial={content} />;
}
