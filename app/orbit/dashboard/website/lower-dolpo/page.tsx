import { LowerDolpoEditor } from "@/components/orbit/LowerDolpoEditor";
import { getLowerDolpoContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitLowerDolpoPage() {
  const content = await getLowerDolpoContent();
  return <LowerDolpoEditor initial={content} />;
}
