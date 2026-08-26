import { AnnapurnaBaseCampEditor } from "@/components/orbit/AnnapurnaBaseCampEditor";
import { getAnnapurnaBaseCampContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitAnnapurnaBaseCampPage() {
  const content = await getAnnapurnaBaseCampContent();
  return <AnnapurnaBaseCampEditor initial={content} />;
}
