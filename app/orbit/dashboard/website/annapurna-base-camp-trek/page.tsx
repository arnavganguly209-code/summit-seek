import { AnnapurnaBaseCampTrekEditor } from "@/components/orbit/AnnapurnaBaseCampTrekEditor";
import { getAnnapurnaBaseCampTrekContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitAnnapurnaBaseCampTrekPage() {
  const content = await getAnnapurnaBaseCampTrekContent();
  return <AnnapurnaBaseCampTrekEditor initial={content} />;
}
